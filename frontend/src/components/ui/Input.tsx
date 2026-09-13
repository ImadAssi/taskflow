import { useId, useState } from 'react'
import type { ComponentProps } from 'react'

type InputProps = ComponentProps<'input'> & { label: string; error?: string; hint?: string }

export default function Input({ label, error, hint, id, type = 'text', className = '', 'aria-describedby': describedBy, ...props }: InputProps) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const [visible, setVisible] = useState(false)
  const password = type === 'password'
  const description = [describedBy, hint && `${inputId}-hint`, error && `${inputId}-error`].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-medium text-slate-800">{label}</label>
      <div className="relative">
        <input {...props} id={inputId} type={password && visible ? 'text' : type}
          aria-invalid={error ? true : props['aria-invalid']} aria-describedby={description}
          className={`min-h-11 w-full rounded-lg border bg-white px-3 py-2.5 text-base text-slate-950 outline-none focus:ring-2 focus:ring-indigo-600 disabled:bg-slate-100 ${error ? 'border-red-600' : 'border-slate-300'} ${password ? 'pr-20' : ''} ${className}`} />
        {password && <button type="button" disabled={props.disabled} aria-controls={inputId}
          aria-label={`${visible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
          onClick={() => setVisible(!visible)}
          className="absolute inset-y-0 right-1 min-w-16 rounded-md px-2 text-sm font-semibold text-indigo-700 focus-visible:outline-2 focus-visible:outline-indigo-600">
          {visible ? 'Hide' : 'Show'}
        </button>}
      </div>
      {hint && <p id={`${inputId}-hint`} className="mt-2 text-sm text-slate-500">{hint}</p>}
      {error && <p id={`${inputId}-error`} className="mt-2 text-sm text-red-700">{error}</p>}
    </div>
  )
}

