import { getPatientReportsService, uploadPatientReportService } from "./report.service.js";
import { REPORT_ERRORS } from "../../utils/ErrorConstants.js";
import { REPORT_MESSAGES } from "../../utils/TextConstants.js";

export const uploadPatientReport = async (req, res, next) => {
  try {
    if (!req.body.patientId) {
      const err = new Error(REPORT_ERRORS.INVALID_REPORT_DATA.message);
      err.status = REPORT_ERRORS.INVALID_REPORT_DATA.status;
      return next(err);
    }

    if (!req.file) {
      const err = new Error(REPORT_ERRORS.NO_FILE_PROVIDED.message);
      err.status = REPORT_ERRORS.NO_FILE_PROVIDED.status;
      return next(err);
    }

    const report = await uploadPatientReportService({
      patientId: req.body.patientId,
      file: req.file,
      uploadedBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: REPORT_MESSAGES.REPORT_UPLOADED,
      data: report,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else if (error.message.includes("too large") || error.message.includes("size")) {
      const err = new Error(REPORT_ERRORS.FILE_TOO_LARGE.message);
      err.status = REPORT_ERRORS.FILE_TOO_LARGE.status;
      next(err);
    } else if (error.message.includes("type")) {
      const err = new Error(REPORT_ERRORS.INVALID_FILE_TYPE.message);
      err.status = REPORT_ERRORS.INVALID_FILE_TYPE.status;
      next(err);
    } else {
      const err = new Error(REPORT_ERRORS.FILE_UPLOAD_FAILED.message);
      err.status = REPORT_ERRORS.FILE_UPLOAD_FAILED.status;
      next(err);
    }
  }
};

export const getPatientReport = async (req, res, next) => {
  try {
    if (!req.params.patientId) {
      const err = new Error(REPORT_ERRORS.INVALID_REPORT_DATA.message);
      err.status = REPORT_ERRORS.INVALID_REPORT_DATA.status;
      return next(err);
    }

    const report = await getPatientReportsService(req.params.patientId);

    if (!report || report.length === 0) {
      return res.status(200).json({
        success: true,
        message: REPORT_MESSAGES.NO_REPORTS_FOUND,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: REPORT_MESSAGES.PATIENT_REPORTS_FETCHED,
      data: report,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(REPORT_ERRORS.INVALID_REPORT_DATA.message);
      err.status = REPORT_ERRORS.INVALID_REPORT_DATA.status;
      next(err);
    }
  }
};