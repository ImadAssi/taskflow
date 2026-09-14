import { Link } from 'react-router-dom'
import type { Project } from '../../projects/types'

export default function RecentProjects({ projects }: { projects: readonly Project[] }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6"><div className="mb-5 flex flex-wrap items-center justify-between gap-3"><h2 className="text-lg font-semibold">Recent projects</h2><Link to="/dashboard/projects" className="rounded text-sm font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2">View projects</Link></div>
    {projects.length === 0 ? <p className="text-sm text-slate-600">No projects yet.</p> : <ul className="divide-y divide-slate-100">{projects.map(project => <li key={project.id} className="py-4 first:pt-0 last:pb-0"><h3 className="font-medium wrap-anywhere text-slate-950">{project.title}</h3><p className="mt-1 line-clamp-2 text-sm wrap-anywhere text-slate-600">{project.description || 'No description provided.'}</p><p className="mt-2 text-xs text-slate-500">Created <time dateTime={project.createdAt}>{project.createdAt.slice(0, 10)}</time></p></li>)}</ul>}
  </section>
}

