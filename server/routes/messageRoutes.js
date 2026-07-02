import { Router } from 'express'
import { createMessage, getMessages } from '../controllers/messageController.js'
import adminAuth from '../middleware/adminAuth.js'

const router = Router()

// Public: anyone can send a contact message
router.post('/', createMessage)

// Protected: only the admin can read messages (never displayed publicly)
router.get('/', adminAuth, getMessages)

export default router
