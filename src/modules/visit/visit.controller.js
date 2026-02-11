import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { parseSchema } from "../../validators/common.validator.js";
import {
  completeVisitSchema,
  startVisitSchema,
  visitIdParamSchema,
} from "../../validators/visit.validator.js";
import { completeVisit, createVisit, getPatientVisits } from "./visit.service.js";
import { patientIdParamSchema } from "../../validators/patient.validator.js";

export const addVisit = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const payload = parseSchema(startVisitSchema, req.body);
  const visit = await createVisit(payload, doctorId);

  res.status(201).json({
    success: true,
    message: "Visit created successfully",
    data: visit,
  });
});

export const completeVisitController = asyncHandler(async (req, res) => {
  const doctorId = req.doctorScopeId;
  if (!doctorId) throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");

  const { id: visitId } = parseSchema(visitIdParamSchema, req.params);
  const payload = parseSchema(completeVisitSchema, req.body);

  const visit = await completeVisit(visitId, doctorId, payload);
  res.status(200).json({
    success: true,
    message: "Visit completed successfully",
    data: visit,
  });
});

export const listVisit = asyncHandler(async (req, res) => {
  const { id: patientId } = parseSchema(patientIdParamSchema, req.params);
  const visits = await getPatientVisits(patientId);

  res.status(200).json({
    success: true,
    message: visits.length ? "Patient visit history fetched successfully" : "No visits found",
    data: visits,
  });
});
