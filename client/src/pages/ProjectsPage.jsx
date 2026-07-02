import { useState, useMemo, useCallback } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectDetails from '../components/ProjectDetails.jsx'
import Modal from '../components/Modal.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'
import { getProjects } from '../services/api.js'

/**
 * Projects page — data comes from MongoDB through the REST API.
 * Demonstrates: API requests, loading/error states, list rendering,
 * filtering with array methods, and a details modal.
 */
export default function ProjectsPage() {
  const fetcher = useCallback(() => getProjects(), [])
  const { data: projects, loading, error, refetch } = useFetch(fetcher)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  // Build the unique technology list for filter buttons.
  const techFilters = useMemo(() => {
    if (!projects) return []
    const all = projects.flatMap((p) => p.technologies)
    return ['All', ...new Set(all)]
  }, [projects])

  // filter() keeps only projects that use the chosen technology.
  const visible = useMemo(() => {
    if (!projects) return []
    if (filter === 'All') return projects
    return projects.filter((p) => p.technologies.includes(filter))
  }, [projects, filter])

  return (
    <div className="section container">
      <SectionHeading
        label="Work"
        title="My Projects"
        subtitle="Loaded live from MongoDB through my RESTful API."
        center
      />

      {loading && <Loading text="Loading projects…" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && projects && (
        <>
          <div className="filter-bar" role="group" aria-label="Filter projects by technology">
            {techFilters.map((tech) => (
              <button
                key={tech}
                className={`filter-chip ${filter === tech ? 'active' : ''}`}
                onClick={() => setFilter(tech)}
              >
                {tech}
              </button>
            ))}
          </div>

          {visible.length === 0 ? (
            <p className="empty-note">No projects match this filter yet.</p>
          ) : (
            <div className="projects-grid">
              {visible.map((project) => (
                <ProjectCard key={project._id} project={project} onDetails={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <ProjectDetails project={selected} />
        </Modal>
      )}
    </div>
  )
}
