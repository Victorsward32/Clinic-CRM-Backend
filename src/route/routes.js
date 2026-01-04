import express from "express";

import authrouter from "../modules/auth/auth.routes.js";
import patientRoutes from "../modules/patients/patient.routes.js";
import queueRoutes from "../modules/queue/queue.route.js";
import appointmentRoutes from "../modules/appointment/appointment.routes.js";
import visitRoutes from "../modules/visit/visit.route.js";
import reminderRoutes from "../modules/reminders/reminder.routes.js";

const router = express.Router();
router.use('/auth',authrouter);
router.use('/patient',patientRoutes);
router.use('/queue',queueRoutes);
router.use('/appointment',appointmentRoutes);
router.use('/visit',visitRoutes);
router.use('/reminders',reminderRoutes)

export default router