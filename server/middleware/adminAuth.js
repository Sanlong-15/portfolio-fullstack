// Simple admin protection.
const adminAuth = (req, res, next) => {
  const key = req.headers['x-admin-key']
  if (!process.env.ADMIN_KEY) {
    return res.status(500).json({ success: false, message: 'Server is missing ADMIN_KEY configuration' })
  }
  if (!key || key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ success: false, message: 'Unauthorized: valid admin key required' })
  }
  next()
}

export default adminAuth
