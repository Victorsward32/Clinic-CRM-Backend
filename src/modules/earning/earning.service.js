import mongoose from "mongoose";
import AppError from "../../utils/appError.js";
import { earningRepository } from "../../repositories/earning.repository.js";
import queue from "../queue/queue.model.js";
import visit from "../visit/visit.model.js";
import { QUEUE_STATUS, VISIT_STATUS } from "../../constants/enums.js";

export const createEarningService = async (
  doctorId,
  patientId,
  queueId,
  consultationFee = 50000,
  paymentMode = "CASH",
  visitId = null
) => {
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    throw new AppError("Invalid doctor ID", 400, "INVALID_DOCTOR_ID");
  }
  if (!mongoose.Types.ObjectId.isValid(patientId)) {
    throw new AppError("Invalid patient ID", 400, "INVALID_PATIENT_ID");
  }
  if (!mongoose.Types.ObjectId.isValid(queueId)) {
    throw new AppError("Invalid queue ID", 400, "INVALID_QUEUE_ID");
  }
  if (!Number.isInteger(consultationFee) || consultationFee < 0) {
    throw new AppError("Consultation fee must be a non-negative integer", 400, "INVALID_FEE");
  }

  try {
    const created = await earningRepository.create({
      doctor: doctorId,
      patient: patientId,
      queueId,
      visitId,
      consultationFee,
      paymentMode,
      visitDate: new Date(),
      status: "RECEIVED",
    });
    return created.toObject();
  } catch (error) {
    if (error.code === 11000) {
      throw new AppError("Earning already created for this consultation", 409, "EARNING_ALREADY_EXISTS");
    }
    throw error;
  }
};

export const createEarningFromQueueService = async ({
  doctorId,
  patientId,
  queueId,
  consultationFee = 50000,
  paymentMode = "CASH",
}) => {
  const queueEntry = await queue
    .findOne({ _id: queueId, doctor: doctorId, status: QUEUE_STATUS.COMPLETED })
    .lean();
  if (!queueEntry) {
    throw new AppError(
      "Earnings can only be created from completed queue entries",
      400,
      "QUEUE_NOT_COMPLETED"
    );
  }

  const completedVisit = await visit
    .findOne({
      queueEntry: queueId,
      doctor: doctorId,
      status: VISIT_STATUS.COMPLETED,
    })
    .lean();
  if (!completedVisit) {
    throw new AppError(
      "Earnings are derived only from completed visits",
      400,
      "VISIT_NOT_COMPLETED_FOR_EARNING"
    );
  }

  const existing = await earningRepository.findByQueueId(queueId);
  if (existing) return existing;

  return createEarningService(
    doctorId,
    patientId || queueEntry.patient.toString(),
    queueId,
    consultationFee,
    paymentMode,
    completedVisit._id.toString()
  );
};

export const getEarningsService = async (doctorId, filters = {}) => {
  const { startDate = null, endDate = null, limit = 20, skip = 0 } = filters;

  const [earnings, total] = await Promise.all([
    earningRepository.listByDoctor(doctorId, { startDate, endDate, limit, skip }),
    earningRepository.countByDoctor(doctorId, { startDate, endDate }),
  ]);

  return {
    earnings,
    total,
    count: earnings.length,
    skip,
    limit,
  };
};

export const getEarningSummaryService = async (doctorId) => {
  const results = await earningRepository.summaryFacet(doctorId);
  return {
    today: results[0]?.today[0]?.total || 0,
    thisMonth: results[0]?.thisMonth[0]?.total || 0,
    thisYear: results[0]?.thisYear[0]?.total || 0,
    allTime: results[0]?.allTime[0]?.total || 0,
  };
};

export const getMonthlyEarningAggregationService = async (doctorId, { startDate, endDate }) => {
  return earningRepository.monthlyAggregation(doctorId, { startDate, endDate });
};

export const getEarningsForReportService = async (doctorId, startDate, endDate) => {
  return earningRepository.listByDoctor(doctorId, {
    startDate,
    endDate,
    limit: 1000,
    skip: 0,
  });
};

export const updateEarningService = async (earningId, doctorId, updates) => {
  const safeUpdates = { ...updates };
  delete safeUpdates.doctor;
  delete safeUpdates.queueId;
  delete safeUpdates.createdAt;
  delete safeUpdates.visitId;

  const updated = await earningRepository.updateByIdForDoctor(earningId, doctorId, safeUpdates);
  if (!updated) {
    throw new AppError("Earning not found or unauthorized", 404, "EARNING_NOT_FOUND");
  }
  return updated;
};

export const deleteEarningService = async (earningId, doctorId) => {
  const deleted = await earningRepository.deleteByIdForDoctor(earningId, doctorId);
  if (!deleted) {
    throw new AppError("Earning not found or unauthorized", 404, "EARNING_NOT_FOUND");
  }
  return deleted;
};

export const getEarningByQueueIdService = async (queueId) => {
  return earningRepository.findByQueueId(queueId);
};

export const getEarningByIdService = async (earningId, doctorId) => {
  const result = await earningRepository.findByIdForDoctor(earningId, doctorId);
  if (!result) {
    throw new AppError("Earning not found", 404, "EARNING_NOT_FOUND");
  }
  return result;
};
