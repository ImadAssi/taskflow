import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'
import Button from '../ui/Button'
import DashboardNav from './DashboardNav'

type MobileNavigationProps = {
  open: boolean
  onClose: () => void
  triggerRef: RefObject<HTMLButtonElement | null>
}

export default function MobileNavigation({ open, onClose, triggerRef }: MobileNavigationProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (!open) return
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = triggerRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 64rem)')
    const closeOnDesktop = () => { if (desktop.matches) onClose() }
    desktop.addEventListener('change', closeOnDesktop)
    closeOnDesktop()
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      document.body.style.overflow = previousOverflow
      dialog.close()
      if (trigger?.getClientRects().length) trigger.focus()
    }
  }, [open, onClose, triggerRef])

  return (
    <dialog ref={dialogRef} id="dashboard-mobile-navigation" aria-labelledby="dashboard-menu-title"
      onCancel={event => { event.preventDefault(); onClose() }}
      onClick={event => { if (event.target === event.currentTarget) onClose() }}
      className="fixed inset-y-0 left-0 m-0 h-dvh max-h-none w-80 max-w-[calc(100%-2rem)] border-0 bg-white p-0 text-slate-900 shadow-xl backdrop:bg-slate-950/40">
      <div className="min-h-full p-6">
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 id="dashboard-menu-title" className="text-xl font-bold tracking-tight text-indigo-700">TaskFlow.</h2>
          <Button onClick={onClose} aria-label="Close navigation">Close</Button>
        </div>
        <DashboardNav onNavigate={onClose} />
      </div>
    </dialog>
  )
}

