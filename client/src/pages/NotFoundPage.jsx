import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="section container notfound">
      <p className="notfound-code">404</p>
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
