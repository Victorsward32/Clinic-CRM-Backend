import express from "express";
import authMiddleware from "../../middlewares/auth.middleware.js";
import { addVisit, listVisit } from "./visit.controller.js";

const visitRoutes = express.Router();
visitRoutes.post('/',authMiddleware,addVisit);
visitRoutes.get('/:patientId',authMiddleware,listVisit);


export default visitRoutes