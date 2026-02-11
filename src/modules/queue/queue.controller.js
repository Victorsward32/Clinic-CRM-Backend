import { getIO } from "../../socket/server.js";
import AppError from "../../utils/appError.js";
import asyncHandler from "../../utils/asyncHandler.js";
import { doctorRoom } from "../../sockets/rooms.js";
import { parseSchema } from "../../validators/common.validator.js";
import {
  addToQueueSchema,
  queueIdParamSchema,
  queueStatusUpdateSchema,
} from "../../validators/queue.validator.js";
import {
  callNextPatientService,
  createQueueToken,
  completePatientService,
  getQueue,
  getQueueHistoryService,
  skipPatientService,
  updateQueueStatus,
} from "./queue.service.js";
import { createEarningFromQueueService } from "../earning/earning.service.js";
import logger from "../../services/logger.service.js";

const emitQueueSnapshot = async (doctorId, eventName, payload = {}) => {
  const queue = await getQueue(doctorId);
  const io = getIO();
  io.to(doctorRoom(doctorId)).emit(eventName, { queue, ...payload });
  return queue;
};

export const addToQueue = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const { patientId, priority } = parseSchema(addToQueueSchema, req.body);
  const queueEntry = await createQueueToken(patientId, doctorId, priority);

  await emitQueueSnapshot(doctorId, "queue-updated", {
    event: "patient-added",
    queueEntry,
  });

  res.status(201).json({
    success: true,
    message: "Patient added to queue successfully",
    data: queueEntry,
  });
});

export const listOfQueue = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const queueEntries = await getQueue(doctorId);
  res.status(200).json({
    success: true,
    message: queueEntries.length ? "Queue fetched successfully" : "No patients in queue",
    data: queueEntries,
  });
});

export const updateStatus = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const { id: queueId } = parseSchema(queueIdParamSchema, req.params);
  const { status } = parseSchema(queueStatusUpdateSchema, req.body);

  const queueEntry = await updateQueueStatus(queueId, doctorId, status);
  if (!queueEntry) throw new AppError("Queue entry not found", 404, "QUEUE_ENTRY_NOT_FOUND");

  await emitQueueSnapshot(doctorId, "queue-updated", {
    event: "status-changed",
    queueEntry,
  });

  res.status(200).json({
    success: true,
    message: "Queue status updated successfully",
    data: queueEntry,
  });
});

export const callNextPatient = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const nextPatient = await callNextPatientService(doctorId);
  if (!nextPatient) {
    throw new AppError("No waiting patients in queue", 404, "NO_WAITING_PATIENTS");
  }

  await emitQueueSnapshot(doctorId, "patient-called", {
    calledPatient: nextPatient,
    tokenNumber: nextPatient.tokenNumber,
  });

  res.status(200).json({
    success: true,
    message: "Patient called successfully",
    data: nextPatient,
  });
});

export const skipPatient = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const { id: queueId } = parseSchema(queueIdParamSchema, req.params);
  const skipped = await skipPatientService(queueId, doctorId);

  if (!skipped) {
    throw new AppError("Queue entry not found or already processed", 404, "QUEUE_ENTRY_NOT_FOUND");
  }

  await emitQueueSnapshot(doctorId, "patient-skipped", {
    skippedPatient: skipped,
    tokenNumber: skipped.tokenNumber,
  });

  res.status(200).json({
    success: true,
    message: "Patient skipped successfully",
    data: skipped,
  });
});

export const completePatient = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const { id: queueId } = parseSchema(queueIdParamSchema, req.params);
  const completed = await completePatientService(queueId, doctorId);

  if (!completed) {
    throw new AppError("Queue entry not found or not in progress", 404, "QUEUE_ENTRY_NOT_FOUND");
  }

  const consultationFee = Number(req.body.consultationFee || 50000);
  const paymentMode = req.body.paymentMode || "CASH";
  let earningCreated = false;
  try {
    await createEarningFromQueueService({
      doctorId,
      patientId: completed.patient?._id,
      queueId,
      consultationFee,
      paymentMode,
    });
    earningCreated = true;
  } catch (earningError) {
    // Backward-compatible queue completion: earning creation may happen later at visit completion.
    logger.warn("Queue completed without immediate earning creation", {
      queueId,
      reason: earningError.code || earningError.message,
    });
  }

  await emitQueueSnapshot(doctorId, "queue-updated", {
    event: "patient-completed",
    completedPatient: completed,
  });

  if (earningCreated) {
    const io = getIO();
    io.to(doctorRoom(doctorId)).emit("earnings-updated", {
      message: "Earnings updated after consultation completion",
    });
  }

  res.status(200).json({
    success: true,
    message: "Patient marked as completed",
    data: completed,
  });
});

export const getQueueHistory = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const history = await getQueueHistoryService(doctorId);
  res.status(200).json({
    success: true,
    message: "Queue history fetched successfully",
    data: history,
  });
});
