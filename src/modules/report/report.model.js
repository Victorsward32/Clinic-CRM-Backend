import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },

    file: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
      type: {
        type: String, // application/pdf, image/png
        required: true,
      },
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
},{timestamps:true})

const report = mongoose.model('report',reportSchema);
export default report;