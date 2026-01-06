import express from "express";
import cors from "cors";
import helmet from "helmet";
import router from "./route/routes.js";
import errorHandler from "./middlewares/error.middleware.js";

// ---------- Express Middlewares ------------//
const app= express();

app.use(express.json())
app.use(cors());
app.use(helmet());
app.use("/clinic-crm-api",router);
app.use(errorHandler);

export default app