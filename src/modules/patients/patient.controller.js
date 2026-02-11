import asyncHandler from "../../utils/asyncHandler.js";
import AppError from "../../utils/appError.js";
import { parseSchema } from "../../validators/common.validator.js";
import {
  createPatientSchema,
  patientIdParamSchema,
  patientSearchQuerySchema,
} from "../../validators/patient.validator.js";
import {
  archivePatientById,
  createPatient,
  getPatientById,
  getPatientData,
  getPatientHistoryById,
} from "./patient.service.js";

export const addPatient = asyncHandler(async (req, res) => {
  if (!req.doctorScopeId) {
    throw new AppError("Doctor scope is missing", 403, "DOCTOR_SCOPE_REQUIRED");
  }

  const payload = parseSchema(createPatientSchema, req.body);
  const patient = await createPatient(payload, req.doctorScopeId);

  res.status(201).json({
    success: true,
    message: "Patient created successfully",
    data: patient,
  });
});

export const listOfPatient = asyncHandler(async (req, res) => {
  parseSchema(patientSearchQuerySchema, req.query);
  const { search } = req.query;
  const patients = await getPatientData(search);

  res.status(200).json({
    success: true,
    message: patients.length ? "Patients list fetched successfully" : "No patients found",
    data: patients,
  });
});

export const getPatient = asyncHandler(async (req, res) => {
  const { id } = parseSchema(patientIdParamSchema, req.params);
  const patient = await getPatientById(id);

  if (!patient) {
    throw new AppError("Patient not found", 404, "PATIENT_NOT_FOUND");
  }

  res.status(200).json({
    success: true,
    message: "Patient fetched successfully",
    data: patient,
  });
});

export const archivePatient = asyncHandler(async (req, res) => {
  const { id } = parseSchema(patientIdParamSchema, req.params);
  const archived = await archivePatientById(id);

  res.status(200).json({
    success: true,
    message: "Patient archived successfully",
    data: archived,
  });
});

export const patientHistory = asyncHandler(async (req, res) => {
  const { id } = parseSchema(patientIdParamSchema, req.params);
  const history = await getPatientHistoryById(id);

  res.status(200).json({
    success: true,
    message: "Patient history fetched successfully",
    data: history,
  });
});
