import TaskCard from './TaskCard'
import type { Task, TaskStatus } from '../types'

type TaskColumnProps = {
  status: TaskStatus
  title: string
  tasks: Task[]
  assignees: readonly { id: string; displayName: string }[]
}

export default function TaskColumn({ status, title, tasks, assignees }: TaskColumnProps) {
  return (
    <section aria-labelledby={`column-${status}`} className="min-w-0 rounded-2xl border border-slate-200 bg-slate-100/70 p-4">
      <h2 id={`column-${status}`} className="mb-4 flex items-center justify-between gap-3 text-sm font-semibold text-slate-800">
        {title}<span className="rounded-md bg-white px-2 py-1 text-xs text-slate-600">{tasks.length}<span className="sr-only"> tasks</span></span>
      </h2>
      {tasks.length === 0 ? <p className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500">No tasks here yet.</p> : (
        <ul className="space-y-3">
          {tasks.map(task => <li key={task.id}><TaskCard task={task} assigneeName={assignees.find(person => person.id === task.assigneeId)?.displayName} /></li>)}
        </ul>
      )}
    </section>
  )
}

