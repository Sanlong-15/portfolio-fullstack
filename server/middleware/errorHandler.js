// Central error handler — runs when any controller calls next(error).
const errorHandler = (err, req, res, next) => {
  // Mongoose schema validation failed
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ success: false, message: messages.join('. ') })
  }

  // Malformed ObjectId that slipped through
  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, message: 'Invalid id format' })
  }

  // Log full details on the server only — do not expose to users
  console.error(err)
  res.status(500).json({ success: false, message: 'Something went wrong on the server' })
}

export default errorHandler
