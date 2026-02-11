import mongoose from "mongoose";

export const staffSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["NURSE", "RECEPTIONIST", "ASSISTANT", "STAFF"],
      default: "STAFF",
      required: true,
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    profileImage: {
      url: String,
      publicId: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Index for faster queries by doctorId
staffSchema.index({ doctorId: 1 });

// Ensure email is unique per doctor
staffSchema.index({ email: 1, doctorId: 1 }, { unique: true });

const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
