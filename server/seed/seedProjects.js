import "dotenv/config";
import Project from "../models/Project.js";
import projectsData from "./projectsData.js";
import connectDB, { disconnectDB } from "../config/db.js";

/**
 * Seed script: fills the projects collection with starting data.
 * Run once with: npm run seed
 * It clears existing projects first so it can be re-run safely.
 */
const seed = async () => {
  try {
    const connected = await connectDB();
    if (!connected) {
      throw new Error("Database connection failed");
    }
    console.log("Connected to MongoDB");

    await Project.deleteMany();
    console.log("Cleared existing projects");

    const created = await Project.insertMany(projectsData);
    console.log(`Inserted ${created.length} projects`);

    await disconnectDB();
    console.log("Done");
  } catch (error) {
    console.error(`Seed failed: ${error.message}`);
    process.exit(1);
  }
};

seed();
