import express from 'express';
import { register,login, forgetPassword, resetPassword } from './auth.controller.js';

const authrouter = express.Router();
authrouter.post("/register",register);
authrouter.post("/login",login);
authrouter.post("/forget-password",forgetPassword);
authrouter.post("/reset-password", resetPassword);

export default authrouter