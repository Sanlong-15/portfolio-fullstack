import Message from '../models/Message.js'

// POST /api/messages — public (contact form)
export const createMessage = async (req, res, next) => {
  try {
    // Only accept the fields we expect — ignore anything extra.
    const { name, email, subject, message } = req.body
    const saved = await Message.create({ name, email, subject, message })
    res.status(201).json({
      success: true,
      message: 'Message sent. Thank you for reaching out!',
      data: { id: saved._id },
    })
  } catch (error) {
    next(error)
  }
}

// GET /api/messages — protected (admin key). Never shown publicly.
export const getMessages = async (req, res, next) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 })
    res.status(200).json({ success: true, count: messages.length, data: messages })
  } catch (error) {
    next(error)
  }
}
