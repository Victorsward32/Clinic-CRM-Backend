
import app from "./app.js"
import http from "http"
import connectDB from "./config/db.js";
// import "./jobs/reminder.job.js"
import dotenv from 'dotenv'
import { initSocketServer } from "./socket/server.js";
dotenv.config();

const PORT=process.env.port || 3000 ;

const server=http.createServer(app); // Create HTTP server Because app is express application 


//initalize Socket.io
initSocketServer(server);
connectDB().then(
    ()=>{
    server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});   
    }
)


