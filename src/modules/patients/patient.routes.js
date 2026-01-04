import express, { Router } from  "express";
import { addPatient,getPatient,listOfPatient } from "./patient.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const patientRoutes =express.Router();


patientRoutes.post("/", authMiddleware, addPatient);
patientRoutes.get("/", authMiddleware, listOfPatient);
patientRoutes.get("/:id", authMiddleware, getPatient);

export default patientRoutes