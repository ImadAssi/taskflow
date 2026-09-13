import { Link } from 'react-router-dom'

export default function DashboardPlaceholderPage({ title, notFound = false }: { title: string; notFound?: boolean }) {
  return (
    <section aria-labelledby="dashboard-page-title">
      <h1 id="dashboard-page-title" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
      <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
        <p className="text-sm leading-6 text-slate-600">{notFound ? 'This dashboard page could not be found.' : 'This area is ready for future implementation.'}</p>
        {notFound && <Link to="/dashboard" className="mt-4 inline-block rounded font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2">Return to overview</Link>}
      </div>
    </section>
  )
}

