import { Link } from 'react-router-dom'
import profile from '../data/profile.js'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          © {year} {profile.name} · Built with React, Express &amp; MongoDB · Deployed on AWS
        </p>
        <ul className="footer-links">
          <li><a href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          <li><a href={`mailto:${profile.email}`}>Email</a></li>
          <li><Link to="/admin">Admin</Link></li>
        </ul>
      </div>
    </footer>
  )
}
