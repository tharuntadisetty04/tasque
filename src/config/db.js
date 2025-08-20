import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    // Attempt to connect db using the URI from env variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.log("MongoDB Connection Failed:", error?.message || error);
    // Exit the process in case of failure to prevent the server from running
    process.exit(1);
  }
};
