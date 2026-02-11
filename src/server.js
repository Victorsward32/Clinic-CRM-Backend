
import app from "./app.js"
import http from "http"
import connectDB from "./config/db.js";
// import "./jobs/reminder.job.js"
import { initSocketServer } from "./socket/server.js";
import env from "./config/env.js";
import logger from "./services/logger.service.js";

const PORT=env.port;

const server=http.createServer(app); // Create HTTP server Because app is express application 


//initalize Socket.io
initSocketServer(server);
connectDB().then(
    ()=>{
    server.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});   
    }
)


