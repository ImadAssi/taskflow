import TaskColumn from './TaskColumn'
import type { Task, TaskStatus } from '../types'

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'TODO', title: 'To do' },
  { status: 'IN_PROGRESS', title: 'In progress' },
  { status: 'DONE', title: 'Done' },
]

export default function TaskBoard({ tasks, assignees }: { tasks: Task[]; assignees: readonly { id: string; displayName: string }[] }) {
  return (
    <div className="grid items-start gap-5 xl:grid-cols-3">
      {columns.map(column => <TaskColumn key={column.status} {...column} tasks={tasks.filter(task => task.status === column.status)} assignees={assignees} />)}
    </div>
  )
}

