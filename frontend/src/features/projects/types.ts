export type Project = {
  id: string
  title: string
  description: string
  createdAt: string
}

export type ProjectValues = Pick<Project, 'title' | 'description'>
export type ProjectErrors = Partial<Record<keyof ProjectValues, string>>

