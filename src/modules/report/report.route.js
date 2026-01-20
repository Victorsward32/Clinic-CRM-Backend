import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { uploadReport } from "../../middlewares/upload.middleware.js";
import { getPatientReport, uploadPatientReport } from "./report.controller.js";

const reportRoutes= express.Router();

reportRoutes.post("/",authMiddleware,uploadReport.single('file'),uploadPatientReport)
reportRoutes.get('/:patientId',authMiddleware,getPatientReport)

export default reportRoutes
