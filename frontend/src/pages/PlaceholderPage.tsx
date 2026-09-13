import { NavLink } from 'react-router-dom'

type PlaceholderPageProps = {
  title: string
}

export default function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <main className="mx-auto min-h-screen max-w-4xl px-6 py-12">
      <p className="text-sm font-semibold text-slate-600">TaskFlow</p>
      <nav aria-label="Main navigation" className="mt-4 flex flex-wrap gap-4">
        {[
          ['/', 'Home'],
          ['/login', 'Login'],
          ['/register', 'Register'],
          ['/dashboard', 'Dashboard'],
        ].map(([to, label]) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `rounded px-2 py-1 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 ${isActive ? 'font-semibold text-blue-700' : 'text-slate-600'}`
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>
      <h1 className="mt-10 text-3xl font-semibold">{title}</h1>
      <p className="mt-3 text-slate-600">Temporary route placeholder.</p>
    </main>
  )
}
