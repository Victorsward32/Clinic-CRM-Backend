import express from "express";
import authMiddleware, { requireDoctorOrStaff } from "../../middlewares/auth.middleware.js";
import { addAppointment, todaysAppointments, updateStatus } from "./appointment.controller.js";

const appointmentRoutes = express.Router()
appointmentRoutes.post("/",authMiddleware, requireDoctorOrStaff, addAppointment);
appointmentRoutes.get("/today",authMiddleware, requireDoctorOrStaff, todaysAppointments);
appointmentRoutes.patch('/:id',authMiddleware, requireDoctorOrStaff, updateStatus);

export default appointmentRoutes
