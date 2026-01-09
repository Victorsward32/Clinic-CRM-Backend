import express from "express";
import {  changePassword, uploadProfileImage } from "./user.controller.js";
import { uploadUserImage } from "../../middlewares/upload.middleware.js";
import authMiddleware from "../../middlewares/auth.middleware.js";


const userRoutes = express.Router();

userRoutes.post('/', authMiddleware ,uploadUserImage.single("image"),uploadProfileImage);
userRoutes.post("/change-password", authMiddleware, changePassword);


export default userRoutes;

