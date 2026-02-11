import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { parseSchema } from "../../validators/common.validator.js";
import {
  earningIdParamSchema,
  earningsMonthlyQuerySchema,
  earningsQuerySchema,
  updateEarningSchema,
} from "../../validators/earning.validator.js";
import {
  deleteEarningService,
  getEarningByIdService,
  getEarningSummaryService,
  getEarningsForReportService,
  getEarningsService,
  getMonthlyEarningAggregationService,
  updateEarningService,
} from "./earning.service.js";

export const getEarnings = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const query = parseSchema(earningsQuerySchema, req.query);
  const skip = (query.page - 1) * query.limit;

  const result = await getEarningsService(doctorId, {
    limit: query.limit,
    skip,
    startDate: query.startDate,
    endDate: query.endDate,
  });

  res.status(200).json({
    success: true,
    message: "Earnings retrieved successfully",
    data: result.earnings,
    pagination: {
      total: result.total,
      count: result.count,
      limit: query.limit,
      page: query.page,
      pages: Math.ceil(result.total / query.limit),
    },
  });
});

export const getEarningsSummary = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const summary = await getEarningSummaryService(doctorId);
  res.status(200).json({
    success: true,
    message: "Earnings summary retrieved successfully",
    data: summary,
  });
});

export const getMonthlyEarnings = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const query = parseSchema(earningsMonthlyQuerySchema, req.query);
  const monthly = await getMonthlyEarningAggregationService(doctorId, query);

  res.status(200).json({
    success: true,
    message: "Monthly earnings aggregation fetched successfully",
    data: monthly,
  });
});

export const downloadEarningsReport = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const reportType = req.query.type || "monthly";
  const year = Number(req.query.year) || new Date().getFullYear();
  const month = Number(req.query.month) || new Date().getMonth() + 1;

  let startDate;
  let endDate;

  switch (String(reportType).toLowerCase()) {
    case "monthly":
      if (month < 1 || month > 12) {
        throw new AppError("Month must be between 1 and 12", 400, "INVALID_MONTH");
      }
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 1);
      break;
    case "quarterly": {
      const quarter = Math.ceil(month / 3);
      const quarterStart = (quarter - 1) * 3;
      startDate = new Date(year, quarterStart, 1);
      endDate = new Date(year, quarterStart + 3, 1);
      break;
    }
    case "yearly":
      startDate = new Date(year, 0, 1);
      endDate = new Date(year + 1, 0, 1);
      break;
    case "custom":
      if (!req.query.startDate || !req.query.endDate) {
        throw new AppError("startDate and endDate required for custom reports", 400, "DATE_RANGE_REQUIRED");
      }
      startDate = new Date(req.query.startDate);
      endDate = new Date(req.query.endDate);
      break;
    default:
      throw new AppError(
        "Report type must be monthly, quarterly, yearly, or custom",
        400,
        "INVALID_REPORT_TYPE"
      );
  }

  const earnings = await getEarningsForReportService(doctorId, startDate, endDate);
  const totalEarnings = earnings.reduce((sum, item) => sum + (item.consultationFee || 0), 0);
  const totalConsultations = earnings.length;

  res.status(200).json({
    success: true,
    message: "Earnings report retrieved successfully",
    report: {
      type: reportType,
      period: {
        start: startDate.toISOString().split("T")[0],
        end: endDate.toISOString().split("T")[0],
      },
      summary: {
        totalEarnings,
        totalConsultations,
        averagePerConsultation:
          totalConsultations > 0 ? Math.round(totalEarnings / totalConsultations) : 0,
      },
      earnings,
    },
  });
});

export const getEarningById = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const { id: earningId } = parseSchema(earningIdParamSchema, req.params);
  const earning = await getEarningByIdService(earningId, doctorId);

  res.status(200).json({
    success: true,
    message: "Earning retrieved successfully",
    data: earning,
  });
});

export const updateEarning = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const { id: earningId } = parseSchema(earningIdParamSchema, req.params);
  const payload = parseSchema(updateEarningSchema, req.body);
  const updated = await updateEarningService(earningId, doctorId, payload);

  res.status(200).json({
    success: true,
    message: "Earning updated successfully",
    data: updated,
  });
});

export const deleteEarning = asyncHandler(async (req, res) => {
  const doctorId = req.user?.id;
  if (!doctorId) throw new AppError("Doctor ID missing", 400, "INVALID_DOCTOR_ID");

  const { id: earningId } = parseSchema(earningIdParamSchema, req.params);
  const deleted = await deleteEarningService(earningId, doctorId);

  res.status(200).json({
    success: true,
    message: "Earning deleted successfully",
    data: deleted,
  });
});
