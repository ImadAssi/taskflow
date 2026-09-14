import { useState } from 'react'
import type { RefObject, SubmitEvent } from 'react'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import TeamModal from './TeamModal'
import { validateMember } from '../validation'
import { mockProjectId } from '../data/mockTeam'
import type { AddMemberValues, MemberErrors, TeamState } from '../types'

export default function AddMemberModal({ state, onAdd, onClose, fallbackFocusRef }: { state: TeamState; onAdd: (values: AddMemberValues) => void; onClose: () => void; fallbackFocusRef: RefObject<HTMLButtonElement | null> }) {
  const [values, setValues] = useState<AddMemberValues>({ name: '', email: '', role: 'MEMBER' })
  const [errors, setErrors] = useState<MemberErrors>({})
  const [submitted, setSubmitted] = useState(false)
  function update(next: AddMemberValues) {
    setValues(next)
    if (submitted) setErrors(validateMember(next, state, mockProjectId))
  }
  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = validateMember(values, state, mockProjectId)
    setErrors(next)
    setSubmitted(true)
    const field = Object.keys(next)[0]
    if (field) event.currentTarget.querySelector<HTMLElement>('[name=' + field + ']')?.focus()
    else onAdd(values)
  }
  return (
    <TeamModal title="Add member" onClose={onClose} fallbackFocusRef={fallbackFocusRef}>
      <form noValidate onSubmit={submit} className="space-y-5">
        <Input label="Name" name="name" required autoComplete="name" value={values.name} error={errors.name} onChange={event => update({ ...values, name: event.target.value })} />
        <Input label="Email" name="email" type="email" required autoComplete="email" value={values.email} error={errors.email} onChange={event => update({ ...values, email: event.target.value })} />
        <div>
          <label htmlFor="new-member-role" className="mb-2 block text-sm font-medium">Role</label>
          <select id="new-member-role" name="role" value={values.role} aria-invalid={errors.role ? true : undefined} aria-describedby={errors.role ? 'member-role-error' : undefined} onChange={event => update({ ...values, role: event.target.value as AddMemberValues['role'] })} className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 focus:outline-2 focus:outline-indigo-600"><option value="MEMBER">Member</option><option value="MANAGER">Manager</option></select>
          {errors.role && <p id="member-role-error" className="mt-2 text-sm text-red-700">{errors.role}</p>}
        </div>
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end"><Button onClick={onClose}>Cancel</Button><Button type="submit">Add member</Button></div>
      </form>
    </TeamModal>
  )
}

