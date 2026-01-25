import mongoose from "mongoose";

/**
 * Validates if a string is a valid MongoDB ObjectId
 * WHY: Prevents MongoDB injection and invalid query operations
 * 
 * @param {string} id - The ID to validate
 * @returns {boolean} True if valid ObjectId format, false otherwise
 */
export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
};

/**
 * Validates if a string is a non-empty, valid ObjectId
 * WHY: Used in controllers before database operations to fail fast
 * 
 * @param {string} id - The ID to validate
 * @returns {boolean} True if valid and not null, false otherwise
 */
export const isValidId = (id) => {
    if (!id) return false;
    return isValidObjectId(id);
};

/**
 * Validates queue status against enum values
 * WHY: Ensures only valid status transitions are allowed
 * 
 * @param {string} status - The status to validate
 * @returns {boolean} True if status is in valid enum list
 */
export const isValidQueueStatus = (status) => {
    const validStatuses = ["WAITING", "IN_PROGRESS", "COMPLETED", "SKIPPED"];
    return validStatuses.includes(status);
};

/**
 * Validates priority level
 * WHY: Ensures queue ordering logic is consistent
 * 
 * @param {string} priority - The priority to validate
 * @returns {boolean} True if priority is valid
 */
export const isValidPriority = (priority) => {
    const validPriorities = ["EMERGENCY", "NORMAL"];
    return !priority || validPriorities.includes(priority);
};

/**
 * Validates a queue payload from client
 * WHY: Provides centralized validation before service layer operations
 * 
 * @param {object} payload - The payload to validate
 * @returns {object} Object with { isValid: boolean, error: string | null }
 */
export const validateAddToQueuePayload = (payload) => {
    if (!payload.patientId) {
        return {
            isValid: false,
            error: "patientId is required"
        };
    }

    if (!isValidId(payload.patientId)) {
        return {
            isValid: false,
            error: "patientId must be a valid MongoDB ObjectId"
        };
    }

    if (payload.priority && !isValidPriority(payload.priority)) {
        return {
            isValid: false,
            error: "priority must be 'EMERGENCY' or 'NORMAL'"
        };
    }

    return { isValid: true, error: null };
};

/**
 * Validates status update payload
 * WHY: Ensures only valid status transitions occur
 * 
 * @param {string} status - The new status
 * @returns {object} Object with { isValid: boolean, error: string | null }
 */
export const validateStatusUpdatePayload = (status) => {
    if (!status || typeof status !== "string") {
        return {
            isValid: false,
            error: "status is required and must be a string"
        };
    }

    if (!isValidQueueStatus(status)) {
        return {
            isValid: false,
            error: "Invalid status value"
        };
    }

    return { isValid: true, error: null };
};
