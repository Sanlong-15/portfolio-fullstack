// Consistent heading block used at the top of every section.
export default function SectionHeading({ label, title, subtitle, center }) {
  return (
    <div className={`section-heading${center ? ' center' : ''}`}>
      {label && <span className="section-label">{label}</span>}
      <h2 className="section-title">{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  )
}
