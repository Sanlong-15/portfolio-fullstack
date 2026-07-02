import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (port, dbConnected) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    if (!dbConnected) {
      console.war