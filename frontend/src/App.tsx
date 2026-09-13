import { Route, Routes } from 'react-router-dom'
import PlaceholderPage from './pages/PlaceholderPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<PlaceholderPage title="Home" />} />
      <Route path="/login" element={<PlaceholderPage title="Login" />} />
      <Route path="/register" element={<PlaceholderPage title="Register" />} />
      <Route path="/dashboard" element={<PlaceholderPage title="Dashboard" />} />
      <Route path="*" element={<PlaceholderPage title="Page not found" />} />
    </Routes>
  )
}

export default App
