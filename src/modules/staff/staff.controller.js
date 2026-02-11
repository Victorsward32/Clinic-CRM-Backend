import {
  getStaffByDoctor,
  getStaffById,
  updateStaff,
  deactivateStaff,
  activateStaff,
  deleteStaff
} from "./staff.service.js";

// Get all staff for a doctor
export const getAllStaff = async (req, res, next) => {
  try {
    const doctorId = req.user.id;
    
    const staff = await getStaffByDoctor(doctorId);
    
    res.status(200).json({
      success: true,
      message: "Staff list retrieved successfully",
      data: staff,
      count: staff.length
    });
  } catch (error) {
    next(error);
  }
};

// Get single staff member
export const getSingleStaff = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const doctorId = req.user.id;
    
    const staff = await getStaffById(staffId, doctorId);
    
    res.status(200).json({
      success: true,
      message: "Staff member retrieved successfully",
      data: staff
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 404;
    next(err);
  }
};

// Update staff
export const updateStaffController = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const doctorId = req.user.id;
    
    const staff = await updateStaff(staffId, doctorId, req.body);
    
    res.status(200).json({
      success: true,
      message: "Staff updated successfully",
      data: staff
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = error.message.includes("not found") ? 404 : 400;
    next(err);
  }
};

// Deactivate staff
export const deactivateStaffController = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const doctorId = req.user.id;
    
    const staff = await deactivateStaff(staffId, doctorId);
    
    res.status(200).json({
      success: true,
      message: "Staff deactivated successfully",
      data: staff
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 404;
    next(err);
  }
};

// Activate staff
export const activateStaffController = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const doctorId = req.user.id;
    
    const staff = await activateStaff(staffId, doctorId);
    
    res.status(200).json({
      success: true,
      message: "Staff activated successfully",
      data: staff
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 404;
    next(err);
  }
};

// Delete staff
export const deleteStaffController = async (req, res, next) => {
  try {
    const { staffId } = req.params;
    const doctorId = req.user.id;
    
    const staff = await deleteStaff(staffId, doctorId);
    
    res.status(200).json({
      success: true,
      message: "Staff deleted successfully",
      data: staff
    });
  } catch (error) {
    const err = new Error(error.message);
    err.status = 404;
    next(err);
  }
};
