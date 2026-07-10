import mongoose from 'mongoose'
import Project from '../models/Project.js'

// Helper: check that :id is a valid MongoDB ObjectId before querying.
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id)

// GET /api/projects — public
export const getProjects = async (req, res, next) => {
  try {
    const projects = await Project.find().sort({ featured: -1, createdAt: -1 })
    res.status(200).json({ success: true, count: projects.length, data: projects })
  } catch (error) {
    next(error)
  }
}

// GET /api/projects/:id — public
export const getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project id' })
    }
    const project = await Project.findById(id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.status(200).json({ success: true, data: project })
  } catch (error) {
    next(error)
  }
}

// POST /api/projects — protected (admin key)
export const createProject = async (req, res, next) => {
  try {
    const project = await Project.create(req.body)
    res.status(201).json({ success: true, message: 'Project created', data: project })
  } catch (error) {
    next(error)
  }
}

// PUT /api/projects/:id — protected (admin key)
export const updateProject = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project id' })
    }
    const project = await Project.findByIdAndUpdate(id, req.body, {
      new: true,           // return the updated document
      runValidators: true, // re-run schema validation on update
    })
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.status(200).json({ success: true, message: 'Project updated', data: project })
  } catch (error) {
    next(error)
  }
}

// DELETE /api/projects/:id — protected (admin key)
export const deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!isValidId(id)) {
      return res.status(400).json({ success: false, message: 'Invalid project id' })
    }
    const project = await Project.findByIdAndDelete(id)
    if (!project) {
      return res.status(404).json({ success: false, message: 'Project not found' })
    }
    res.status(200).json({ success: true, message: 'Project deleted' })
  } catch (error) {
    next(error)
  }
}
