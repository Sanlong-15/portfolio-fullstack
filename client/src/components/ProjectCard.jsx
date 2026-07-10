import { useState } from 'react'
import Button from './Button.jsx'

// Card for one project.
export default function ProjectCard({ project, onDetails }) {
  const { title, description, technologies, imageUrl, githubUrl, liveUrl, featured } = project
  const [imgBroken, setImgBroken] = useState(false)

  return (
    <article className="project-card">
      <div className="project-media">
        {imageUrl && !imgBroken ? (
          <img src={imageUrl} alt={`${title} preview`} loading="lazy" onError={() => setImgBroken(true)} />
        ) : (
          <div className="project-media-fallback" aria-hidden="true">{title.charAt(0)}</div>
        )}
        {featured && <span className="badge-featured">Featured</span>}
      </div>

      <div className="project-body">
        <h3 className="project-title">{title}</h3>
        <p className="project-desc">{description}</p>
        <ul className="skill-tags">
          {technologies.map((tech) => (
            <li className="tag" key={tech}>{tech}</li>
          ))}
        </ul>
        <div className="project-actions">
          <Button small onClick={() => onDetails(project)}>Details</Button>
          {githubUrl && (
            <Button small variant="outline" href={githubUrl} target="_blank" rel="noopener noreferrer">
              GitHub
            </Button>
          )}
          {liveUrl && (
            <Button small variant="ghost" href={liveUrl} target="_blank" rel="noopener noreferrer">
              Live / Design
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
