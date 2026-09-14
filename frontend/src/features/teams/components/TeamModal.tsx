import { useEffect, useId, useRef } from 'react'
import type { ReactNode, RefObject } from 'react'

export default function TeamModal({ title, children, onClose, fallbackFocusRef }: { title: string; children: ReactNode; onClose: () => void; fallbackFocusRef: RefObject<HTMLButtonElement | null> }) {
  const ref = useRef<HTMLDialogElement>(null)
  const headingId = useId()
  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const fallback = fallbackFocusRef.current
    const overflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    dialog.querySelector<HTMLElement>('input, button')?.focus()
    return () => {
      dialog.close()
      document.body.style.overflow = overflow
      queueMicrotask(() => {
        if (trigger?.isConnected) trigger.focus()
        else if (fallback?.isConnected) fallback.focus()
      })
    }
  }, [fallbackFocusRef])
  return <dialog ref={ref} aria-labelledby={headingId} onCancel={event => { event.preventDefault(); onClose() }} className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-950/40 sm:p-8"><h2 id={headingId} className="mb-6 text-2xl font-bold tracking-tight">{title}</h2>{children}</dialog>
}

