import { useEffect, useState } from 'react'
import { mockProjectId, mockTeam } from '../data/mockTeam'
import { addMember, removeMember, updateMemberRole } from '../mutations'
import type { AddMemberValues, TeamState } from '../types'

export default function useTeamMembers(initialState: TeamState = mockTeam) {
  const [state, setState] = useState<TeamState>(() => ({
    members: initialState.members.map(member => ({ ...member })),
    users: initialState.users.map(user => ({ ...user })),
  }))
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 500)
    return () => window.clearTimeout(timer)
  }, [])
  function createMember(values: AddMemberValues) {
    const membershipId = crypto.randomUUID()
    const userId = crypto.randomUUID()
    const joinedAt = new Date().toISOString()
    setState(current => addMember(current, mockProjectId, values, membershipId, userId, joinedAt))
  }
  return {
    state,
    members: state.members.filter(member => member.projectId === mockProjectId),
    isLoading,
    createMember,
    updateRole: (id: string, role: string) => setState(current => updateMemberRole(current, mockProjectId, id, role)),
    remove: (id: string) => setState(current => removeMember(current, mockProjectId, id)),
  }
}

