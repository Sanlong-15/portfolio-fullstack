import { useState } from 'react'
import { sendMessage } from '../services/api.js'
import Button from './Button.jsx'

const EMPTY = { name: '', email: '', subject: '', message: '' }

/**
 * Controlled contact form with client-side validation.
 * The server validates again. Never trust only the browser.
 */
export default function ContactForm() {
  const [form, setForm] = useState(EMPTY)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [serverError, setServerError] = useState('')

  const validate = () => {
    const next = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) next.subject = 'Please enter a subject.'
    if (form.message.trim().length < 10) next.message = 'Message must be at least 10 characters.'
    if (form.message.length > 3000) next.message = 'Message is too long (max 3000 characters).'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    try {
      setStatus('sending')
      setServerError('')
      await sendMessage(form)
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      setStatus('error')
      setServerError(err.message)
    }
  }

  if (status === 'success') {
    return (
      <div className="form-success" role="status">
        <h3>Message sent ✓</h3>
        <p>Thank you for reaching out. I will reply as soon as I can.</p>
        <Button variant="outline" small onClick={() => setStatus('idle')}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input
            id="name" name="name" type="text" value={form.name}
            onChange={handleChange} aria-invalid={Boolean(errors.name)}
            autoComplete="name"
          />
          {errors.name && <p className="field-error">{errors.name}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email" name="email" type="email" value={form.email}
            onChange={handleChange} aria-invalid={Boolean(errors.email)}
            autoComplete="email"
          />
          {errors.email && <p className="field-error">{errors.email}</p>}
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject" name="subject" type="text" value={form.subject}
          onChange={handleChange} aria-invalid={Boolean(errors.subject)}
        />
        {errors.subject && <p className="field-error">{errors.subject}</p>}
      </div>

      <div className="form-field">
        <label htmlFor="message">Message</label>
        <textarea
          id="message" name="message" rows="6" value={form.message}
          onChange={handleChange} aria-invalid={Boolean(errors.message)}
        />
        {errors.message && <p className="field-error">{errors.message}</p>}
      </div>

      {status === 'error' && <p className="field-error form-server-error">{serverError}</p>}

      <Button type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send Message'}
      </Button>
    </form>
  )
}
