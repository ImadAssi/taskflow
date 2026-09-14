import { Link } from 'react-router-dom'

export default function SummaryCard({ label, value, to }: { label: string; value: number; to: string }) {
  return <Link to={to} className="rounded-2xl border border-slate-200 bg-white p-5 transition-colors hover:border-indigo-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"><p className="text-sm text-slate-600">{label}</p><p className="mt-3 text-3xl font-bold text-slate-950">{value}</p></Link>
}

