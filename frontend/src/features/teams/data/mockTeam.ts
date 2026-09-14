import type { TeamState } from '../types'

export const mockProjectId = 'project-1'
export const mockTeam: TeamState = {
  users: [
    { id: 'user-1', name: 'Alex Morgan', email: 'alex@example.com' },
    { id: 'user-2', name: 'Sam Rivera', email: 'sam@example.com' },
    { id: 'user-3', name: 'Jordan Lee', email: 'jordan@example.com' },
  ],
  members: [
    { id: 'membership-1', projectId: mockProjectId, userId: 'user-1', role: 'OWNER', joinedAt: '2026-09-01T09:00:00.000Z' },
    { id: 'membership-2', projectId: mockProjectId, userId: 'user-2', role: 'MANAGER', joinedAt: '2026-09-05T09:00:00.000Z' },
    { id: 'membership-3', projectId: mockProjectId, userId: 'user-3', role: 'MEMBER', joinedAt: '2026-09-10T09:00:00.000Z' },
  ],
}
export const emptyTeam: TeamState = { members: [], users: mockTeam.users }

