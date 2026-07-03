import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import Button from '../components/Button.jsx'
import Modal from '../components/Modal.jsx'
import useFetch from '../hooks/useFetch.js'
import { getProjects, createProject, updateProject, deleteProject } from '../services/api.js'

const EMPTY_PROJECT = {
  title: '', description: '', problem: '', features: '', technologies: '',
  imageUrl: '', githubUrl: '', liveUrl: '', contribution: '', challenges: '',
  lessonsLearned: '', featured: false,
}

/** Convert the form (strings) into the API shape (arrays). */
const toApiShape = (form) => ({
  ...form,
  features: form.features.split('\n').map((s) => s.trim()).filter(Boolean),
  technologies: form.technologies.split(',').map((s) => s.trim()).filter(Boolean),
})

/** Convert an API project into editable form values. */
const toFormShape = (project) => ({
  ...EMPTY_PROJECT,
  ...project,
  features: (project.features || []).join('\n'),
  technologies: (project.technologies || []).join(', '),
})

/**
 * Admin dashboard with full CRUD over /api/projects.
 * Write operations require the admin key, which is sent as the
 * x-admin-key header and kept only in this session (never in code).
 */
export default function AdminPage() {
  const [adminKey, setAdminKey] = useState(sessionStorage.getItem('adminKey') || '')
  const [unlocked, setUnlocked] = useState(Boolean(adminKey))
  // Load the project list from the API (same hook the public page uses)
  const { data: projects, loading, error, refetch } = useFetch(getProjects)

  const [editing, setEditing] = useState(null)   // null | 'new' | project object
  const [form, setForm] = useState(EMPTY_PROJECT)
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState('')

  const unlock = (e) => {
    e.preventDefault()
    sessionStorage.setItem('adminKey', adminKey)
    setUnlocked(true)
  }

  const openNew = () => {
    setForm(EMPTY_PROJECT)
    setEditing('new')
  }

  const openEdit = (project) => {
    setForm(toFormShape(project))
    setEditing(project)
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const save = async (e) => {
    e.preventDefault()
    try {
      setBusy(true)
      setFeedback('')
      const payload = toApiShape(form)
      if (editing === 'new') {
        await createProject(payload, adminKey)
        setFeedback('Project created.')
      } else {
        await updateProject(editing._id, payload, adminKey)
        setFeedback('Project updated.')
      }
      setEditing(null)
      refetch()
    } catch (err) {
      setFeedback(`Error: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  const remove = async (project) => {
    const sure = window.confirm(`Delete "${project.title}"? This cannot be undone.`)
    if (!sure) return
    try {
      setBusy(true)
      await deleteProject(project._id, adminKey)
      setFeedback('Project deleted.')
      refetch()
    } catch (err) {
      setFeedback(`Error: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  if (!unlocked) {
    return (
      <div className="section container admin-lock">
        <SectionHeading label="Admin" title="Management Dashboard" center />
        <form className="contact-form admin-key-form" onSubmit={unlock}>
          <div className="form-field">
            <label htmlFor="adminKey">Admin key</label>
            <input
              id="adminKey" type="password" value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              placeholder="Enter the admin key" required
            />
          </div>
          <Button type="submit">Unlock dashboard</Button>
          <p className="admin-note">
            The key is checked by the server on every write operation.
          </p>
        </form>
      </div>
    )
  }

  return (
    <div className="section container">
      <SectionHeading label="Admin" title="Manage Projects" />
      <div className="admin-toolbar">
        <Button small onClick={openNew}>+ Add project</Button>
        <Button small variant="ghost" onClick={() => { sessionStorage.removeItem('adminKey'); setUnlocked(false); setAdminKey('') }}>
          Lock
        </Button>
        {feedback && <span className="admin-feedback" role="status">{feedback}</span>}
      </div>

      {loading && <Loading text="Loading projects…" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && projects && (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Technologies</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project._id}>
                  <td>{project.title}</td>
                  <td>{project.technologies.join(', ')}</td>
                  <td>{project.featured ? 'Yes' : 'No'}</td>
                  <td className="admin-actions">
                    <Button small variant="outline" onClick={() => openEdit(project)} disabled={busy}>Edit</Button>
                    <Button small variant="danger" onClick={() => remove(project)} disabled={busy}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <Modal
          title={editing === 'new' ? 'Add project' : `Edit: ${editing.title}`}
          onClose={() => setEditing(null)}
        >
          <form className="contact-form" onSubmit={save}>
            <div className="form-field">
              <label htmlFor="p-title">Title *</label>
              <input id="p-title" name="title" value={form.title} onChange={handleChange} required minLength="3" maxLength="100" />
            </div>
            <div className="form-field">
              <label htmlFor="p-description">Description *</label>
              <textarea id="p-description" name="description" rows="3" value={form.description} onChange={handleChange} required />
            </div>
            <div className="form-field">
              <label htmlFor="p-problem">Problem addressed</label>
              <textarea id="p-problem" name="problem" rows="2" value={form.problem} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="p-features">Main features (one per line)</label>
              <textarea id="p-features" name="features" rows="3" value={form.features} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="p-technologies">Technologies (comma separated) *</label>
              <input id="p-technologies" name="technologies" value={form.technologies} onChange={handleChange} required />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="p-imageUrl">Image URL</label>
                <input id="p-imageUrl" name="imageUrl" value={form.imageUrl} onChange={handleChange} />
              </div>
              <div className="form-field">
                <label htmlFor="p-githubUrl">GitHub URL</label>
                <input id="p-githubUrl" name="githubUrl" value={form.githubUrl} onChange={handleChange} />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="p-liveUrl">Live / design URL</label>
              <input id="p-liveUrl" name="liveUrl" value={form.liveUrl} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="p-contribution">My contribution</label>
              <textarea id="p-contribution" name="contribution" rows="2" value={form.contribution} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="p-challenges">Challenges</label>
              <textarea id="p-challenges" name="challenges" rows="2" value={form.challenges} onChange={handleChange} />
            </div>
            <div className="form-field">
              <label htmlFor="p-lessons">Lessons learned</label>
              <textarea id="p-lessons" name="lessonsLearned" rows="2" value={form.lessonsLearned} onChange={handleChange} />
            </div>
            <div className="form-field form-check">
              <label>
                <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                {' '}Featured project
              </label>
            </div>
            <Button type="submit" disabled={busy}>{busy ? 'Saving…' : 'Save project'}</Button>
          </form>
        </Modal>
      )}
    </div>
  )
}
