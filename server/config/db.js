import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer;

/**
 * Return true if the configured URI still looks like the placeholder from .env.example.
 */
const isPlaceholderUri = (uri) =>
  !uri || /<username>|<password>|<cluster>/.test(uri);

/**
 * Connect to MongoDB using the connection string from .env.
 * If the database is unavailable, start an in-memory MongoDB instance for local development.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return true;
  }

  let uri = process.env.MONGO_URI;

  if (isPlaceholderUri(uri)) {
    console.warn(
      "Using an in-memory MongoDB instance because MONGO_URI is not configured.",
    );
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    process.env.MONGO_URI = uri;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    return false;
  }
};

export const disconnectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    await mongoose.disconnect();
  }

  if (mongoServer) {
    await mongoServer.stop();
    mongoServer = null;
  }
};

export default connectDB;
