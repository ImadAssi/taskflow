import { mockProjects } from '../../projects/data/mockProjects'
import { mockTasks } from '../../tasks/data/mockTasks'
import { mockProjectId, mockTeam } from '../../teams/data/mockTeam'
import SummaryCard from '../components/SummaryCard'
import RecentProjects from '../components/RecentProjects'
import TaskProgress from '../components/TaskProgress'
import TaskDeadlineList from '../components/TaskDeadlineList'
import TeamSummary from '../components/TeamSummary'
import { localCalendarDate, selectOverview } from '../selectors'

export default function OverviewPage() {
  const today = localCalendarDate(new Date())
  const overview = selectOverview(mockProjects, mockTasks, mockTeam.members, mockTeam.users, today)
  return (
    <section aria-labelledby="overview-title">
      <h1 id="overview-title" className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">Overview</h1>
      <p className="mt-2 text-sm text-slate-600">A read-only snapshot of mock data. Changes made on other pages are not reflected here.</p>
      <div className="my-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard label="Projects" value={overview.projectCount} to="/dashboard/projects" />
        <SummaryCard label="Tasks" value={overview.taskCount} to="/dashboard/tasks" />
        <SummaryCard label="Completed tasks" value={overview.completedCount} to="/dashboard/tasks" />
        <SummaryCard label="Unique team members" value={overview.memberCount} to="/dashboard/teams" />
      </div>
      <div className="grid items-start gap-6 xl:grid-cols-2">
        <RecentProjects projects={overview.recentProjects} />
        <TaskProgress counts={overview.statusCounts} rate={overview.completionRate} total={overview.taskCount} />
        <TaskDeadlineList title="Overdue tasks" description={`Incomplete tasks due before ${today}.`} tasks={overview.overdueTasks} projectTitles={overview.projectTitles} emptyMessage="No overdue tasks." />
        <TaskDeadlineList title="Upcoming tasks" description={`Due ${today} through ${overview.upcomingEndDate}, inclusive.`} tasks={overview.upcomingTasks} projectTitles={overview.projectTitles} emptyMessage="No tasks due in the next seven days, including today." />
        <div className="xl:col-span-2"><TeamSummary count={overview.memberCount} roles={overview.roleCounts} people={overview.teamPreview} projectTitle={overview.projectTitles[mockProjectId] ?? mockProjectId} /></div>
      </div>
    </section>
  )
}

