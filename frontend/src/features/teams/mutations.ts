import type { AddMemberValues, TeamState } from './types'
import { canManageMember, isAssignableRole } from './permissions'
import { validateMember } from './validation'

export function addMember(state: TeamState, projectId: string, values: AddMemberValues, membershipId: string, userId: string, joinedAt: string): TeamState {
  if (Object.keys(validateMember(values, state, projectId)).length) return state
  const email = values.email.trim().toLowerCase()
  const existing = state.users.find(user => user.email.trim().toLowerCase() === email)
  const user = existing ?? { id: userId, name: values.name.trim(), email }
  return {
    users: existing ? state.users : [...state.users, user],
    members: [...state.members, { id: membershipId, projectId, userId: user.id, role: values.role, joinedAt }],
  }
}
export function updateMemberRole(state: TeamState, projectId: string, id: string, role: string): TeamState {
  const member = state.members.find(item => item.id === id && item.projectId === projectId)
  if (!member || !canManageMember(member) || !isAssignableRole(role)) return state
  return { ...state, members: state.members.map(item => item === member ? { ...item, role } : item) }
}
export function removeMember(state: TeamState, projectId: string, id: string): TeamState {
  const member = state.members.find(item => item.id === id && item.projectId === projectId)
  if (!member || !canManageMember(member)) return state
  return { ...state, members: state.members.filter(item => item !== member) }
}

