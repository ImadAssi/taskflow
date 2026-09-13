export default function ProjectsLoadingState() {
  return (
    <div role="status">
      <p className="sr-only">Loading projects…</p>
      <div aria-hidden="true" className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {[0, 1, 2].map(key => (
          <div key={key} className="rounded-2xl border border-slate-200 bg-white p-6 motion-safe:animate-pulse">
            <div className="h-6 w-2/3 rounded bg-slate-200" />
            <div className="mt-5 h-4 rounded bg-slate-100" />
            <div className="mt-2 h-4 w-3/4 rounded bg-slate-100" />
            <div className="mt-8 h-3 w-1/2 rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  )
}

