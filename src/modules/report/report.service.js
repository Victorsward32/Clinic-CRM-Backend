import report from "./report.model.js";

export const uploadPatientReportService = async({
   patientId,
  file,
  uploadedBy,
}) => {
  return await report.create({
    patientId,
    file: {
      url: file.path,        // Cloudinary URL
      publicId: file.filename, // Cloudinary public_id
      type: file.mimetype,
    },
    uploadedBy,
  });
};

export const getPatientReportsService = async (patient) => {

  return await report.find({ patientId: patient });
};