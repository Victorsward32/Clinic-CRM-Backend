import express from 'express';
import { register, registerStaffController, login, forgetPassword, resetPassword } from './auth.controller.js';
import authMiddleware, { requireDoctor } from '../../middlewares/auth.middleware.js';

const authrouter = express.Router();

// Doctor registration
authrouter.post("/register", register);

// Staff registration (NEW)
authrouter.post("/register-staff", authMiddleware, requireDoctor, registerStaffController);

// Combined login (Doctor + Staff)
authrouter.post("/login", login);

// Password reset
authrouter.post("/forget-password", forgetPassword);
authrouter.post("/reset-password", resetPassword);

export default authrouter
