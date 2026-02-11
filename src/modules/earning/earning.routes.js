import express from "express";
import authMiddleware, { requireDoctor } from "../../middlewares/auth.middleware.js";
import {
  getEarnings,
  getEarningsSummary,
  getMonthlyEarnings,
  downloadEarningsReport,
  getEarningById,
  updateEarning,
  deleteEarning
} from "./earning.controller.js";

const router = express.Router();

/**
 * Earnings Routes - DOCTOR ONLY
 * 
 * WHY Separate Routes:
 * - All earnings routes require DOCTOR role
 * - Staff should not see doctor's financial information
 * - Enforced at middleware level (not frontend)
 * 
 * Security Pattern:
 * authMiddleware → allowRoles('DOCTOR') → controller
 * 
 * This ensures:
 * 1. User is authenticated (authMiddleware)
 * 2. User is a doctor (allowRoles)
 * 3. Doctor can only see their own earnings (controller)
 */

// Get all earnings with optional filters
router.get(
  "/",
  authMiddleware,
  requireDoctor,
  getEarnings
);

// Get earnings summary (today, thisMonth, thisYear, allTime)
router.get(
  "/summary",
  authMiddleware,
  requireDoctor,
  getEarningsSummary
);

router.get(
  "/monthly",
  authMiddleware,
  requireDoctor,
  getMonthlyEarnings
);

// Download earnings report (JSON or PDF)
router.get(
  "/report",
  authMiddleware,
  requireDoctor,
  downloadEarningsReport
);

// Get single earning by ID
router.get(
  "/:id",
  authMiddleware,
  requireDoctor,
  getEarningById
);

// Update earning (for corrections)
router.patch(
  "/:id",
  authMiddleware,
  requireDoctor,
  updateEarning
);

// Delete earning (for removing mistakes)
router.delete(
  "/:id",
  authMiddleware,
  requireDoctor,
  deleteEarning
);

export default router;
