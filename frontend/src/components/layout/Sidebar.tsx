import { Link } from 'react-router-dom'
import DashboardNav from './DashboardNav'

export default function Sidebar() {
  return (
    <aside className="sticky top-0 hidden h-svh w-64 shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-6 lg:block">
      <Link to="/dashboard" className="inline-block rounded text-2xl font-bold tracking-tight text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4">TaskFlow<span className="text-indigo-400">.</span></Link>
      <p className="mb-3 mt-10 px-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Workspace</p>
      <DashboardNav />
    </aside>
  )
}

