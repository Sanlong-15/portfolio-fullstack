import { Router } from 'express'
import {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js'
import adminAuth from '../middleware/adminAuth.js'

const router = Router()

// Public read endpoints
router.get('/', getProjects)
router.get('/:id', getProjectById)

// Protected write endpoints (require x-admin-key header)
router.post('/', adminAuth, createProject)
router.put('/:id', adminAuth, updateProject)
router.delete('/:id', adminAuth, deleteProject)

export default router
