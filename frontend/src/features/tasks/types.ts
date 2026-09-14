export type TaskStatus = 'TODO' | 'IN_PROGRESS' | 'DONE'
export type TaskPriority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT'

export type Task = {
  id: string
  projectId: string
  title: string
  description: string
  status: TaskStatus
  priority: TaskPriority
  dueDate: string | null
  assigneeId: string | null
  createdAt: string
}

export type TaskValues = Pick<Task, 'title' | 'description' | 'priority' | 'dueDate' | 'assigneeId'>
export type TaskErrors = Partial<Record<keyof TaskValues, string>>

