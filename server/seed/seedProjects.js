import 'dotenv/config'
import mongoose from 'mongoose'
import Project from '../models/Project.js'
import projectsData from './projectsData.js'

/**
 * Seed script: fills the projects collection with starting data.
 * Run once with:  npm run seed
 * It clears existing projects first so it can be re-run safely.
 */
const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    console.log('Connected to MongoDB')

    await Project.deleteMany()
    console.log('Cleared existing projects')

    const created = await Project.insertMany(projectsData)
    console.log(`Inserted ${created.length} projects`)

    await mongoose.disconnect()
    console.log('Done')
  } catch (error) {
    console.error(`Seed failed: ${error.message}`)
    process.exit(1)
  }
}

seed()
