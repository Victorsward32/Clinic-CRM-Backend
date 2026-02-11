import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    weight: {
      type: Number,
      min: 0,
    },
    height: {
      type: Number,
      min: 0,
    },
    address: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
      default: "MALE",
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      url: String,
      publicId: String,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: null,
    },
    isArchived: {
      type: Boolean,
      default: false,
      index: true,
    },
    archivedAt: {
      type: Date,
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
    },
  },
  { timestamps: true }
);

// Active patients should have unique phone numbers.
patientSchema.index(
  { phoneNumber: 1 },
  {
    unique: true,
    partialFilterExpression: {
      isArchived: false,
      phoneNumber: { $exists: true, $type: "string" },
    },
    name: "unique_active_patient_phone",
  }
);

patientSchema.index({ createdBy: 1, createdAt: -1 });
patientSchema.index({ name: "text", phoneNumber: "text", email: "text" });

const patient = mongoose.model("patient", patientSchema);

export default patient;
