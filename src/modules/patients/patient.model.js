import mongoose from "mongoose";

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    age: {
      type: Number,
      require: true,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
      default: "MALE",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const patient = mongoose.model("patient", patientSchema);

export default patient;
