import { useEffect, useState } from 'react'
import { mockProjects } from '../data/mockProjects'
import type { Project, ProjectValues } from '../types'

export default function useProjects(initialProjects: readonly Project[] = mockProjects) {
  const [projects, setProjects] = useState<Project[]>(() => initialProjects.map(project => ({ ...project })))
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500)
    return () => window.clearTimeout(timer)
  }, [])

  function createProject(values: ProjectValues) {
    const project: Project = {
      id: crypto.randomUUID(),
      title: values.title.trim(),
      description: values.description.trim(),
      createdAt: new Date().toISOString(),
    }
    setProjects(current => [...current, project])
    return project
  }

  return { projects, isLoading, createProject }
}

