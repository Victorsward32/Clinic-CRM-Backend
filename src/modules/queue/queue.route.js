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
import authMiddleware from "../../middlewares/auth.middleware.js";

const queueRoutes = express.Router();

// Get current queue for authenticated doctor
queueRoutes.get("/", authMiddleware, listOfQueue);

// Add patient to queue
queueRoutes.post("/", authMiddleware, addToQueue);

// Call next patient from waiting queue
queueRoutes.post("/call-next", authMiddleware, callNextPatient);

// Mark patient as completed
queueRoutes.post("/:id/complete", authMiddleware, completePatient);

// Mark patient as skipped
queueRoutes.post("/:id/skip", authMiddleware, skipPatient);

// Manual status update (flexible for edge cases)
queueRoutes.patch("/:id/status", authMiddleware, updateStatus);

// Get queue history (completed and skipped entries)
queueRoutes.get("/history", authMiddleware, getQueueHistory);

export default queueRoutes; 
