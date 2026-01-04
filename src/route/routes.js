import express from "express";

import authrouter from "../modules/auth/auth.routes.js";
import patientRoutes from "../modules/patients/patient.routes.js";
import queueRoutes from "../modules/queue/queue.route.js";

const router = express.Router();
router.use('/auth',authrouter);
router.use('/patient',patientRoutes);
router.use('/queue',queueRoutes);

export default router