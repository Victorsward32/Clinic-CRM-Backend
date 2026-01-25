import { changePasswordService, updateProfileImageService } from "./user.service.js";
import { USER_ERRORS } from "../../utils/ErrorConstants.js";
import { USER_MESSAGES } from "../../utils/TextConstants.js";

export const uploadProfileImage = async (req, res, next) => {
  try {
    if (!req.file) {
      const err = new Error(USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.message);
      err.status = USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.status;
      return next(err);
    }

    const image = await updateProfileImageService(
      req.user.id,
      req.file
    );

    if (!image) {
      const err = new Error(USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.message);
      err.status = USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.status;
      return next(err);
    }

    res.status(200).json({
      success: true,
      message: USER_MESSAGES.PROFILE_IMAGE_UPDATED,
      data: image,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else {
      const err = new Error(USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.message);
      err.status = USER_ERRORS.PROFILE_IMAGE_UPLOAD_FAILED.status;
      next(err);
    }
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
      const err = new Error(USER_ERRORS.INVALID_USER_DATA.message);
      err.status = USER_ERRORS.INVALID_USER_DATA.status;
      return next(err);
    }

    if (oldPassword === newPassword) {
      const err = new Error(USER_ERRORS.INVALID_USER_DATA.message);
      err.status = USER_ERRORS.INVALID_USER_DATA.status;
      return next(err);
    }

    await changePasswordService(req.user.id, oldPassword, newPassword);

    res.status(200).json({
      success: true,
      message: USER_MESSAGES.PASSWORD_CHANGED_SUCCESS,
    });
  } catch (error) {
    if (error.status) {
      next(error);
    } else if (error.message.includes("incorrect") || error.message.includes("wrong")) {
      const err = new Error(USER_ERRORS.OLD_PASSWORD_INCORRECT.message);
      err.status = USER_ERRORS.OLD_PASSWORD_INCORRECT.status;
      next(err);
    } else {
      const err = new Error(USER_ERRORS.CANNOT_UPDATE_USER.message);
      err.status = USER_ERRORS.CANNOT_UPDATE_USER.status;
      next(err);
    }
  }
};
