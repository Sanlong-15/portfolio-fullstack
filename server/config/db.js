import mongoose from 'mongoose'

/**
 * Connect to MongoDB using the connection string from .env.
 * The app exits if the database is not reachable, because
 * the API cannot work without it.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`MongoDB connected: ${conn.connection.host}`)
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
