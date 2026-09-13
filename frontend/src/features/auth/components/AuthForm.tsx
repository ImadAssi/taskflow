import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Link } from 'react-router-dom'
import Button from '../../../components/ui/Button'
import Input from '../../../components/ui/Input'
import { validateAuth } from '../validation'
import type { AuthErrors, AuthMode, AuthValues } from '../validation'

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const register = mode === 'register'
  const [values, setValues] = useState<AuthValues>({ name: '', email: '', password: '', confirmPassword: '' })
  const [errors, setErrors] = useState<AuthErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [valid, setValid] = useState(false)

  function update(field: keyof AuthValues, value: string) {
    const next = { ...values, [field]: value }
    setValues(next)
    setValid(false)
    if (submitted) setErrors(validateAuth(next, mode))
  }

  function submit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const nextErrors = validateAuth(values, mode)
    setErrors(nextErrors)
    setSubmitted(true)
    setValid(Object.keys(nextErrors).length === 0)
    const firstError = Object.keys(nextErrors)[0]
    if (firstError) event.currentTarget.querySelector<HTMLInputElement>(`[name="${firstError}"]`)?.focus()
  }

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-slate-950">{register ? 'Create your account' : 'Welcome back'}</h1>
      <p className="mt-2 text-sm leading-6 text-slate-600">{register ? 'Make space for your next great project.' : 'Sign in to your TaskFlow workspace.'}</p>
      <form noValidate onSubmit={submit} className="mt-7 space-y-5">
        {register && <Input label="Name" name="name" autoComplete="name" required value={values.name} error={errors.name} onChange={e => update('name', e.target.value)} />}
        <Input label="Email" name="email" type="email" autoComplete="email" autoCapitalize="none" spellCheck={false} required value={values.email} error={errors.email} onChange={e => update('email', e.target.value)} />
        <Input label="Password" name="password" type="password" autoComplete={register ? 'new-password' : 'current-password'} required hint={register ? 'Use at least 8 characters.' : undefined} value={values.password} error={errors.password} onChange={e => update('password', e.target.value)} />
        {register && <Input label="Confirm password" name="confirmPassword" type="password" autoComplete="new-password" required value={values.confirmPassword} error={errors.confirmPassword} onChange={e => update('confirmPassword', e.target.value)} />}
        <Button type="submit" className="w-full">{register ? 'Create account' : 'Sign in'}</Button>
        <div aria-live="polite" aria-atomic="true">
          {valid && <p className="rounded-lg bg-indigo-50 p-3 text-sm text-indigo-900">Your details passed validation. {register ? 'Account creation' : 'Sign-in'} is not connected yet.</p>}
        </div>
      </form>
      <p className="mt-6 text-center text-sm text-slate-600">
        {register ? 'Already have an account? ' : 'New to TaskFlow? '}
        <Link className="rounded font-semibold text-indigo-700 underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2" to={register ? '/login' : '/register'}>{register ? 'Sign in' : 'Create an account'}</Link>
      </p>
    </>
  )
}

