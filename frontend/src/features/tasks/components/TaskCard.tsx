import type { Task, TaskPriority } from '../types'

const priorityStyles: Record<TaskPriority, string> = {
  LOW: 'bg-slate-100 text-slate-700',
  MEDIUM: 'bg-indigo-50 text-indigo-700',
  HIGH: 'bg-amber-50 text-amber-800',
  URGENT: 'bg-red-50 text-red-700',
}
const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium', timeZone: 'UTC' })

export default function TaskCard({ task, assigneeName }: { task: Task; assigneeName?: string }) {
  return (
    <article className="min-w-0 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <span className={`inline-block rounded-md px-2 py-1 text-xs font-semibold ${priorityStyles[task.priority]}`}>{task.priority}</span>
      <h3 className="mt-3 font-semibold wrap-anywhere text-slate-950">{task.title}</h3>
      {task.description && <p className="mt-2 line-clamp-3 whitespace-pre-wrap text-sm leading-6 wrap-anywhere text-slate-600">{task.description}</p>}
      <div className="mt-5 space-y-2 text-xs text-slate-500">
        <p>{task.dueDate ? <>Due <time dateTime={task.dueDate}>{dateFormatter.format(new Date(task.dueDate + 'T00:00:00.000Z'))}</time></> : 'No due date'}</p>
        <p className="wrap-anywhere">Assignee: {assigneeName ?? 'Unassigned'}</p>
      </div>
    </article>
  )
}

