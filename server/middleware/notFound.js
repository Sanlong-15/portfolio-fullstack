/** Runs when no route matched — returns a clean 404 JSON response. */
const notFound = (req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.originalUrl}` })
}

export default notFound
