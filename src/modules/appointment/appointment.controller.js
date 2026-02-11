import {
  createAppointment,
  getTodayAppointments,
  updateAppointmentStatus,
} from "./appointment.service.js";
import { APPOINTMENT_ERRORS } from "../../utils/ErrorConstants.js";
import { APPOINTMENT_MESSAGES } from "../../utils/TextConstants.js";

export const addAppointment = async (req, res, next) => {
  try {
    const doctorId = req.doctorScopeId;
    if (!doctorId) {
      const err = new Error("Doctor scope is missing");
      err.status = 403;
      return next(err);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error(APPOINTMENT_ERRORS.MISSING_APPOINTMENT_FIELDS.message);
      err.status = APPOINTMENT_ERRORS.MISSING_APPOINTMENT_FIELDS.status;
      return next(err);
    }

    const appointment = await createAppointment(req.body, doctorId);

    res.status(201).json({
      success: true,
      message: APPOINTMENT_MESSAGES.APPOINTMENT_CREATED,
      data: appointment,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else if (error.message.includes("unavailable") || error.message.includes("slot")) {
      const err = new Error(APPOINTMENT_ERRORS.APPOINTMENT_SLOT_UNAVAILABLE.message);
      err.status = APPOINTMENT_ERRORS.APPOINTMENT_SLOT_UNAVAILABLE.status;
      next(err);
    } else {
      const err = new Error(APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.message);
      err.status = APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.status;
      next(err);
    }
  }
};

export const todaysAppointments = async (req, res, next) => {
  try {
    const doctorId = req.doctorScopeId;
    if (!doctorId) {
      const err = new Error("Doctor scope is missing");
      err.status = 403;
      return next(err);
    }

    const appointment = await getTodayAppointments(doctorId);

    if (!appointment || appointment.length === 0) {
      return res.status(200).json({
        success: true,
        message: APPOINTMENT_MESSAGES.NO_APPOINTMENTS_FOUND,
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: APPOINTMENT_MESSAGES.TODAY_APPOINTMENTS_FETCHED,
      data: appointment,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.message);
      err.status = APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.status;
      next(err);
    }
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const doctorId = req.doctorScopeId;
    if (!doctorId) {
      const err = new Error("Doctor scope is missing");
      err.status = 403;
      return next(err);
    }

    if (!req.params.id) {
      const err = new Error(APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.message);
      err.status = APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.status;
      return next(err);
    }

    if (!req.body.status) {
      const err = new Error(APPOINTMENT_ERRORS.INVALID_APPOINTMENT_STATUS.message);
      err.status = APPOINTMENT_ERRORS.INVALID_APPOINTMENT_STATUS.status;
      return next(err);
    }

    const appointment = await updateAppointmentStatus(
      req.params.id,
      doctorId,
      req.body.status
    );

    if (!appointment) {
      const err = new Error(APPOINTMENT_ERRORS.APPOINTMENT_NOT_FOUND.message);
      err.status = APPOINTMENT_ERRORS.APPOINTMENT_NOT_FOUND.status;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: APPOINTMENT_MESSAGES.APPOINTMENT_UPDATED,
      data: appointment,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.message);
      err.status = APPOINTMENT_ERRORS.INVALID_APPOINTMENT_DATA.status;
      next(err);
    }
  }
};
