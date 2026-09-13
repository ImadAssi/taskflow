import type { ComponentProps } from 'react'

export default function Button({ type = 'button', className = '', ...props }: ComponentProps<'button'>) {
  return <button type={type} className={`inline-flex min-h-11 items-center justify-center rounded-lg bg-indigo-700 px-4 py-2.5 font-semibold text-white transition-colors hover:bg-indigo-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 ${className}`} {...props} />
}

