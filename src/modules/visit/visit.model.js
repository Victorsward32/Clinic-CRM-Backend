import mongoose from "mongoose";
import { VISIT_STATUS } from "../../constants/enums.js";

const medicineSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    dosage: { type: String, required: true, trim: true },
    frequency: { type: String, required: true, trim: true },
    duration: { type: String, required: true, trim: true },
    instructions: { type: String, trim: true, default: "" },
  },
  { _id: false }
);

const visitSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    queueEntry: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      default: null,
      unique: true,
      sparse: true,
      index: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "appointment",
      default: null,
    },
    symptoms: { type: String, trim: true, default: "" },
    diagnosis: { type: String, trim: true, default: "" },
    prescription: {
      medicines: {
        type: [medicineSchema],
        default: [],
      },
      advice: { type: String, trim: true, default: "" },
    },
    followUpDate: Date,
    status: {
      type: String,
      enum: Object.values(VISIT_STATUS),
      default: VISIT_STATUS.IN_PROGRESS,
    },
    completedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

visitSchema.index({ patient: 1, createdAt: -1 });
visitSchema.index({ doctor: 1, status: 1, createdAt: -1 });

const visit = mongoose.model("visit", visitSchema);
export default visit;
