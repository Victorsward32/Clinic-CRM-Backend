import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./route/routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import env from "./config/env.js";

// ---------- Express Middlewares ------------//
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * CORS Configuration for HTTP Requests
 * WHY: Allows frontend to communicate with backend
 * IMPORTANT: Must match Socket.IO CORS config in socket/server.js
 * 
 * For development: origin: "*" (allows all origins)
 * For production: Restrict to specific frontend URL (use env variable)
 */
const corsOptions = {
  origin: env.frontendUrl,
  
  // HTTP methods allowed
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  
  // Headers allowed from client
  allowedHeaders: ["Content-Type", "Authorization"],
  
  // Allow credentials (cookies, auth headers) if frontend sends them
  credentials: env.frontendUrl !== "*",
  
  // Max age for preflight cache (24 hours)
  maxAge: 86400
};

app.use(cors(corsOptions));
app.use(helmet());
app.use("/clinic-crm-api", router);
app.use(errorHandler);

export default app;
