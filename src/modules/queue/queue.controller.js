import { getIO } from "../../socket/server.js";
import {
  callNextPatientService,
  createQueueToken,
  completePatientService,
  getQueue,
  getQueueHistoryService,
  skipPatientService,
  updateQueueStatus,
} from "./queue.service.js";
import { QUEUE_ERRORS } from "../../utils/ErrorConstants.js";
import { QUEUE_MESSAGES } from "../../utils/TextConstants.js";
import { 
  isValidId, 
  validateAddToQueuePayload, 
  validateStatusUpdatePayload 
} from "../../utils/validators.js";

/**
 * Adds a patient to the queue for the authenticated doctor
 * WHY: REST endpoint for queue mutations (POST semantic)
 * Validates patient doesn't already exist in active queue before attempting insert
 * Atomicity is enforced at DB level via unique sparse index
 * Emits Socket.IO event to all clients viewing this doctor's queue
 * 
 * @route POST /queue
 * @param {Object} req - Express request
 * @param {string} req.body.patientId - Patient's MongoDB ObjectId
 * @param {string} req.body.priority - Optional (EMERGENCY or NORMAL)
 * @param {string} req.user.id - Authenticated doctor's ID from JWT
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const addToQueue = async (req, res, next) => {
  try {
    // Step 1: Validate request payload structure
    const payloadValidation = validateAddToQueuePayload(req.body);
    if (!payloadValidation.isValid) {
      const err = new Error(payloadValidation.error);
      err.status = 400;
      return next(err);
    }

    // Step 2: Validate doctor ID from JWT is valid ObjectId
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    // Step 3: Attempt to create queue token
    // If patient already exists in active queue, service layer throws error
    // DB unique index prevents duplicate inserts as last-line defense
    const patientToken = await createQueueToken(
      req.body.patientId,
      req.user.id,
      req.body.priority || "NORMAL"
    );

    // Step 4: Fetch updated queue to broadcast
    const updatedQueue = await getQueue(req.user.id);

    // Step 5: Emit Socket.IO event to all clients in doctor's room
    // WHY: Clients see real-time queue update without polling
    const io = getIO();
    io.to(`doctor:${req.user.id}`).emit("queue-updated", {
      queue: updatedQueue,
      event: "patient-added",
      queueEntry: patientToken
    });

    res.status(201).json({
      success: true,
      message: QUEUE_MESSAGES.PATIENT_ADDED_TO_QUEUE,
      data: patientToken,
    });
  } catch (error) {
    // WHY: Differentiate error types for proper HTTP status codes
    if (error.status) {
      // Already has status code (from service layer)
      next(error);
    } else if (error.message.includes("duplicate") || error.message.includes("already")) {
      // Duplicate key error from MongoDB
      const err = new Error(QUEUE_ERRORS.PATIENT_ALREADY_IN_QUEUE.message);
      err.status = QUEUE_ERRORS.PATIENT_ALREADY_IN_QUEUE.status;
      next(err);
    } else {
      // Generic database error
      const err = new Error(QUEUE_ERRORS.INVALID_QUEUE_DATA.message);
      err.status = QUEUE_ERRORS.INVALID_QUEUE_DATA.status;
      next(err);
    }
  }
};

/**
 * Retrieves current queue for authenticated doctor
 * WHY: REST GET endpoint for queue state (no mutations)
 * Clients poll or use Socket.IO to stay in sync
 * 
 * @route GET /queue
 * @param {Object} req - Express request with authenticated user
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const listOfQueue = async (req, res, next) => {
  try {
    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    const queueEntries = await getQueue(req.user.id);

    if (!queueEntries || queueEntries.length === 0) {
      return res.status(200).json({
        success: true,
        message: QUEUE_MESSAGES.NO_PATIENTS_IN_QUEUE,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: QUEUE_MESSAGES.QUEUE_FETCHED,
      data: queueEntries,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(QUEUE_ERRORS.INVALID_QUEUE_DATA.message);
      err.status = QUEUE_ERRORS.INVALID_QUEUE_DATA.status;
      next(err);
    }
  }
};

/**
 * Updates queue entry status (for manual status changes)
 * WHY: Flexible endpoint for non-standard transitions (e.g., mark as WAITING again)
 * Most flows should use callNextPatient, skipPatient, completePatient instead
 * 
 * @route PATCH /queue/:id/status
 * @param {Object} req - Express request with queue ID
 * @param {string} req.body.status - New status value
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const updateStatus = async (req, res, next) => {
  try {
    // Validate queue ID format
    if (!isValidId(req.params.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_QUEUE_ID.message);
      err.status = QUEUE_ERRORS.INVALID_QUEUE_ID.status;
      return next(err);
    }

    // Validate status payload
    const statusValidation = validateStatusUpdatePayload(req.body.status);
    if (!statusValidation.isValid) {
      const err = new Error(statusValidation.error);
      err.status = 400;
      return next(err);
    }

    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    // Update status atomically
    const queueEntry = await updateQueueStatus(req.params.id, req.body.status);

    if (!queueEntry) {
      const err = new Error(QUEUE_ERRORS.QUEUE_ENTRY_NOT_FOUND.message);
      err.status = QUEUE_ERRORS.QUEUE_ENTRY_NOT_FOUND.status;
      return next(err);
    }

    // Verify the queue entry belongs to this doctor (authorization check)
    if (queueEntry.doctor.toString() !== req.user.id) {
      const err = new Error("Cannot modify another doctor's queue");
      err.status = 403;
      return next(err);
    }

    // Fetch updated queue for broadcast
    const updatedQueue = await getQueue(req.user.id);
    
    // Emit Socket.IO event
    const io = getIO();
    io.to(`doctor:${req.user.id}`).emit("queue-updated", {
      queue: updatedQueue,
      event: "status-changed"
    });

    res.status(200).json({
      success: true,
      message: QUEUE_MESSAGES.QUEUE_STATUS_UPDATED,
      data: queueEntry,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(QUEUE_ERRORS.CANNOT_UPDATE_QUEUE.message);
      err.status = QUEUE_ERRORS.CANNOT_UPDATE_QUEUE.status;
      next(err);
    }
  }
};

/**
 * Calls next patient in queue
 * WHY: Atomic operation ensures no race condition (findOneAndUpdate with sort)
 * Only WAITING patients are called, ensures strong consistency
 * Records timestamp when patient was called for analytics
 * 
 * @route POST /queue/call-next
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const callNextPatient = async (req, res, next) => {
  try {
    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    const nextPatient = await callNextPatientService(req.user.id);

    if (!nextPatient) {
      const err = new Error(QUEUE_ERRORS.NO_WAITING_PATIENTS.message);
      err.status = QUEUE_ERRORS.NO_WAITING_PATIENTS.status;
      return next(err);
    }

    // Fetch updated queue for broadcast
    const updatedQueue = await getQueue(req.user.id);

    // Emit Socket.IO event with specific event type
    const io = getIO();
    io.to(`doctor:${req.user.id}`).emit("patient-called", {
      queue: updatedQueue,
      calledPatient: nextPatient,
      tokenNumber: nextPatient.tokenNumber
    });

    res.status(200).json({
      success: true,
      message: "Patient called successfully",
      data: nextPatient,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Skips a patient in queue
 * WHY: Atomic operation ensures consistency
 * Patient stays in system (SKIPPED status) for history/analytics
 * Authorization verified: only doctor can skip their own patients
 * 
 * @route POST /queue/:id/skip
 * @param {Object} req - Express request
 * @param {string} req.params.id - Queue entry ID
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const skipPatient = async (req, res, next) => {
  try {
    // Validate queue ID
    if (!isValidId(req.params.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_QUEUE_ID.message);
      err.status = QUEUE_ERRORS.INVALID_QUEUE_ID.status;
      return next(err);
    }

    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    // Skip patient atomically (includes doctor authorization in query)
    const skipped = await skipPatientService(req.params.id, req.user.id);

    if (!skipped) {
      const err = new Error(QUEUE_ERRORS.QUEUE_ENTRY_NOT_FOUND.message);
      err.status = QUEUE_ERRORS.QUEUE_ENTRY_NOT_FOUND.status;
      return next(err);
    }

    // Fetch updated queue for broadcast
    const updatedQueue = await getQueue(req.user.id);

    // Emit Socket.IO event
    const io = getIO();
    io.to(`doctor:${req.user.id}`).emit("patient-skipped", {
      queue: updatedQueue,
      skippedPatient: skipped,
      tokenNumber: skipped.tokenNumber
    });

    res.status(200).json({
      success: true,
      message: "Patient skipped successfully",
      data: skipped
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Marks a patient's consultation as completed
 * WHY: Separate endpoint from skip for better semantics and analytics
 * Only IN_PROGRESS patients can be marked COMPLETED (state machine enforcement)
 * 
 * @route POST /queue/:id/complete
 * @param {Object} req - Express request
 * @param {string} req.params.id - Queue entry ID
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const completePatient = async (req, res, next) => {
  try {
    // Validate queue ID
    if (!isValidId(req.params.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_QUEUE_ID.message);
      err.status = QUEUE_ERRORS.INVALID_QUEUE_ID.status;
      return next(err);
    }

    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    // Complete patient atomically
    const completed = await completePatientService(req.params.id, req.user.id);

    if (!completed) {
      const err = new Error("Queue entry not found or not in progress");
      err.status = QUEUE_ERRORS.QUEUE_ENTRY_NOT_FOUND.status;
      return next(err);
    }

    // Fetch updated queue for broadcast
    const updatedQueue = await getQueue(req.user.id);

    // Emit Socket.IO event
    const io = getIO();
    io.to(`doctor:${req.user.id}`).emit("queue-updated", {
      queue: updatedQueue,
      event: "patient-completed",
      completedPatient: completed
    });

    res.status(200).json({
      success: true,
      message: "Patient marked as completed",
      data: completed
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Retrieves queue history (completed and skipped entries)
 * WHY: REST endpoint for analytics, doctor's past consultations
 * Sorted by most recent first
 * 
 * @route GET /queue/history
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 * @param {Function} next - Express error handler
 */
export const getQueueHistory = async (req, res, next) => {
  try {
    // Validate doctor ID
    if (!isValidId(req.user.id)) {
      const err = new Error(QUEUE_ERRORS.INVALID_DOCTOR_ID.message);
      err.status = QUEUE_ERRORS.INVALID_DOCTOR_ID.status;
      return next(err);
    }

    const history = await getQueueHistoryService(req.user.id);

    res.status(200).json({
      success: true,
      message: "Queue history fetched successfully",
      data: history,
    });
  } catch (error) {
    next(error);
  }
};

