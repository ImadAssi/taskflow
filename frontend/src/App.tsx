import { Route, Routes } from 'react-router-dom'
import AuthLayout from './layouts/AuthLayout'
import DashboardLayout from './layouts/DashboardLayout'
import DashboardPlaceholderPage from './pages/DashboardPlaceholderPage'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import PlaceholderPage from './pages/PlaceholderPage'
import ProjectsPage from './features/projects/pages/ProjectsPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage title="TaskFlow" />} />

      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<DashboardPlaceholderPage title="Overview" />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="tasks" element={<DashboardPlaceholderPage title="Tasks" />} />
        <Route path="teams" element={<DashboardPlaceholderPage title="Teams" />} />
        <Route path="*" element={<DashboardPlaceholderPage title="Page not found" notFound />} />
      </Route>

      <Route
        path="*"
        element={<PlaceholderPage title="Page not found" />}
      />
    </Routes>
  )
}
