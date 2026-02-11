import mongoose from "mongoose";
import { EARNING_STATUS, PAYMENT_MODE } from "../../constants/enums.js";

const earningSchema = new mongoose.Schema(
  {
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      immutable: true,
      index: true,
    },
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "patient",
      required: true,
      index: true,
    },
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      required: true,
      unique: true,
      immutable: true,
      index: true,
    },
    visitId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "visit",
      default: null,
      index: true,
    },
    visitDate: {
      type: Date,
      required: true,
      default: () => new Date(),
      index: true,
    },
    consultationFee: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: Number.isInteger,
        message: "Consultation fee must be an integer in smallest currency unit",
      },
    },
    paymentMode: {
      type: String,
      enum: Object.values(PAYMENT_MODE),
      required: true,
      default: PAYMENT_MODE.CASH,
    },
    diagnosis: {
      type: String,
      trim: true,
      default: "",
    },
    notes: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      enum: Object.values(EARNING_STATUS),
      default: EARNING_STATUS.RECEIVED,
    },
  },
  {
    timestamps: true,
    collection: "earnings",
  }
);

earningSchema.index({ doctor: 1, visitDate: -1 });
earningSchema.index({ doctor: 1, createdAt: -1 });

const earning = mongoose.model("Earning", earningSchema);
export default earning;
