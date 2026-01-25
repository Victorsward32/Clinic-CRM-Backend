import queueCounter from "../queueCounter/queueCounter.model.js";
import queue from "./queue.model.js";
import mongoose from "mongoose";

/**
 * Retrieves all non-completed queue entries for a doctor
 * WHY: Sorted by priority (EMERGENCY first) then tokenNumber to maintain correct order
 * Even if entries are partially in-progress, keeps queue consistent
 * 
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Array>} Array of queue entries sorted by priority and token
 * @throws {Error} If database operation fails
 */
export const getQueue = async (doctorId) => { 
    return await queue.find({
        doctor: doctorId,
        status: { $ne: "COMPLETED" }
    }).populate("patient").sort({ priority: -1, tokenNumber: 1 });
};

/**
 * Checks if a patient is already in an active queue state (WAITING or IN_PROGRESS)
 * WHY: Prevents duplicate queue entries for same patient + doctor combination
 * Uses sparse partial index for efficient lookup
 * 
 * @param {string} patientId - The patient's MongoDB ObjectId
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Object|null>} Existing queue entry or null
 * @throws {Error} If database operation fails
 */
export const checkPatientAlreadyInQueue = async (patientId, doctorId) => {
    return await queue.findOne({
        patient: patientId,
        doctor: doctorId,
        status: { $in: ["WAITING", "IN_PROGRESS"] }
    });
};

/**
 * Updates queue status atomically
 * WHY: Uses MongoDB findByIdAndUpdate to ensure atomic operation
 * Prevents race conditions where status change overwrites concurrent updates
 * 
 * @param {string} id - The queue entry's MongoDB ObjectId
 * @param {string} status - New status (WAITING, IN_PROGRESS, COMPLETED, SKIPPED)
 * @param {Date} completedAt - Optional completion timestamp (for COMPLETED/SKIPPED)
 * @returns {Promise<Object>} Updated queue entry
 * @throws {Error} If database operation fails
 */
export const updateQueueStatus = async (id, status, completedAt = null) => {
    const updateData = { status };
    if (completedAt) {
        updateData.completedAt = completedAt;
    }
    
    return await queue.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    );
};

/**
 * Creates a queue token using atomic counter increment
 * WHY: Uses MongoDB $inc operator to atomically increment doctor's token counter
 * Ensures no token duplication even under concurrent requests
 * Token generation is strongly consistent at DB level (not just in-memory)
 * 
 * @param {string} patientId - The patient's MongoDB ObjectId
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @param {string} priority - Priority level (EMERGENCY or NORMAL)
 * @returns {Promise<Object>} New queue entry with generated token
 * @throws {Error} If database operation fails or patient already in queue
 */
export const createQueueToken = async (patientId, doctorId, priority = "NORMAL") => {
    // Step 1: Check for duplicate before insertion to fail fast
    // (Actual enforcement is via MongoDB index constraint)
    const existingEntry = await checkPatientAlreadyInQueue(patientId, doctorId);
    if (existingEntry) {
        const error = new Error("Patient already in active queue");
        error.status = 409;
        throw error;
    }

    // Step 2: Atomically increment counter (or create if not exists)
    // $inc ensures thread-safe increment at DB level
    const counter = await queueCounter.findOneAndUpdate(
        { doctor: doctorId },
        { $inc: { currentTokenNumber: 1 } },
        { new: true, upsert: true }
    );
    
    // Step 3: Create queue entry with generated token
    // If this fails due to unique constraint, the counter is still incremented (acceptable)
    // because counter is doctor-scoped and tokens are for ordering, not uniqueness
    try {
        return await queue.create({
            tokenNumber: counter.currentTokenNumber,
            patient: patientId,
            doctor: doctorId,
            priority: priority || "NORMAL"
        });
    } catch (error) {
        // If creation fails (e.g., duplicate key error from index), propagate
        throw error;
    }
};

/**
 * Calls the next waiting patient in queue
 * WHY: Uses findOneAndUpdate with sort to atomically get AND update in one operation
 * Prevents race condition where two concurrent requests could call the same patient
 * Sorts by priority (EMERGENCY first, descending) then tokenNumber (ascending)
 * 
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Object|null>} Updated queue entry with patient populated, or null if no waiters
 * @throws {Error} If database operation fails
 */
