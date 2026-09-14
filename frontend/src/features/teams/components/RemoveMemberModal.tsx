import type { RefObject } from 'react'
import Button from '../../../components/ui/Button'
import TeamModal from './TeamModal'

export default function RemoveMemberModal({ name, onClose, onConfirm, fallbackFocusRef }: { name: string; onClose: () => void; onConfirm: () => void; fallbackFocusRef: RefObject<HTMLButtonElement | null> }) {
  return <TeamModal title="Remove member?" onClose={onClose} fallbackFocusRef={fallbackFocusRef}><p className="mb-6 wrap-anywhere text-slate-600">Remove {name} from this project?</p><div className="flex flex-col gap-3 sm:flex-row sm:justify-end"><Button onClick={onClose}>Cancel</Button><Button onClick={onConfirm}>Remove member</Button></div></TeamModal>
}

