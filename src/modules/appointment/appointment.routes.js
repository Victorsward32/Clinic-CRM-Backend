import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { addAppointment, todaysAppointments, updateStatus } from "./appointment.controller.js";

const appointmentRoutes = express.Router()
appointmentRoutes.post("/",authMiddleware,addAppointment);
appointmentRoutes.get("/today",authMiddleware,todaysAppointments);
appointmentRoutes.patch('/:id',authMiddleware,updateStatus);

export default appointmentRoutes
