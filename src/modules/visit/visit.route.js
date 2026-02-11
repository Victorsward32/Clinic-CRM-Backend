import express from "express";
import authMiddleware, { requireDoctorOrStaff } from "../../middlewares/auth.middleware.js";
import { addVisit, completeVisitController, listVisit } from "./visit.controller.js";

const visitRoutes = express.Router();
visitRoutes.post('/',authMiddleware, requireDoctorOrStaff, addVisit);
visitRoutes.patch('/:id/complete',authMiddleware, requireDoctorOrStaff, completeVisitController);
visitRoutes.get('/:id',authMiddleware, requireDoctorOrStaff, listVisit);


export default visitRoutes
