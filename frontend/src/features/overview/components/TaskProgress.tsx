import type { TaskStatus } from '../../tasks/types'

export default function TaskProgress({ counts, rate, total }: { counts: Record<TaskStatus, number>; rate: number; total: number }) {
  return <section className="rounded-2xl border border-slate-200 bg-white p-6"><h2 className="text-lg font-semibold">Task progress</h2><p className="mb-3 mt-5 text-sm text-slate-600">{counts.DONE} of {total} tasks completed · {rate}%</p><progress aria-label="Task completion" value={rate} max={100} className="h-3 w-full accent-indigo-700" /><dl className="mt-5 space-y-3 text-sm">{([['TODO', 'To do'], ['IN_PROGRESS', 'In progress'], ['DONE', 'Done']] as const).map(([status, label]) => <div key={status} className="flex justify-between gap-3"><dt className="text-slate-600">{label}</dt><dd className="font-semibold">{counts[status]}</dd></div>)}</dl>{total === 0 && <p className="mt-4 text-sm text-slate-500">No tasks to summarize yet.</p>}</section>
}

