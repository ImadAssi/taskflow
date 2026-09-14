export type TeamRole = 'OWNER' | 'MANAGER' | 'MEMBER'
export type TeamMember = { id: string; projectId: string; userId: string; role: TeamRole; joinedAt: string }
export type TeamUser = { id: string; name: string; email: string }
export type AddMemberValues = { name: string; email: string; role: 'MANAGER' | 'MEMBER' }
export type MemberErrors = Partial<Record<keyof AddMemberValues, string>>
export type TeamState = { members: TeamMember[]; users: TeamUser[] }

