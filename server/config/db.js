import mongoose from "mongoose";

/**
 * Connect to MongoDB using the connection string from .env.
 * If the database is unavailable, the server still starts so local
 * development can continue and the API can report a clear warning.
 */
const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    console.warn(
      "MONGO_URI is not configured. Starting server without a database connection.",
    );
    return false;
  }

  try {
    const conn = await mongoose.connect(process.env.M