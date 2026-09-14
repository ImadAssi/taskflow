import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import TaskBoard from '../components/TaskBoard'
import CreateTaskModal from '../components/CreateTaskModal'
import TasksLoadingState from '../components/TasksLoadingState'
import { mockAssignees } from '../data/mockTasks'
import useTasks from '../hooks/useTasks'
import type { TaskValues } from '../types'

export default function TasksPage() {
  const { tasks, isLoading, createTask } = useTasks()
  const [modalOpen, setModalOpen] = useState(false)
  const [announcement, setAnnouncement] = useState('')
  const createButtonRef = useRef<HTMLButtonElement>(null)

  function handleCreate(values: TaskValues) {
    const task = createTask(values)
    setModalOpen(false)
    setAnnouncement(`Task “${task.title}” created in To do.`)
  }

  return (
    <section aria-labelledby="tasks-title">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 id="tasks-title" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Tasks</h1>
          <p className="mt-2 text-sm text-slate-600">{isLoading ? 'Your workspace tasks' : `${tasks.length} ${tasks.length === 1 ? 'task' : 'tasks'} in your workspace`}</p>
        </div>
        <Button ref={createButtonRef} disabled={isLoading} onClick={() => { setAnnouncement(''); setModalOpen(true) }}>Create task</Button>
      </div>
      <p role="status" className={announcement ? 'mb-6 rounded-lg bg-indigo-50 p-3 text-sm wrap-anywhere text-indigo-900' : 'sr-only'}>{announcement}</p>
      {!isLoading && tasks.length === 0 && <p className="mb-6 text-sm text-slate-600">Create your first task to start organizing your work.</p>}
      {isLoading ? <TasksLoadingState /> : <TaskBoard tasks={tasks} assignees={mockAssignees} />}
      {modalOpen && <CreateTaskModal onClose={() => setModalOpen(false)} onCreate={handleCreate} fallbackFocusRef={createButtonRef} />}
    </section>
  )
}

