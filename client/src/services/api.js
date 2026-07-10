// API service layer.

// The API address comes from client/.env (VITE_API_URL)
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Shared helper used by every API call below.
const request = async (path, { method = 'GET', body, adminKey } = {}) => {
  // Step 1: build the options object piece by piece
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  }
  if (adminKey) {
    // Admin operations must prove themselves with this header
    options.headers['x-admin-key'] = adminKey
  }
  if (body) {
    // fetch() needs the body as a JSON string, not a JS object
    options.body = JSON.stringify(body)
  }

  // Step 2: send it (template literal joins the URL parts)
  const response = await fetch(`${BASE_URL}${path}`, options)

  // Step 3: our API always answers with JSON, even for errors
  const data = await response.json()

  // Step 4: response.ok is true for status 200-299
  if (!response.ok) {
    throw new Error(data.message || `Request failed (${response.status})`)
  }
  return data
}

/* ---- Projects ---- */
export const getProjects = () => request('/api/projects')
export const getProject = (id) => request(`/api/projects/${id}`)
export const createProject = (project, adminKey) =>
  request('/api/projects', { method: 'POST', body: project, adminKey })
export const updateProject = (id, project, adminKey) =>
  request(`/api/projects/${id}`, { method: 'PUT', body: project, adminKey })
export const deleteProject = (id, adminKey) =>
  request(`/api/projects/${id}`, { method: 'DELETE', adminKey })

/* ---- Messages ---- */
export const sendMessage = (message) =>
  request('/api/messages', { method: 'POST', body: message })
export const getMessages = (adminKey) => request('/api/messages', { adminKey })
