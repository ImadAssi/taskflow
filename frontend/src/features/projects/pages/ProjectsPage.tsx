import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import ProjectCard from '../components/ProjectCard'
import CreateProjectModal from '../components/CreateProjectModal'
import ProjectsEmptyState from '../components/ProjectsEmptyState'
import ProjectsLoadingState from '../components/ProjectsLoadingState'
import useProjects from '../hooks/useProjects'
import type { ProjectValues } from '../types'

export default function ProjectsPage() {
  const { projects, isLoading, createProject } = useProjects()
  const [modalOpen, setModalOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const createButtonRef = useRef<HTMLButtonElement>(null)

  function openModal() {
    setAnnouncement('')
    setModalOpen(true)
  }

  function handleCreate(values: ProjectValues) {
    const project = createProject(values)
    setModalOpen(false)
    setAnnouncement(`Project “${project.title}” created.`)
  }

  return (
    <section aria-labelledby="projects-title">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 id="projects-title" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Projects</h1>
          <p className="mt-2 text-sm text-slate-600">{isLoading ? 'Your workspace projects' : `${projects.length} ${projects.length === 1 ? 'project' : 'projects'} in your workspace`}</p>
        </div>
        <Button ref={createButtonRef} onClick={openModal} disabled={isLoading}>Create project</Button>
      </div>
      <p role="status" className={announcement ? 'mb-6 rounded-lg bg-indigo-50 p-3 text-sm wrap-anywhere text-indigo-900' : 'sr-only'}>{announcement}</p>
      {isLoading ? <ProjectsLoadingState /> : projects.length === 0 ? <ProjectsEmptyState onCreate={openModal} /> : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {projects.map(project => <li key={project.id} className="min-w-0"><ProjectCard project={project} /></li>)}
        </ul>
      )}
      {modalOpen && <CreateProjectModal onClose={() => setModalOpen(false)} onCreate={handleCreate} fallbackFocusRef={createButtonRef} />}
    </section>
  )
}
