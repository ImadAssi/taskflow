import { useEffect, useId, useRef, useState } from 'react'
import type { RefObject, SubmitEvent } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { validateProject } from '../validation'
import type { ProjectErrors, ProjectValues } from '../types'

type CreateProjectModalProps = {
  onClose: () => void
  onCreate: (values: ProjectValues) => void
  fallbackFocusRef: RefObject<HTMLButtonElement | null>
}

export default function CreateProjectModal({ onClose, onCreate, fallbackFocusRef }: CreateProjectModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const titleRef = useRef<HTMLInputElement>(null)
  const descriptionId = useId()
  const [values, setValues] = useState<ProjectValues>({ title: '', description: '' })
  const [errors, setErrors] = useState<ProjectErrors>({})
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

  function update(field: keyof ProjectValues, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (submitted) setErrors(validateProject(next))
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateProject(values)
    setErrors(nextErrors)
    setSubmitted(true)
    if (nextErrors.title) titleRef.current?.focus()
    else if (nextErrors.description) event.currentTarget.querySelector<HTMLTextAreaElement>('textarea')?.focus()
    else onCreate(values)
  }

  return (
    <dialog ref={dialogRef} aria-labelledby="create-project-title"
      onCancel={event => { event.preventDefault(); onClose() }}
      className="fixed inset-0 m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 text-slate-900 shadow-xl backdrop:bg-slate-950/40 sm:p-8">
      <h2 id="create-project-title" className="text-2xl font-bold tracking-tight">Create project</h2>
      <p className="mt-2 text-sm text-slate-600">Give your project a title and a little context.</p>
      <form noValidate onSubmit={submit} className="mt-6 space-y-5">
        <Input ref={titleRef} label="Project title" name="title" required value={values.title}
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
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Create project</Button>
        </div>
      </form>
    </dialog>
  )
}
