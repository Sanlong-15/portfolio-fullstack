import "dotenv/config";
import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = Number(process.env.PORT) || 5000;

const startServer = async (port, dbConnected) => {
  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    if (!dbConnected) {
      console.warn(
        "Server started without a database connection. Configure MONGO_URI to enable data endpoints.",
      );
    }
  });

  server.on("error", (error) => {
    if (error.code === "EADDRINUSE") {
      console.warn(`Port ${port} is already in use. Trying ${port + 1}...`);
      server.close(() => startServer(port + 1, dbConnected));
    } else {
      console.error("Server error:", error.message);
      process.exit(1);
    }
  });
};

// Connect to the database first, then start listening.
const start = async () => {
  const dbConnected = await connectDB();
  await startServer(PORT, dbConnected);
};

start().catch((error) => {
  console.error("Failed to start server:", error.message);
  process.exit(1);
});
