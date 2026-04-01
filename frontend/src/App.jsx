// App.jsx — Root component that sets up all page routes
// React Router controls which page shows based on the URL

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'

function App() {
  // Check if user is already logged in
  // localStorage stores the JWT token after login
  const token = localStorage.getItem('token')

  return (
    // BrowserRouter — enables client-side routing (no page reload on navigation)
    <BrowserRouter>
      <Routes>
        {/* / → redirect to login if not logged in, dashboard if logged in */}
        <Route path='/' element={<Navigate to={token ? '/dashboard' : '/login'} />} />

        {/* Public routes — anyone can access */}
        <Route path='/login'    element={<Login />} />
        <Route path='/register' element={<Register />} />

        {/* Protected route — only logged in users can access */}
        {/* If no token → redirect to login */}
         <Route path="/dashboard" element={<Dashboard />} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
