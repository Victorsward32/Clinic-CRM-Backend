import logger from "../services/logger.service.js";

// Queue-ready abstraction. Replace with BullMQ/SQS producer when async workers are enabled.
export const enqueuePrescriptionPdfGeneration = async ({ visitId, doctorId, patientId }) => {
  logger.info("Prescription PDF generation enqueued", {
    visitId,
    doctorId,
    patientId,
  });
};
