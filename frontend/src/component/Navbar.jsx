// Navbar.jsx — Top navigation bar shown on Dashboard
// Shows logo, username, and logout button

import { useNavigate } from 'react-router-dom'
import axios from 'axios'



const API = 'http://localhost:5000'

function Navbar() {
  const navigate  = useNavigate()

  // Get user info from localStorage that was saved during login
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  // Get first letter of username for avatar
  const initial = user.username ? user.username[0].toUpperCase() : 'U'

  // ─── Logout Handler ───────────────────────────────────────────────
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('token')

      // Optional — tell backend user is logging out
      await axios.post(`${API}/api/auth/logout`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
    } catch (err) {
      // Even if backend call fails, still logout on frontend
      console.error('Logout error:', err)
    } finally {
      // THIS is the real logout — delete token from browser
      localStorage.removeItem('token')
      localStorage.removeItem('user')

      // Redirect to login page
      navigate('/login')
    }
  }

  return (
    <nav className="navbar">

      {/* Logo */}
      <div className="navbar-logo">Task<span>Flow</span></div>

      {/* Right side — user info + logout */}
      <div className="navbar-right">

        {/* User avatar and name */}
        <div className="navbar-user">
          <div className="navbar-avatar">{initial}</div>
          <span>{user.username || 'User'}</span>
        </div>

        {/* Logout button */}
        <button className="btn-logout" onClick={handleLogout}>
          Sign out
        </button>

      </div>
    </nav>
  )
}

export default Navbar
