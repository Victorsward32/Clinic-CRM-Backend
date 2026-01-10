import {  changePasswordService, updateProfileImageService } from "./user.service.js";

export const uploadProfileImage = async (req, res, next) => {
  try {
    const image = await updateProfileImageService(
      req.user.id,
      req.file
    );

    res.json({
      success: true,
      message: "Profile image uploaded successfully",
      data: image
    });
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    await changePasswordService(req.user.id, oldPassword, newPassword);
    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }
};
