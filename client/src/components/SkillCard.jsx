const ICONS = {
  code: 'M8 6l-6 6 6 6M16 6l6 6-6 6',
  layout: 'M3 4h18v16H3zM3 9h18M9 9v11',
  server: 'M3 5h18v6H3zM3 13h18v6H3zM7 8h.01M7 16h.01',
  cloud: 'M6 18a4 4 0 1 1 .9-7.9A5.5 5.5 0 0 1 17.5 8a4.5 4.5 0 0 1 .5 9H6z',
  tool: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.9 2.9-2.1-2.1 2.9-2.9z',
  pen: 'M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z',
}

/** Card showing one skill category and its skill tags. */
export default function SkillCard({ category, icon, skills }) {
  return (
    <article className="skill-card reveal">
      <div className="skill-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"
          strokeLinecap="round" strokeLinejoin="round">
          <path d={ICONS[icon] || ICONS.code} />
        </svg>
      </div>
      <h3 className="skill-category">{category}</h3>
      <ul className="skill-tags">
        {skills.map((skill) => (
          <li className="tag" key={skill}>{skill}</li>
        ))}
      </ul>
    </article>
  )
}
