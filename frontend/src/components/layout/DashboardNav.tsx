import { NavLink } from 'react-router-dom'
import { dashboardNavigation } from './navigation'

export default function DashboardNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav aria-label="Dashboard navigation">
      <ul className="space-y-1">
        {dashboardNavigation.map(({ label, to, end }) => (
          <li key={to}>
            <NavLink to={to} end={end} onClick={onNavigate}
              className={({ isActive }) => `flex min-h-11 items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${isActive ? 'bg-indigo-50 font-semibold text-indigo-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

