
import app from "./app.js"
import connectDB from "./config/db.js";
// import "./jobs/reminder.job.js"

const PORT= 3000;


connectDB().then(
    ()=>{
    app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});   
    }
)


