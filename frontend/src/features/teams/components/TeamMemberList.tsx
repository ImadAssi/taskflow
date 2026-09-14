import TeamMemberRow from './TeamMemberRow'
import type { TeamMember, TeamUser } from '../types'

export default function TeamMemberList({ members, users, onRoleChange, onRemove }: { members: TeamMember[]; users: TeamUser[]; onRoleChange: (id: string, role: string) => void; onRemove: (member: TeamMember) => void }) {
  return <ul className="space-y-3">{members.map(member => <TeamMemberRow key={member.id} member={member} user={users.find(user => user.id === member.userId)} onRoleChange={role => onRoleChange(member.id, role)} onRemove={() => onRemove(member)} />)}</ul>
}

