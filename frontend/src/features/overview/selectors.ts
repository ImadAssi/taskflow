import type { Project } from '../projects/types'
import type { Task, TaskStatus } from '../tasks/types'
import type { TeamMember, TeamRole, TeamUser } from '../teams/types'

export function localCalendarDate(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
}

export function addCalendarDays(referenceDate: string, days: number): string {
  // UTC is only used for calendar arithmetic; comparisons remain date-only.
  const date = new Date(referenceDate + 'T00:00:00.000Z')
  date.setUTCDate(date.getUTCDate() + days)
  return date.toISOString().slice(0, 10)
}

export function selectOverview(projects: readonly Project[], tasks: readonly Task[], members: readonly TeamMember[], users: readonly TeamUser[], referenceDate: string) {
  const statusCounts: Record<TaskStatus, number> = { TODO: 0, IN_PROGRESS: 0, DONE: 0 }
  for (const task of tasks) statusCounts[task.status]++
  const roleCounts: Record<TeamRole, number> = { OWNER: 0, MANAGER: 0, MEMBER: 0 }
  for (const member of members) roleCounts[member.role]++
  const userIds = [...new Set(members.map(member => member.userId))]
  const endDate = addCalendarDays(referenceDate, 7)
  const datedTasks = tasks.filter(task => task.status !== 'DONE' && task.dueDate !== null)
  const byDeadline = (a: Task, b: Task) => (a.dueDate ?? '').localeCompare(b.dueDate ?? '') || a.id.localeCompare(b.id)
  return {
    projectCount: projects.length,
    taskCount: tasks.length,
    completedCount: statusCounts.DONE,
    memberCount: userIds.length,
    completionRate: tasks.length === 0 ? 0 : Math.round(statusCounts.DONE / tasks.length * 100),
    statusCounts,
    roleCounts,
    recentProjects: [...projects].sort((a, b) => b.createdAt.localeCompare(a.createdAt) || a.id.localeCompare(b.id)).slice(0, 3),
    overdueTasks: datedTasks.filter(task => task.dueDate! < referenceDate).sort(byDeadline),
    upcomingTasks: datedTasks.filter(task => task.dueDate! >= referenceDate && task.dueDate! <= endDate).sort(byDeadline),
    teamPreview: userIds.slice(0, 5).map(id => ({ userId: id, user: users.find(user => user.id === id) })),
    projectTitles: Object.fromEntries(projects.map(project => [project.id, project.title])),
    upcomingEndDate: endDate,
  }
}

