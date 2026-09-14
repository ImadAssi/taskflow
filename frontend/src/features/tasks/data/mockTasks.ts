import type { Task } from '../types'

// Matches the existing TaskFlow launch project; no project selector yet.
export const mockTaskProjectId = 'project-1'
export const mockAssignees = [
  { id: 'user-1', displayName: 'Alex Morgan' },
  { id: 'user-2', displayName: 'Sam Rivera' },
]
export const mockTasks: Task[] = [
  { id: 'task-1', projectId: mockTaskProjectId, title: 'Review launch checklist', description: 'Confirm the essentials for the first release.', status: 'TODO', priority: 'URGENT', dueDate: '2026-09-18', assigneeId: 'user-1', createdAt: '2026-09-10T09:00:00.000Z' },
  { id: 'task-2', projectId: mockTaskProjectId, title: 'Write onboarding notes', description: '', status: 'TODO', priority: 'LOW', dueDate: null, assigneeId: null, createdAt: '2026-09-11T09:00:00.000Z' },
  { id: 'task-3', projectId: mockTaskProjectId, title: 'Polish workspace navigation', description: 'Check the mobile and keyboard experience.', status: 'IN_PROGRESS', priority: 'HIGH', dueDate: '2026-09-20', assigneeId: 'user-2', createdAt: '2026-09-12T09:00:00.000Z' },
  { id: 'task-4', projectId: mockTaskProjectId, title: 'Define project fields', description: 'Agree on the initial project domain.', status: 'DONE', priority: 'MEDIUM', dueDate: '2026-09-12', assigneeId: 'user-1', createdAt: '2026-09-09T09:00:00.000Z' },
]
export const emptyTasks: Task[] = []

