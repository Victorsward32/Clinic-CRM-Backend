import { createReminder } from "./reminder.service.js";
import { REMINDER_ERRORS } from "../../utils/ErrorConstants.js";
import { REMINDER_MESSAGES } from "../../utils/TextConstants.js";

export const addReminder = async (req, res, next) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error(REMINDER_ERRORS.MISSING_REMINDER_FIELDS.message);
      err.status = REMINDER_ERRORS.MISSING_REMINDER_FIELDS.status;
      return next(err);
    }

    if (req.body.reminderTime && new Date(req.body.reminderTime) < new Date()) {
      const err = new Error(REMINDER_ERRORS.REMINDER_TIME_IN_PAST.message);
      err.status = REMINDER_ERRORS.REMINDER_TIME_IN_PAST.status;
      return next(err);
    }

    const reminder = await createReminder(req.body);
    res.status(201).json({
      success: true,
      message: REMINDER_MESSAGES.REMINDER_CREATED,
      data: reminder,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(REMINDER_ERRORS.INVALID_REMINDER_DATA.message);
      err.status = REMINDER_ERRORS.INVALID_REMINDER_DATA.status;
      next(err);
    }
  }
};