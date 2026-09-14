import type { TeamMember } from './types'

export function isAssignableRole(role: string): role is 'MANAGER' | 'MEMBER' {
  return role === 'MANAGER' || role === 'MEMBER'
}
export function canManageMember(member: TeamMember): boolean {
  return member.role !== 'OWNER'
}

