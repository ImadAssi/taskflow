export default function TasksLoadingState() {
  return (
    <div role="status">
      <span className="sr-only">Loading tasks…</span>
      <div aria-hidden="true" className="grid gap-5 xl:grid-cols-3">
        {[0, 1, 2].map(key => <div key={key} className="rounded-2xl border border-slate-200 bg-slate-100 p-4 motion-safe:animate-pulse"><div className="mb-5 h-5 w-1/2 rounded bg-slate-200" /><div className="h-40 rounded-xl bg-white" /></div>)}
      </div>
    </div>
  )
}

