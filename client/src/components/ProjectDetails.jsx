// Full project information shown inside the Modal.
const Row = ({ label, children }) =>
  children ? (
    <div className="detail-row">
      <h4>{label}</h4>
      <div>{children}</div>
    </div>
  ) : null

export default function ProjectDetails({ project }) {
  const {
    description, problem, features = [], technologies = [],
    contribution, challenges, lessonsLearned, githubUrl, liveUrl,
  } = project

  return (
    <div className="project-details">
      <Row label="About">{description}</Row>
      <Row label="Problem it addresses">{problem}</Row>
      {features.length > 0 && (
        <Row label="Main features">
          <ul className="detail-list">
            {features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </Row>
      )}
      <Row label="Technologies">{technologies.join(', ')}</Row>
      <Row label="My contribution">{contribution}</Row>
      <Row label="Challenges">{challenges}</Row>
      <Row label="Lessons learned">{lessonsLearned}</Row>
      {(githubUrl || liveUrl) && (
        <Row label="Links">
          <p className="detail-links">
            {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub repository</a>}
            {githubUrl && liveUrl && ' · '}
            {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live / design link</a>}
          </p>
        </Row>
      )}
    </div>
  )
}
