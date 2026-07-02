import { useState } from 'react'
import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

/**
 * Responsive navigation bar.
 * NavLink adds an "active" class automatically for the current route.
 */
export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <nav className="navbar-inner container" aria-label="Main navigation">
        <NavLink to="/" className="navbar-brand" onClick={() => setOpen(false)}>
          <span className="brand-mark">SH</span>
          <span className="brand-name">Sanlong Huy</span>
        </NavLink>

        <button
          className="navbar-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className={`toggle-bar ${open ? 'open' : ''}`} />
        </button>

        <ul className={`navbar-links ${open ? 'show' : ''}`}>
          {LINKS.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
                onClick={() => setOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <a href="/cv.pdf" download className="btn btn-small btn-primary nav-cv">
              Download CV
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}
