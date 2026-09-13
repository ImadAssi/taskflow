import { Link, Outlet } from 'react-router-dom'

export default function AuthLayout() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-slate-50 px-4 py-10 sm:px-6">
      <Link to="/" className="mb-8 rounded text-2xl font-bold tracking-tight text-indigo-700 focus-visible:outline-2 focus-visible:outline-offset-4">TaskFlow<span className="text-indigo-400">.</span></Link>
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
        <Outlet />
      </div>
      <p className="mt-6 text-center text-sm text-slate-500">A little structure. More room to achieve.</p>
    </main>
  )
}

