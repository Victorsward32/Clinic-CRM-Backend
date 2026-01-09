import mongoose from "mongoose";
import dotenv from "dotenv"


dotenv.config();
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.mongo_db_url);

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed ❌");
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDB;
