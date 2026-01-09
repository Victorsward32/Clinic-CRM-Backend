
import app from "./app.js"
import connectDB from "./config/db.js";
// import "./jobs/reminder.job.js"
import dotenv from 'dotenv'
dotenv.config();

const PORT=process.env.port ;


connectDB().then(
    ()=>{
    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});   
    }
)


