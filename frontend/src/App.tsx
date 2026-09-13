import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import PlaceholderPage from './pages/PlaceholderPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage title="TaskFlow" />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route
        path="/dashboard"
        element={<PlaceholderPage title="Dashboard" />}
      />

      <Route
        path="*"
        element={<PlaceholderPage title="Page not found" />}
      />
    </Routes>
  )
}