// Register.jsx — New user registration page
// Collects username, email, password → sends to POST /api/auth/register

import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios';

// Base URL of your backend — change this if your port is different
const API = 'http://localhost:5000'

function Register() {
  // ─── State ────────────────────────────────────────────────────────
  // Each input field has its own state variable
  const [username, setUsername] = useState('')
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')

  // UI state — show errors or loading spinner
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  // useNavigate — programmatic navigation (go to another page in code)
  const navigate = useNavigate()

  // ─── Handle Form Submit ────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()    // prevent browser from reloading page
      console.log("🔥 BUTTON CLICKED"); // ADD THIS
    setError('')          // clear any old error before new attempt
    setLoading(true)      // show loading state on button

    try {
      // Send POST request to backend register route
      // Body contains username, email, password
        console.log("👉 About to call API"); // ADD THIS
      await axios.post(`${API}/api/auth/register`, {
        username,
        email,
        password
      })

console.log("🔥 AFTER AXIOS"); // ADD THIS

      // If register successful → go to login page
      // User must login after registering to get their token
      navigate('/login')

    } catch (err) {
      // err.response.data.message = error message from backend
      // fallback message if backend sends no message
      setError(err.response?.data?.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)   // always stop loading — success or fail
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
            Organize your work. Track your progress. Achieve your goals.
          </p>

          <div className="auth-features">
            <div className="auth-feature">
              <div className="auth-feature-icon">✦</div>
              <span>Create and organize tasks instantly</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">⟳</div>
              <span>Track progress with status updates</span>
            </div>
            <div className="auth-feature">
              <div className="auth-feature-icon">◈</div>
              <span>Your data stays private and secure</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="auth-right">
        <div className="auth-form-container">

          <h1 className="auth-title">Create account</h1>
          <p className="auth-subtitle">Join TaskFlow and start organizing today</p>

          {/* Error message — only shows if error state is not empty */}
          {error && (
            <div className="error-msg">
              <span>⚠</span> {error}
            </div>
          )}

          {/* Form — onSubmit calls handleSubmit */}
          <form onSubmit={handleSubmit}>

            {/* Username field */}
            <div className="form-group">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-input"
                placeholder="Enter your username"
                value={username}
                // onChange fires on every keystroke → updates state
                onChange={e => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email field */}
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

            {/* Password field */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-input"
                placeholder="Create a password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Submit button — disabled while loading */}
            <button
              type="submit"
              className="btn-primary"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>

          </form>

          {/* Link to login page */}
          <div className="auth-link">
            Already have an account?
            <Link to="/login">Sign in</Link>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Register
