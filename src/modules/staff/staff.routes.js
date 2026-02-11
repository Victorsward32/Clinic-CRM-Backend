import express from "express";
import authMiddleware, { requireDoctor } from "../../middlewares/auth.middleware.js";
import {
  getAllStaff,
  getSingleStaff,
  updateStaffController,
  deactivateStaffController,
  activateStaffController,
  deleteStaffController
} from "./staff.controller.js";

const staffRouter = express.Router();

// Get all staff for a doctor
staffRouter.get("/", authMiddleware, requireDoctor, getAllStaff);

// Get single staff member
staffRouter.get("/:staffId", authMiddleware, requireDoctor, getSingleStaff);

// Update staff
staffRouter.patch("/:staffId", authMiddleware, requireDoctor, updateStaffController);

// Deactivate staff
staffRouter.patch("/:staffId/deactivate", authMiddleware, requireDoctor, deactivateStaffController);

// Activate staff
staffRouter.patch("/:staffId/activate", authMiddleware, requireDoctor, activateStaffController);

// Delete staff
staffRouter.delete("/:staffId", authMiddleware, requireDoctor, deleteStaffController);

export default staffRouter;
