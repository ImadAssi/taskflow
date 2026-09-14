import { useEffect, useState } from 'react'
import { mockTaskProjectId, mockTasks } from '../data/mockTasks'
import type { Task, TaskValues } from '../types'

export default function useTasks(initialTasks: readonly Task[] = mockTasks) {
  const [tasks, setTasks] = useState<Task[]>(() => initialTasks.map(task => ({ ...task })))
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500)
    return () => window.clearTimeout(timer)
  }, [])

  function createTask(values: TaskValues) {
    const task: Task = {
      ...values,
      id: crypto.randomUUID(),
      projectId: mockTaskProjectId,
      title: values.title.trim(),
      description: values.description.trim(),
      status: 'TODO',
      createdAt: new Date().toISOString(),
    }
    setTasks(current => [...current, task])
    return task
  }
  return { tasks, isLoading, createTask }
}

