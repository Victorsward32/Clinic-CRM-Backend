import { registerUser, loginUser, forgetPasswordService, resetPasswordService } from "./auth.service.js";
import { AUTH_MESSAGES } from "../../utils/TextConstants.js";
import { AUTH_ERRORS } from "../../utils/ErrorConstants.js";

export const register = async (req, res, next) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: AUTH_MESSAGES.REGISTER_SUCCESS,
      data: user
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(AUTH_ERRORS.EMAIL_ALREADY_EXISTS.message);
      err.status = AUTH_ERRORS.EMAIL_ALREADY_EXISTS.status;
      next(err);
    }
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error(AUTH_ERRORS.INVALID_CREDENTIALS.message);
      err.status = AUTH_ERRORS.INVALID_CREDENTIALS.status;
      return next(err);
    }

    const result = await loginUser(email, password);
    res.status(200).json({
      success: true,
      message: AUTH_MESSAGES.LOGIN_SUCCESS,
      token: result.token,
      user: result.user
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(AUTH_ERRORS.INVALID_CREDENTIALS.message);
      err.status = AUTH_ERRORS.INVALID_CREDENTIALS.status;
      next(err);
    }
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    if (!req.body.email) {
      const err = new Error(AUTH_ERRORS.INVALID_EMAIL_FORMAT.message);
      err.status = AUTH_ERRORS.INVALID_EMAIL_FORMAT.status;
      return next(err);
    }

    const result = await forgetPasswordService(req.body.email);
    res.status(200).json({
      success: true,
      message: AUTH_MESSAGES.PASSWORD_RESET_EMAIL_SENT,
      data: result
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(AUTH_ERRORS.USER_NOT_FOUND.message);
      err.status = AUTH_ERRORS.USER_NOT_FOUND.status;
      next(err);
    }
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      const err = new Error(AUTH_ERRORS.INVALID_RESET_TOKEN.message);
      err.status = AUTH_ERRORS.INVALID_RESET_TOKEN.status;
      return next(err);
    }

    await resetPasswordService(email, otp, newPassword);

    res.status(200).json({
      success: true,
      message: AUTH_MESSAGES.PASSWORD_RESET_SUCCESS
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(AUTH_ERRORS.INVALID_RESET_TOKEN.message);
      err.status = AUTH_ERRORS.INVALID_RESET_TOKEN.status;
      next(err);
    }
  }
};