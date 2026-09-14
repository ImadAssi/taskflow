import { Link } from 'react-router-dom'
import type { Task } from '../../tasks/types'

export default function TaskDeadlineList({ title, description, tasks, projectTitles, emptyMessage }: { title: string; description: string; tasks: readonly Task[]; projectTitles: Record<string, string>; emptyMessage: string }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">{title} ({tasks.length})</h2><Link to="/dashboard/tasks" className="rounded text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2">View tasks</Link></div><p className="mb-5 mt-2 text-sm text-slate-500">{description}</p>
    {tasks.length === 0 ? <p className="text-sm text-slate-600">{emptyMessage}</p> : <ul className="divide-y divide-slate-100">{tasks.map(task => <li key={task.id} className="py-4 first:pt-0 last:pb-0"><h3 className="font-medium wrap-anywhere">{task.title}</h3><p className="mt-1 text-sm wrap-anywhere text-slate-600">{projectTitles[task.projectId] ?? 'Unknown project'}</p><div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-600"><span className="rounded bg-slate-100 px-2 py-1 font-semibold">{task.priority}</span>{task.dueDate && <span>Due <time dateTime={task.dueDate}>{task.dueDate}</time></span>}</div></li>)}</ul>}
  </section>
}

