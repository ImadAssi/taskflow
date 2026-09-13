import type { Project } from '../types'

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' })

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="flex h-full min-w-0 flex-col rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold wrap-anywhere text-slate-950">{project.title}</h2>
      <p className="mt-3 flex-1 whitespace-pre-wrap text-sm leading-6 wrap-anywhere text-slate-600">{project.description || 'No description provided.'}</p>
      <p className="mt-6 text-xs text-slate-500">Created <time dateTime={project.createdAt}>{dateFormatter.format(new Date(project.createdAt))}</time></p>
    </article>
  )
}

