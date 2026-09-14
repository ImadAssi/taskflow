import type { AddMemberValues, MemberErrors, TeamState } from './types'
import { isAssignableRole } from './permissions'

export function validateMember(values: AddMemberValues, state: TeamState, projectId: string): MemberErrors {
  const errors: MemberErrors = {}
  if (!values.name.trim()) errors.name = 'Enter a name.'
  else if (values.name.trim().length > 80) errors.name = 'Use 80 characters or fewer.'
  const email = values.email.trim().toLowerCase()
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Enter a valid email address.'
  else {
    const user = state.users.find(person => person.email.trim().toLowerCase() === email)
    if (user && state.members.some(member => member.projectId === projectId && member.userId === user.id)) errors.email = 'This person is already a member.'
  }
  if (!isAssignableRole(values.role)) errors.role = 'Choose Manager or Member.'
  return errors
}