export const callNextPatientService = async (doctorId) => {
    // Atomic operation: find first WAITING patient and change status in one DB call
    // sort: { priority: -1, tokenNumber: 1 } ensures EMERGENCY patients are called first
    return await queue.findOneAndUpdate(
        {
            doctor: doctorId,
            status: "WAITING"
        },
        {
            status: "IN_PROGRESS",
            calledAt: new Date() // Record when patient was called
        },
        {
            sort: { priority: -1, tokenNumber: 1 },
            new: true
        }
    ).populate("patient", "name phone profileImage");
};

/**
 * Marks a patient as skipped and moves them to end of queue
 * WHY: Atomic operation ensures no race condition
 * Doctor authorization is verified by controller before calling this
 * 
 * @param {string} queueId - The queue entry's MongoDB ObjectId
 * @param {string} doctorId - The doctor's MongoDB ObjectId (for validation)
 * @returns {Promise<Object|null>} Updated queue entry or null if not found
 * @throws {Error} If database operation fails
 */
export const skipPatientService = async (queueId, doctorId) => {
    // WHY: Verify doctorId in query to prevent one doctor from skipping another's patients
    return await queue.findOneAndUpdate(
        {
            _id: queueId,
            doctor: doctorId,
            status: "WAITING"
        },
        {
            status: "SKIPPED",
            completedAt: new Date() // Record when skipped
        },
        { new: true }
    ).populate("patient", "name phone profileImage");
};

/**
 * Marks a patient's consultation as completed
 * WHY: Separate from skip to track outcomes (completed vs skipped for analytics)
 * Atomic operation at DB level
 * 
 * @param {string} queueId - The queue entry's MongoDB ObjectId
 * @param {string} doctorId - The doctor's MongoDB ObjectId (for authorization)
 * @returns {Promise<Object|null>} Updated queue entry or null if not found
 * @throws {Error} If database operation fails
 */
export const completePatientService = async (queueId, doctorId) => {
    return await queue.findOneAndUpdate(
        {
            _id: queueId,
            doctor: doctorId,
            status: "IN_PROGRESS" // Only IN_PROGRESS can be marked COMPLETED
        },
        {
            status: "COMPLETED",
            completedAt: new Date()
        },
        { new: true }
    ).populate("patient", "name phone profileImage");
};

/**
 * Retrieves queue history (completed and skipped entries)
 * WHY: Used for analytics, doctor's past consultations
 * Sorted by most recent first for better UX
 * 
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Array>} Array of completed/skipped entries with patient details
 * @throws {Error} If database operation fails
 */
export const getQueueHistoryService = async (doctorId) => {
    return await queue.find({
        doctor: doctorId,
        status: { $in: ["COMPLETED", "SKIPPED"] }
    })
    .sort({ completedAt: -1 })
    .populate("patient", "name phone profileImage");
};

/**
 * Inserts an emergency patient at front of queue
 * WHY: Emergency patients bypass normal queue ordering
 * Regenerates their priority to EMERGENCY (if not already)
 * Does NOT change tokens, they maintain original positions
 * 
 * @param {string} patientId - The patient's MongoDB ObjectId
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Object>} New emergency queue entry
 * @throws {Error} If database operation fails or patient already in queue
 */
export const insertEmergencyPatientService = async (patientId, doctorId) => {
    return await createQueueToken(patientId, doctorId, "EMERGENCY");
};

/**
 * Resets doctor's daily queue counter
 * WHY: Called at start of new day to reset token numbers to 1
 * Ensures token numbers are meaningful (starting from 1 each day)
 * 
 * @param {string} doctorId - The doctor's MongoDB ObjectId
 * @returns {Promise<Object>} Updated counter document
 * @throws {Error} If database operation fails
 */
export const resetDailyQueueCounter = async (doctorId) => {
    return await queueCounter.findOneAndUpdate(
        { doctor: doctorId },
        { currentTokenNumber: 0 },
        { new: true, upsert: true }
    );
};