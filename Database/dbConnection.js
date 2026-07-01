import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "Hospital_Management_System_deployed",
    });

    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection failed:", error);
    throw error;
  }
};