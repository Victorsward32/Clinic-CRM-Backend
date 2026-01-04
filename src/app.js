import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./route/routes.js";

// ---------- Express Middlewares ------------//
const app= express();

app.use(express.json())
app.use(cors());
app.use(helmet());
app.use("/clinic-crm-api",router);

export default app