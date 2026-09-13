import type { Ref } from 'react'
import Button from '../ui/Button'

type TopBarProps = {
  title: string
  menuOpen: boolean
  onOpenMenu: () => void
  menuButtonRef: Ref<HTMLButtonElement>
}

export default function TopBar({ title, menuOpen, onOpenMenu, menuButtonRef }: TopBarProps) {
  return (
    <header className="flex min-h-20 items-center gap-4 border-b border-slate-200 bg-white px-4 sm:px-8">
      <Button ref={menuButtonRef} onClick={onOpenMenu} aria-expanded={menuOpen}
        aria-controls="dashboard-mobile-navigation" aria-haspopup="dialog" className="lg:hidden">
        Menu
      </Button>
      <p className="truncate text-sm font-semibold text-slate-700">{title}</p>
    </header>
  )
}

