import type { Project } from '../types'

export const mockProjects: Project[] = [
  { id: 'project-1', title: 'TaskFlow launch', description: 'Organize the work for our first release.', createdAt: '2026-09-01T09:00:00.000Z' },
  { id: 'project-2', title: 'Team onboarding', description: 'Create a welcoming start for new teammates.', createdAt: '2026-09-05T09:00:00.000Z' },
  { id: 'project-3', title: 'Workspace improvements', description: 'Collect ideas to make everyday collaboration easier.', createdAt: '2026-09-10T09:00:00.000Z' },
]

// Pass this fixture to useProjects to preview the empty state.
export const emptyProjects: Project[] = []

