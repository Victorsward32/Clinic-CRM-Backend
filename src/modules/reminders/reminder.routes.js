import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { addReminder } from "./reminder.controller.js";

const reminderRoutes = express.Router();

reminderRoutes.post("/",authMiddleware,addReminder)

export default reminderRoutes