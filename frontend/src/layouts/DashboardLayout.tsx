import { useCallback, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import TopBar from '../components/layout/TopBar'
import MobileNavigation from '../components/layout/MobileNavigation'
import { dashboardNavigation } from '../components/layout/navigation'

export default function DashboardLayout() {
  const location = useLocation()
  const [menuLocation, setMenuLocation] = useState<typeof location | null>(null)
  const menuOpen = menuLocation === location
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const closeMenu = useCallback(() => setMenuLocation(null), [])
  const currentSection = dashboardNavigation.find(item =>
    item.end ? location.pathname === item.to : location.pathname === item.to || location.pathname.startsWith(item.to + '/'),
  )

  return (
    <div className="min-h-svh bg-slate-50">
      <a href="#dashboard-content" className="sr-only z-50 rounded-lg bg-indigo-700 px-4 py-3 font-semibold text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4">Skip to content</a>
      <div className="flex min-h-svh">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <TopBar title={currentSection?.label ?? 'Dashboard'} menuOpen={menuOpen}
            onOpenMenu={() => setMenuLocation(location)} menuButtonRef={menuButtonRef} />
          <main id="dashboard-content" tabIndex={-1} className="mx-auto w-full max-w-7xl px-4 py-8 focus-visible:outline-2 focus-visible:outline-indigo-600 sm:px-8">
            <Outlet />
          </main>
        </div>
      </div>
      <MobileNavigation open={menuOpen} onClose={closeMenu} triggerRef={menuButtonRef} />
    </div>
  )
}

