import {
  getPatientById,
  getPatientData,
  createPatient,
} from "./patient.service.js";
import { PATIENT_MESSAGES } from "../../utils/TextConstants.js";
import { PATIENT_ERRORS } from "../../utils/ErrorConstants.js";

export const addPatient = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error(PATIENT_ERRORS.MISSING_REQUIRED_FIELDS.message);
      err.status = PATIENT_ERRORS.MISSING_REQUIRED_FIELDS.status;
      return next(err);
    }
    


    const patient = await createPatient(req.body, req.user.id);
    res.status(201).json({
      success: true,
      message: PATIENT_MESSAGES.PATIENT_CREATED,
      data: patient,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else if (error.message.includes("duplicate")) {
      const err = new Error(PATIENT_ERRORS.PATIENT_EMAIL_EXISTS.message);
      err.status = PATIENT_ERRORS.PATIENT_EMAIL_EXISTS.status;
      next(err);
    } else {
      const err = new Error(PATIENT_ERRORS.INVALID_PATIENT_DATA.message);
      err.status = PATIENT_ERRORS.INVALID_PATIENT_DATA.status;
      next(err);
    }
  }
};

export const listOfPatient = async (req, res, next) => {
  try {
    const { search } = req.query;
    const patients = await getPatientData(search);

    if (!patients || patients.length === 0) {
      return res.status(200).json({
        success: true,
        message: PATIENT_MESSAGES.NO_PATIENTS_FOUND,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: PATIENT_MESSAGES.PATIENTS_LIST_FETCHED,
      data: patients,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(PATIENT_ERRORS.INVALID_PATIENT_DATA.message);
      err.status = PATIENT_ERRORS.INVALID_PATIENT_DATA.status;
      next(err);
    }
  }
};

export const getPatient = async (req, res, next) => {
  try {
    if (!req.params.id) {
      const err = new Error(PATIENT_ERRORS.INVALID_PATIENT_DATA.message);
      err.status = PATIENT_ERRORS.INVALID_PATIENT_DATA.status;
      return next(err);
    }

    const patient = await getPatientById(req.params.id);

    if (!patient) {
      const err = new Error(PATIENT_ERRORS.PATIENT_NOT_FOUND.message);
      err.status = PATIENT_ERRORS.PATIENT_NOT_FOUND.status;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: PATIENT_MESSAGES.PATIENT_FETCHED,
      data: patient,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(PATIENT_ERRORS.PATIENT_NOT_FOUND.message);
      err.status = PATIENT_ERRORS.PATIENT_NOT_FOUND.status;
      next(err);
    }
  }
};