import { useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import AddMemberModal from '../components/AddMemberModal'
import RemoveMemberModal from '../components/RemoveMemberModal'
import TeamMemberList from '../components/TeamMemberList'
import TeamsEmptyState from '../components/TeamsEmptyState'
import TeamsLoadingState from '../components/TeamsLoadingState'
import useTeamMembers from '../hooks/useTeamMembers'
import { canManageMember, isAssignableRole } from '../permissions'
import type { AddMemberValues, TeamMember } from '../types'

export default function TeamsPage() {
  const { state, members, isLoading, createMember, updateRole, remove } = useTeamMembers()
  const [adding, setAdding] = useState(false)
  const [removing, setRemoving] = useState<TeamMember | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const buttonRef = useRef<HTMLButtonElement>(null)
  const displayName = (member: TeamMember) => state.users.find(user => user.id === member.userId)?.name ?? 'Member'
  function add(values: AddMemberValues) {
    createMember(values)
    setAdding(false)
    setAnnouncement('Member added.')
  }
  function changeRole(id: string, role: string) {
    const member = members.find(item => item.id === id)
    if (!member || !canManageMember(member) || !isAssignableRole(role)) return
    updateRole(id, role)
    setAnnouncement(`${displayName(member)} is now a ${role.toLowerCase()}.`)
  }
  return (
    <section aria-labelledby="teams-title">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><h1 id="teams-title" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Team members</h1><p className="mt-2 text-sm text-slate-600">{isLoading ? 'Your project team' : `${members.length} ${members.length === 1 ? 'member' : 'members'} in your project`}</p></div><Button ref={buttonRef} disabled={isLoading} onClick={() => { setAnnouncement(''); setAdding(true) }}>Add member</Button></div>
      <p role="status" className={announcement ? 'mb-6 rounded-lg bg-indigo-50 p-3 text-sm wrap-anywhere text-indigo-900' : 'sr-only'}>{announcement}</p>
      {isLoading ? <TeamsLoadingState /> : <>{!members.some(member => member.role !== 'OWNER') && <TeamsEmptyState />}<TeamMemberList members={members} users={state.users} onRoleChange={changeRole} onRemove={member => { if (canManageMember(member)) setRemoving(member) }} /></>}
      {adding && <AddMemberModal state={state} onAdd={add} onClose={() => setAdding(false)} fallbackFocusRef={buttonRef} />}
      {removing && <RemoveMemberModal name={displayName(removing)} onClose={() => setRemoving(null)} fallbackFocusRef={buttonRef} onConfirm={() => { if (canManageMember(removing)) { remove(removing.id); setAnnouncement(`${displayName(removing)} removed.`) } setRemoving(null) }} />}
    </section>
  )
}

