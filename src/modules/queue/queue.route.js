import express from "express";
import { addToQueue,listOfQueue,updateStatus  } from "./queue.controller.js";
import authMiddleware from "../../middlewares/auth.middleware.js";

const queueRoutes =express.Router();

queueRoutes.post("/", authMiddleware, addToQueue);
queueRoutes.get("/", authMiddleware, listOfQueue);
queueRoutes.patch("/:id", authMiddleware, updateStatus );

export default queueRoutes