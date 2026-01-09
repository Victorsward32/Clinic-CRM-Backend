import User from "./user.model.js";

export const updateProfileImageService = async (userId, file) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.profileImage = {
    url: file.path,
    publicId: file.filename
  };

  await user.save();

  return user.profileImage;
};




export const changePasswordService = async (
  userId,
  oldPassword,
  newPassword
) => {
  const user = await User.findById(userId);

  const isMatch = await bcrypt.compare(oldPassword, user.password);
  if (!isMatch) throw new Error("Old password incorrect");

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();
};