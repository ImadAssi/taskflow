import type { ProjectErrors, ProjectValues } from './types'

export function validateProject(values: ProjectValues): ProjectErrors {
  const errors: ProjectErrors = {}
  if (!values.title.trim()) errors.title = 'Enter a project title.'
  else if (values.title.trim().length > 80) errors.title = 'Use 80 characters or fewer.'
  if (values.description.length > 500) errors.description = 'Use 500 characters or fewer.'
  return errors
}

