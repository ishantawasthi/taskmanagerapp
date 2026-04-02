// Login.jsx — User login page
// Sends email + password → gets JWT token back → saves to localStorage

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'


const API = 'https://taskmanagerapp-hsm1.onrender.com'

function Login() {
  // ─── State ────────────────────────────────────────────────────────
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [error,    setError]    = useState('')
  const [loading,  setLoading]  = useState(false)

  const navigate = useNavigate()

  // ─── Handle Login Submit ───────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // POST /api/auth/login → returns { token, user }
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      })

      // Save token in localStorage
      // This token is sent with every future task request
      // It proves to the backend that user is logged in
      localStorage.setItem('token', res.data.token)

      // Save user info so we can show username in navbar
      localStorage.setItem('user', JSON.stringify(res.data.user))

      // Navigate to dashboard after successful login
      navigate('/dashboard')

    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    } finally {
      setLoading(false)
    }
  }

  // ─── JSX ──────────────────────────────────────────────────────────
  return (
    <div className="auth-page">

      {/* Left decorative panel */}
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-logo">Task<span>Flow</span></div>
          <p className="auth-tagline">
            Welcome back! Your tasks are waiting for you.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">🔒</div>
              <span>Secure JWT authentication</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">⚡</div>
              <span>Instant access to your tasks</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">🎯</div>
              <span>Pick up right where you left off</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <div className="auth-form-container">

          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your TaskFlow account</p>

          {/* Error message */}
          {error && (
            <div className="error-msg">
              <span>⚠</span> {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-input"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>

          </form>

          <div className="auth-link">
            Don't have an account?
            <Link to="/register">Sign up</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login
