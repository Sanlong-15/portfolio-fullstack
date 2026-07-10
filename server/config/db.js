import mongoose from "mongoose";

// When the DB is not connected, fail queries immediately instead of
// buffering them for ~10s. This turns a long hang into a fast, clear error.
mongoose.set("bufferCommands", false);

let mongoServer;

// Return true if the configured URI still looks like the placeholder from .env.example.
const isPlaceholderUri = (uri) =>
  !uri || /<username>|<password>|<cluster>/.test(uri);

// Connect to MongoDB using the connection string from .env.
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
    const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
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
