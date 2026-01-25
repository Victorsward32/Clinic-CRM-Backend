import { createVisit, getPatientVisits } from "./visit.service.js";
import { VISIT_ERRORS } from "../../utils/ErrorConstants.js";
import { VISIT_MESSAGES } from "../../utils/TextConstants.js";

export const addVisit = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error(VISIT_ERRORS.MISSING_VISIT_FIELDS.message);
      err.status = VISIT_ERRORS.MISSING_VISIT_FIELDS.status;
      return next(err);
    }

    if (req.body.visitDate && new Date(req.body.visitDate) > new Date()) {
      const err = new Error(VISIT_ERRORS.VISIT_DATE_IN_FUTURE.message);
      err.status = VISIT_ERRORS.VISIT_DATE_IN_FUTURE.status;
      return next(err);
    }

    const visit = await createVisit(req.body, req.user.id);

    res.status(201).json({
      success: true,
      message: VISIT_MESSAGES.VISIT_CREATED,
      data: visit,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(VISIT_ERRORS.INVALID_VISIT_DATA.message);
      err.status = VISIT_ERRORS.INVALID_VISIT_DATA.status;
      next(err);
    }
  }
};

export const listVisit = async (req, res, next) => {
  try {
    const patientId = req.params.id;

    if (!patientId) {
      const err = new Error(VISIT_ERRORS.INVALID_VISIT_DATA.message);
      err.status = VISIT_ERRORS.INVALID_VISIT_DATA.status;
      return next(err);
    }

    const visits = await getPatientVisits(patientId);

    if (!visits || visits.length === 0) {
      return res.status(200).json({
        success: true,
        message: VISIT_MESSAGES.NO_VISITS_FOUND,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: VISIT_MESSAGES.PATIENT_VISIT_HISTORY,
      data: visits,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(VISIT_ERRORS.INVALID_VISIT_DATA.message);
      err.status = VISIT_ERRORS.INVALID_VISIT_DATA.status;
      next(err);
    }
  }
};