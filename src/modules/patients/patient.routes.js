import express from  "express";
import {
  addPatient,
  archivePatient,
  getPatient,
  listOfPatient,
  patientHistory,
} from "./patient.controller.js";
import authMiddleware, { requireDoctorOrStaff } from "../../middlewares/auth.middleware.js";

const patientRoutes =express.Router();


patientRoutes.post("/", authMiddleware, requireDoctorOrStaff, addPatient);
patientRoutes.get("/", authMiddleware, requireDoctorOrStaff, listOfPatient);
patientRoutes.get("/:id/history", authMiddleware, requireDoctorOrStaff, patientHistory);
patientRoutes.get("/:id", authMiddleware, requireDoctorOrStaff, getPatient);
patientRoutes.delete("/:id", authMiddleware, requireDoctorOrStaff, archivePatient);

export default patientRoutes
