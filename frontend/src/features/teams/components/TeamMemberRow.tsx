import Button from '../../../components/ui/Button'
import { canManageMember } from '../permissions'
import type { TeamMember, TeamUser } from '../types'

export default function TeamMemberRow({ member, user, onRoleChange, onRemove }: { member: TeamMember; user?: TeamUser; onRoleChange: (role: string) => void; onRemove: () => void }) {
  const name = user?.name ?? 'Unknown user'
  return (
    <li className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0"><h2 className="font-semibold wrap-anywhere text-slate-950">{name}</h2><p className="mt-1 text-sm wrap-anywhere text-slate-600">{user?.email ?? 'Email unavailable'}</p></div>
      {canManageMember(member) ? <div className="flex flex-wrap items-center gap-3">
        <label className="text-sm text-slate-600">Role<span className="sr-only"> for {name}</span>
          <select value={member.role} onChange={event => onRoleChange(event.target.value)} className="ml-2 min-h-11 rounded-lg border border-slate-300 bg-white px-3 text-slate-900 focus:outline-2 focus:outline-indigo-600"><option value="MEMBER">Member</option><option value="MANAGER">Manager</option></select>
        </label>
        <Button onClick={onRemove} aria-label={`Remove ${name}`}>Remove</Button>
      </div> : <div className="shrink-0 text-sm"><span className="rounded-md bg-indigo-50 px-2 py-1 font-semibold text-indigo-700">Owner</span><p className="mt-2 text-xs text-slate-500">Owner cannot be changed or removed.</p></div>}
    </li>
  )
}

