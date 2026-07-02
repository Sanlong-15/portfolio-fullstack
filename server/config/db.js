import mongoose from "mongoose";

let mongoServer;

/**
 * Return true if the configured URI still looks like the placeholder
 * from .env.example (meaning the developer forgot to set a real one).
 */
const isPlaceholderUri = (uri) =>
  !uri || /<username>|<password>|<cluster>/.test(uri);

/**
 * Connect to MongoDB using the connection string from .env.
 *
 * Development helper: if MONGO_URI is missing or still a placeholder,
 * start a TEMPORARY in-memory MongoDB so the app can run locally.
 * The package for this exists only in devDependencies, so it is
 * loaded with a dynamic import — production never needs it.
 */
const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    return true;
  }

  let uri = process.env.MONGO_URI;

  if (isPlaceholderUri(uri)) {
    console.warn("==============================================");
    console.warn("WARNING: MONGO_URI is not configured!");
    console.warn("Starting a TEMPORARY in-memory database.");
    console.warn("ALL DATA WILL BE LOST when the server stops.");
    console.warn("Set a real Atlas URI in .env for real storage.");
    console.warn("==============================================");
    // Dynamic import: only loaded here, never in production
    const { MongoMemoryServer } = await import("mongodb-memory-server");
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
