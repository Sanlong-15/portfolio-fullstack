import { useState } from 'react'
import SectionHeading from '../components/SectionHeading.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import ProjectDetails from '../components/ProjectDetails.jsx'
import Modal from '../components/Modal.jsx'
import Loading from '../components/Loading.jsx'
import ErrorMessage from '../components/ErrorMessage.jsx'
import useFetch from '../hooks/useFetch.js'
import useScrollReveal from '../hooks/useScrollReveal.js'
import { getProjects } from '../services/api.js'

/**
 * Projects page. The data comes from MongoDB through the REST API.
 * Shows: loading spinner → then either an error box or the project cards.
 */
export default function ProjectsPage() {
  // Load all projects from the API (see hooks/useFetch.js)
  const { data: projects, loading, error, refetch } = useFetch(getProjects)

  // re-run the reveal animation scan when the projects arrive
  const ref = useScrollReveal(projects)

  // Which technology filter is active, e.g. 'All' or 'React'
  const [filter, setFilter] = useState('All')

  // Which project is open in the details modal (null = closed)
  const [selected, setSelected] = useState(null)

  // These are plain variables, recalculated on every render.
  // The list is small, so that is perfectly fine.
  let techFilters = []
  let visibleProjects = []

  if (projects) {
    // Step 1: collect the technologies of ALL projects into one list.
    // flatMap turns [['HTML','CSS'], ['React']] into ['HTML','CSS','React']
    const allTechnologies = projects.flatMap((project) => project.technologies)

    // Step 2: new Set(...) removes duplicates, then we add 'All' in front
    techFilters = ['All', ...new Set(allTechnologies)]

    // Step 3: keep only the projects that use the chosen technology
    if (filter === 'All') {
      visibleProjects = projects
    } else {
      visibleProjects = projects.filter((project) =>
        project.technologies.includes(filter)
      )
    }
  }

  return (
    <div className="section container" ref={ref}>
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
