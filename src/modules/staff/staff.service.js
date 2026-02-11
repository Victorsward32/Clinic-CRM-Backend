import Staff from "./staff.model.js";

// Get all staff for a doctor
export const getStaffByDoctor = async (doctorId) => {
  const staff = await Staff.find({ doctorId, isActive: true })
    .populate("doctorId", "name email phone")
    .select("-password");
  return staff;
};

// Get single staff member
export const getStaffById = async (staffId, doctorId) => {
  const staff = await Staff.findOne({ _id: staffId, doctorId })
    .populate("doctorId", "name email phone")
    .select("-password");
  
  if (!staff) throw new Error("Staff member not found");
  return staff;
};

// Update staff
export const updateStaff = async (staffId, doctorId, updateData) => {
  const { password, ...safeData } = updateData; // Don't allow password change here
  
  const staff = await Staff.findOneAndUpdate(
    { _id: staffId, doctorId },
    safeData,
    { new: true }
  ).select("-password");
  
  if (!staff) throw new Error("Staff member not found");
  return staff;
};

// Deactivate staff
export const deactivateStaff = async (staffId, doctorId) => {
  const staff = await Staff.findOneAndUpdate(
    { _id: staffId, doctorId },
    { isActive: false },
    { new: true }
  );
  
  if (!staff) throw new Error("Staff member not found");
  return staff;
};

// Activate staff
export const activateStaff = async (staffId, doctorId) => {
  const staff = await Staff.findOneAndUpdate(
    { _id: staffId, doctorId },
    { isActive: true },
    { new: true }
  );
  
  if (!staff) throw new Error("Staff member not found");
  return staff;
};

// Delete staff (hard delete)
export const deleteStaff = async (staffId, doctorId) => {
  const staff = await Staff.findOneAndDelete({ _id: staffId, doctorId });
  
  if (!staff) throw new Error("Staff member not found");
  return staff;
};
