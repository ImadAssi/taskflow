import { useEffect, useId, useRef, useState } from 'react'
import type { RefObject, SubmitEvent } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { validateTask } from '../validation'
import { mockAssignees } from '../data/mockTasks'
import type { TaskErrors, TaskValues } from '../types'

type CreateTaskModalProps = {
  onClose: () => void
  onCreate: (values: TaskValues) => void
  fallbackFocusRef: RefObject<HTMLButtonElement | null>
}

export default function CreateTaskModal({ onClose, onCreate, fallbackFocusRef }: CreateTaskModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionId = useId()
  const [values, setValues] = useState<TaskValues>({ title: '', description: '', priority: 'MEDIUM', dueDate: null, assigneeId: null })
  const [errors, setErrors] = useState<TaskErrors>({})
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const trigger = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const previousOverflow = document.body.style.overflow
    const fallback = fallbackFocusRef.current
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    titleRef.current?.focus()
    return () => {
      document.body.style.overflow = previousOverflow
      dialog.close()
      queueMicrotask(() => {
        if (trigger?.isConnected) trigger.focus()
        else if (fallback?.isConnected) fallback.focus()
      })
    }
  }, [fallbackFocusRef])

  function update(field: keyof TaskValues, value: TaskValues[keyof TaskValues]) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (submitted) setErrors(validateTask(next, mockAssignees.map(person => person.id)))
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateTask(values, mockAssignees.map(person => person.id))
    setErrors(nextErrors)
    setSubmitted(true)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) event.currentTarget.querySelector<HTMLElement>(' [name=' + firstError + ']')?.focus()
    else onCreate(values)
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="create-task-title"
      onCancel={event => { event.preventDefault(); onClose() }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-950/40 sm:p-8">
      <h2 id="create-task-title" className="text-2xl font-bold tracking-tight">Create task</h2>
      <p className="mt-2 text-sm text-slate-600">Give your task a title and a little context.</p>
      <form noValidate onSubmit={submit} className="mt-6 space-y-5">
        <Input ref={titleRef} label="Task title" name="title" required value={values.title}
          hint="Up to 80 characters." error={errors.title} onChange={event => update('title', event.target.value)} />
        <div>
          <label htmlFor={descriptionId} className="mb-2 block text-sm font-medium text-slate-800">Description <span className="font-normal text-slate-500">(optional)</span></label>
          <textarea id={descriptionId} name="description" rows={4} value={values.description}
            aria-invalid={errors.description ? true : undefined}
            aria-describedby={`${descriptionId}-hint${errors.description ? ` ${descriptionId}-error` : ''}`}
            onChange={event => update('description', event.target.value)}
            className={`w-full resize-y rounded-lg border bg-white px-3 py-2.5 text-base outline-none focus:ring-2 focus:ring-indigo-600 ${errors.description ? 'border-red-600' : 'border-slate-300'}`} />
          <p id={`${descriptionId}-hint`} className="mt-2 text-sm text-slate-500">Up to 500 characters.</p>
          {errors.description && <p id={`${descriptionId}-error`} className="mt-2 text-sm text-red-700">{errors.description}</p>}
        </div>
        <div>
          <label htmlFor="task-priority" className="mb-2 block text-sm font-medium text-slate-800">Priority</label>
          <select id="task-priority" name="priority" value={values.priority} onChange={event => update('priority', event.target.value as TaskValues['priority'])}
            aria-invalid={errors.priority ? true : undefined} aria-describedby={errors.priority ? 'priority-error' : undefined}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus:outline-2 focus:outline-indigo-600">
            {(['LOW', 'MEDIUM', 'HIGH', 'URGENT'] as const).map(priority => <option key={priority} value={priority}>{priority}</option>)}
          </select>
          {errors.priority && <p id="priority-error" className="mt-2 text-sm text-red-700">{errors.priority}</p>}
        </div>
        <Input label="Due date (optional)" name="dueDate" type="date" value={values.dueDate ?? ''}
          error={errors.dueDate} onChange={event => update('dueDate', event.target.value || null)} />
        <div>
          <label htmlFor="task-assignee" className="mb-2 block text-sm font-medium text-slate-800">Assignee (optional)</label>
          <select id="task-assignee" name="assigneeId" value={values.assigneeId ?? ''} onChange={event => update('assigneeId', event.target.value || null)}
            aria-invalid={errors.assigneeId ? true : undefined} aria-describedby={errors.assigneeId ? 'assignee-error' : undefined}
            className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 focus:outline-2 focus:outline-indigo-600">
            <option value="">Unassigned</option>
            {mockAssignees.map(person => <option key={person.id} value={person.id}>{person.displayName}</option>)}
          </select>
          {errors.assigneeId && <p id="assignee-error" className="mt-2 text-sm text-red-700">{errors.assigneeId}</p>}
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create task</Button>
        </div>
      </form>
    </dialog>
  )
}

