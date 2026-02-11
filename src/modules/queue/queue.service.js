import mongoose from "mongoose";
import AppError from "../../utils/appError.js";
import { queueRepository } from "../../repositories/queue.repository.js";
import { QUEUE_PRIORITY, QUEUE_STATUS } from "../../constants/enums.js";

const TRANSITIONS = Object.freeze({
  [QUEUE_STATUS.WAITING]: [QUEUE_STATUS.IN_PROGRESS, QUEUE_STATUS.SKIPPED],
  [QUEUE_STATUS.IN_PROGRESS]: [QUEUE_STATUS.COMPLETED, QUEUE_STATUS.SKIPPED],
  [QUEUE_STATUS.COMPLETED]: [],
  [QUEUE_STATUS.SKIPPED]: [],
});

const normalizeQueueDoc = (doc) => {
  if (!doc) return null;
  return {
    ...doc,
    patient: doc.patient
      ? {
          _id: doc.patient._id,
          name: doc.patient.name,
          phoneNumber: doc.patient.phoneNumber || doc.patient.phone,
          profileImage: doc.patient.profileImage || null,
        }
      : null,
  };
};

export const getQueue = async (doctorId) => {
  const entries = await queueRepository.getActiveQueue(doctorId);
  return entries.map(normalizeQueueDoc);
};

export const checkPatientAlreadyInQueue = async (patientId, doctorId) => {
  return queueRepository.findActivePatientEntry(patientId, doctorId);
};

export const createQueueToken = async (patientId, doctorId, priority = QUEUE_PRIORITY.NORMAL) => {
  const existing = await checkPatientAlreadyInQueue(patientId, doctorId);
  if (existing) {
    throw new AppError("Patient already in active queue", 409, "PATIENT_ALREADY_IN_QUEUE");
  }

  const counter = await queueRepository.incrementTokenCounter(doctorId);

  try {
    const created = await queueRepository.create({
      tokenNumber: counter.currentTokenNumber,
      patient: patientId,
      doctor: doctorId,
      priority,
      status: QUEUE_STATUS.WAITING,
    });

    return created.toObject();
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Patient already in active queue", 409, "PATIENT_ALREADY_IN_QUEUE");
    }
    throw error;
  }
};

export const callNextPatientService = async (doctorId) => {
  const existingInProgress = await queueRepository.findOneInProgress(doctorId);
  if (existingInProgress) {
    throw new AppError(
      "A consultation is already in progress for this doctor",
      409,
      "CONSULTATION_ALREADY_IN_PROGRESS",
      { queueId: existingInProgress._id }
    );
  }

  try {
    const nextPatient = await queueRepository.findAndSetNextInProgress(doctorId);
    return normalizeQueueDoc(nextPatient);
  } catch (error) {
    // Unique partial index fallback for concurrent calls.
    if (error.code === 11000) {
      throw new AppError(
        "A consultation is already in progress for this doctor",
        409,
        "CONSULTATION_ALREADY_IN_PROGRESS"
      );
    }
    throw error;
  }
};

export const skipPatientService = async (queueId, doctorId) => {
  const skipped = await queueRepository.updateStatusWithExpectedCurrent(
    queueId,
    doctorId,
    [QUEUE_STATUS.WAITING, QUEUE_STATUS.IN_PROGRESS],
    QUEUE_STATUS.SKIPPED
  );
  return normalizeQueueDoc(skipped);
};

export const completePatientService = async (queueId, doctorId) => {
  const completed = await queueRepository.updateStatusWithExpectedCurrent(
    queueId,
    doctorId,
    [QUEUE_STATUS.IN_PROGRESS],
    QUEUE_STATUS.COMPLETED
  );
  return normalizeQueueDoc(completed);
};

export const updateQueueStatus = async (queueId, doctorId, nextStatus) => {
  const entry = await queueRepository.findByIdForDoctor(queueId, doctorId);
  if (!entry) {
    throw new AppError("Queue entry not found", 404, "QUEUE_NOT_FOUND");
  }

  const allowedNextStatuses = TRANSITIONS[entry.status] || [];
  if (!allowedNextStatuses.includes(nextStatus)) {
    throw new AppError(
      `Invalid status transition from ${entry.status} to ${nextStatus}`,
      400,
      "INVALID_QUEUE_TRANSITION"
    );
  }

  let updated;
  try {
    updated = await queueRepository.updateStatusWithExpectedCurrent(
      queueId,
      doctorId,
      [entry.status],
      nextStatus
    );
  } catch (error) {
    if (error.code === 11000 && nextStatus === QUEUE_STATUS.IN_PROGRESS) {
      throw new AppError(
        "A consultation is already in progress for this doctor",
        409,
        "CONSULTATION_ALREADY_IN_PROGRESS"
      );
    }
    throw error;
  }

  return normalizeQueueDoc(updated);
};

export const getQueueHistoryService = async (doctorId) => {
  const history = await queueRepository.getQueueHistory(doctorId);
  return history.map(normalizeQueueDoc);
};

export const insertEmergencyPatientService = async (patientId, doctorId) => {
  return createQueueToken(patientId, doctorId, QUEUE_PRIORITY.EMERGENCY);
};

export const resetDailyQueueCounter = async (doctorId) => {
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new AppError("Invalid doctor ID", 400, "INVALID_DOCTOR_ID");
  }

  return queueRepository.resetTokenCounter(doctorId);
};
