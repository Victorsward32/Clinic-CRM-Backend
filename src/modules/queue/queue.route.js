import express from "express";
import { 
  addToQueue,
  callNextPatient,
  completePatient,
  getQueueHistory,
  listOfQueue,
  skipPatient,
  updateStatus  
} from "./queue.controller.js";
import authMiddleware, { requireDoctorOrStaff } from "../../middlewares/auth.middleware.js";

const queueRoutes = express.Router();

// Get current queue for authenticated doctor
queueRoutes.get("/", authMiddleware, requireDoctorOrStaff, listOfQueue);

// Add patient to queue
queueRoutes.post("/", authMiddleware, requireDoctorOrStaff, addToQueue);

// Call next patient from waiting queue
queueRoutes.post("/call-next", authMiddleware, requireDoctorOrStaff, callNextPatient);

// Mark patient as completed
queueRoutes.post("/:id/complete", authMiddleware, requireDoctorOrStaff, completePatient);

// Mark patient as skipped
queueRoutes.post("/:id/skip", authMiddleware, requireDoctorOrStaff, skipPatient);

// Manual status update (flexible for edge cases)
queueRoutes.patch("/:id/status", authMiddleware, requireDoctorOrStaff, updateStatus);

// Get queue history (completed and skipped entries)
queueRoutes.get("/history", authMiddleware, requireDoctorOrStaff, getQueueHistory);

export default queueRoutes; 
