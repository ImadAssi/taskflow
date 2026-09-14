import type { TaskErrors, TaskValues } from './types'

export function isValidDueDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value) || value.startsWith('0000')) return false
  const date = new Date(value + 'T00:00:00.000Z')
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value
}

export function validateTask(values: TaskValues, assigneeIds: readonly string[]): TaskErrors {
  const errors: TaskErrors = {}
  if (!values.title.trim()) errors.title = 'Enter a task title.'
  else if (values.title.trim().length > 80) errors.title = 'Use 80 characters or fewer.'
  if (values.description.trim().length > 500) errors.description = 'Use 500 characters or fewer.'
  if (!['LOW', 'MEDIUM', 'HIGH', 'URGENT'].includes(values.priority)) errors.priority = 'Choose a valid priority.'
  if (values.dueDate !== null && !isValidDueDate(values.dueDate)) errors.dueDate = 'Enter a valid date in YYYY-MM-DD format.'
  if (values.assigneeId !== null && !assigneeIds.includes(values.assigneeId)) errors.assigneeId = 'Choose an available assignee.'
  return errors
}

