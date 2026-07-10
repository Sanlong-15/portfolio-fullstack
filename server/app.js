import express from 'express'
import cors from 'cors'
import projectRoutes from './routes/projectRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import errorHandler from './middleware/errorHandler.js'
import notFound from './middleware/notFound.js'

// app.js builds the Express application (routes + middleware).
const app = express()

// CORS: only allow the configured frontend origin (plus localhost dev)
const allowedOrigins = [process.env.CLIENT_ORIGIN, 'http://localhost:5173'].filter(Boolean)
app.use(cors({ origin: allowedOrigins }))

// Parse JSON request bodies (limit protects against huge payloads)
app.use(express.json({ limit: '100kb' }))

// Health check — useful for testing deployment
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'API is running' })
})

// Main resources
app.use('/api/projects', projectRoutes)
app.use('/api/messages', messageRoutes)

// 404 + central error handling (order matters: these come last)
app.use(notFound)
app.use(errorHandler)

export default app
