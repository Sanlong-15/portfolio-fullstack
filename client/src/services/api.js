/**
 * API service layer — every network request goes through this file.
 * Components never call fetch() directly, which keeps them clean
 * and makes the API URL easy to change per environment (.env).
 */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

/**
 * Generic request helper using modern JS:
 * async/await, template literals, spread, destructuring, try/catch.
 */
const request = async (path, { method = 'GET', body, adminKey } = {}) => {
  const headers = { 'Content-Type': 'application/json' }
  if (adminKey) headers['x-admin-key'] = adminKey

  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body ? { body: JSON.stringify(body) } : {}),
  })

  // The API always returns JSON — even for errors.
  const data = await response.json()
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
