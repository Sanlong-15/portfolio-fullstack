import mongoose from 'mongoose'

/**
 * Project schema — matches the fields suggested in the assessment.
 * Mongoose validation runs before every save, so bad data
 * never reaches the database (server-side validation).
 */
const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters'],
      maxlength: [100, 'Title must be at most 100 characters'],
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
      maxlength: [2000, 'Description must be at most 2000 characters'],
    },
    problem: { type: String, trim: true, default: '' },
    features: { type: [String], default: [] },
    technologies: {
      type: [String],
      validate: {
        validator: (arr) => arr.length > 0,
        message: 'At least one technology is required',
      },
    },
    imageUrl: { type: String, trim: true, default: '' },
    githubUrl: { type: String, trim: true, default: '' },
    liveUrl: { type: String, trim: true, default: '' },
    contribution: { type: String, trim: true, default: '' },
    challenges: { type: String, trim: true, default: '' },
    lessonsLearned: { type: String, trim: true, default: '' },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true } // adds createdAt and updatedAt automatically
)

const Project = mongoose.model('Project', projectSchema)
export default Project
