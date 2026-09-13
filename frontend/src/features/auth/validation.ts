export type AuthMode = 'login' | 'register'
export type AuthValues = { name: string; email: string; password: string; confirmPassword: string }
export type AuthErrors = Partial<Record<keyof AuthValues, string>>

export function validateAuth(values: AuthValues, mode: AuthMode): AuthErrors {
  const errors: AuthErrors = {}
  if (mode === 'register' && !values.name.trim()) errors.name = 'Enter your name.'
  if (!values.email.trim()) errors.email = 'Enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.'
  if (!values.password) errors.password = 'Enter your password.'
  else if (mode === 'register' && values.password.length < 8) errors.password = 'Use at least 8 characters.'
  if (mode === 'register') {
    if (!values.confirmPassword) errors.confirmPassword = 'Confirm your password.'
    else if (values.confirmPassword !== values.password) errors.confirmPassword = 'Passwords do not match.'
  }
  return errors
}

