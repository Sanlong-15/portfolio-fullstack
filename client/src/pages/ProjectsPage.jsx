import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectDetails from '../components/ProjectDetails.jsx'
import Modal from '../components/Modal.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'
import { getProjects } from '../services/api.js'

// Projects page.
export default function ProjectsPage() {
  const { data: projects, loading, error, refetch } = useFetch(getProjects)
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)
  let techFilters = []
  let visibleProjects = []

  if (projects) {
    const allTechnologies = projects.flatMap((project) => project.technologies)
    techFilters = ['All', ...new Set(allTechnologies)]
    if (filter === 'All') {
      visibleProjects = projects
    } else {
      visibleProjects = projects.filter((project) =>
        project.technologies.includes(filter)
      )
    }
  }

  return (
    <div className="section container">
      <SectionHeading
        label="Work"
        title="My Projects"
        subtitle="Loaded live from MongoDB through my RESTful API."
        center
      />

      {/* Conditional rendering: only ONE of these three blocks shows */}
      {loading && <Loading text="Loading projects…" />}
      {error && <ErrorMessage message={error} onRetry={refetch} />}

      {!loading && !error && projects && (
        <>
          {/* Filter buttons, one per technology */}
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

          {visibleProjects.length === 0 ? (
            <p className="empty-note">No projects match this filter yet.</p>
          ) : (
            <div className="projects-grid">
              {visibleProjects.map((project) => (
                <ProjectCard key={project._id} project={project} onDetails={setSelected} />
              ))}
            </div>
          )}
        </>
      )}

      {/* The details modal opens when a project is selected */}
      {selected && (
        <Modal title={selected.title} onClose={() => setSelected(null)}>
          <ProjectDetails project={selected} />
        </Modal>
      )}
    </div>
  )
}
