export default function TeamsLoadingState() {
  return <div role="status"><span className="sr-only">Loading members…</span><div aria-hidden="true" className="space-y-3">{[0, 1, 2].map(key => <div key={key} className="h-24 rounded-xl border border-slate-200 bg-white motion-safe:animate-pulse" />)}</div></div>
}

