import AppError from "../../utils/appError.js";
import { VISIT_STATUS } from "../../constants/enums.js";
import { visitRepository } from "../../repositories/visit.repository.js";
import { completePatientService } from "../queue/queue.service.js";
import { createEarningFromQueueService } from "../earning/earning.service.js";
import { enqueuePrescriptionPdfGeneration } from "../../jobs/prescriptionPdf.job.js";

const sanitizeVisit = (visit) => {
  if (!visit) return null;
  return {
    _id: visit._id,
    patient: visit.patient,
    doctor: visit.doctor,
    queueEntry: visit.queueEntry || null,
    appointment: visit.appointment || null,
    symptoms: visit.symptoms || "",
    diagnosis: visit.diagnosis || "",
    prescription: visit.prescription || { medicines: [], advice: "" },
    followUpDate: visit.followUpDate || null,
    status: visit.status,
    completedAt: visit.completedAt || null,
    createdAt: visit.createdAt,
    updatedAt: visit.updatedAt,
  };
};

export const createVisit = async (data, doctorId) => {
  const { queueId, symptoms, diagnosis, followUpDate } = data;

  const queueEntry = await visitRepository.findQueueInProgress(queueId, doctorId);
  if (!queueEntry) {
    throw new AppError(
      "Visit must start from an IN_PROGRESS queue entry owned by the doctor",
      400,
      "INVALID_QUEUE_FOR_VISIT"
    );
  }

  const existingForQueue = await visitRepository.findByQueueEntry(queueId);
  if (existingForQueue) {
    throw new AppError("A visit already exists for this queue entry", 409, "VISIT_ALREADY_EXISTS");
  }

  const created = await visitRepository.create({
    patient: queueEntry.patient,
    doctor: doctorId,
    queueEntry: queueId,
    symptoms: symptoms || "",
    diagnosis: diagnosis || "",
    followUpDate: followUpDate ? new Date(followUpDate) : null,
    status: VISIT_STATUS.IN_PROGRESS,
  });

  return sanitizeVisit(created.toObject());
};

export const getPatientVisits = async (patientId) => {
  const visits = await visitRepository.listPatientVisits(patientId);
  return visits.map(sanitizeVisit);
};

export const completeVisit = async (visitId, doctorId, payload) => {
  const existingVisit = await visitRepository.findByIdForDoctor(visitId, doctorId);
  if (!existingVisit) {
    throw new AppError("Visit not found", 404, "VISIT_NOT_FOUND");
  }
  if (existingVisit.status === VISIT_STATUS.COMPLETED) {
    throw new AppError("Completed visits cannot be edited", 409, "VISIT_ALREADY_COMPLETED");
  }

  const updates = {
    diagnosis: payload.diagnosis ?? existingVisit.diagnosis,
    followUpDate: payload.followUpDate ? new Date(payload.followUpDate) : existingVisit.followUpDate,
    prescription: payload.prescription,
  };

  const completedVisit = await visitRepository.completeVisit(visitId, doctorId, updates);
  if (!completedVisit) {
    throw new AppError("Visit could not be completed", 409, "VISIT_COMPLETE_FAILED");
  }

  if (completedVisit.queueEntry) {
    const completedQueue = await completePatientService(completedVisit.queueEntry, doctorId);
    const queueIdForEarning = completedQueue?._id?.toString() || completedVisit.queueEntry.toString();

    await createEarningFromQueueService({
      doctorId,
      patientId: completedVisit.patient,
      queueId: queueIdForEarning,
      consultationFee: payload.consultationFee || 50000,
      paymentMode: payload.paymentMode || "CASH",
    });
  }

  await enqueuePrescriptionPdfGeneration({
    visitId: completedVisit._id.toString(),
    doctorId,
    patientId: completedVisit.patient.toString(),
  });

  return sanitizeVisit(completedVisit);
};
