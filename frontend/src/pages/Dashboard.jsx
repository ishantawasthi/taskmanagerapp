

// Dashboard.jsx — Main page after login
// Shows all tasks, handles create, toggle status, delete
// This is where all the CRUD operations happen

import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from '../component/Navbar'
import TaskForm from '../component/TaskForm'
import TaskCard from '../component/TaskCard'

const API = 'http://localhost:5000'

function Dashboard() {
  // ─── State ────────────────────────────────────────────────────────
  const [tasks,   setTasks]   = useState([])    // all tasks from DB
  const [loading, setLoading] = useState(true)  // initial fetch loading
  const [adding,  setAdding]  = useState(false) // adding task loading
  const [error,   setError]   = useState('')    // error message
  const [filter,  setFilter]  = useState('all') // all | pending | completed

  // Get token from localStorage — sent with every request
  const token = localStorage.getItem('token')
 console.log("TOKEN IN DASHBOARD:", token); 
  // axios config — adds Authorization header to every request
  // authMiddleware on backend reads this header to verify user
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  }

  // ─── Fetch All Tasks ───────────────────────────────────────────────
  // useEffect with [] runs ONCE when Dashboard first loads
  // This is where we load tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        // GET /api/tasks → returns array of tasks for logged in user
        const res = await axios.get(`${API}/api/tasks`, config)
        setTasks(res.data)  // save tasks in state → React renders them
      } catch (err) {
        setError('Failed to load tasks. Please refresh.')
      } finally {
        setLoading(false)   // stop loading spinner
      }
    }

    fetchTasks()
  }, []) // [] = run once on mount

  // ─── Add New Task ──────────────────────────────────────────────────
  // Called by TaskForm when user submits the form
  const handleAddTask = async ({ title, description }) => {
    setAdding(true)
    setError('')

    try {
      // POST /api/tasks → creates task in MongoDB → returns new task
      const res = await axios.post(
        `${API}/api/tasks`,
        { title, description },
        config
      )

      // Add new task to existing tasks list
      // [...tasks, res.data] = spread old tasks + add new one at end
      setTasks([...tasks, res.data])

    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add task.')
    } finally {
      setAdding(false)
    }
  }

  // ─── Toggle Task Status ────────────────────────────────────────────
  // Flips status: pending → completed OR completed → pending
  const handleToggle = async (task) => {
    // Calculate the new status before sending to backend
    const newStatus = task.status === 'pending' ? 'completed' : 'pending'

    try {
      // PUT /api/tasks/:id → updates task in MongoDB → returns updated task
      const res = await axios.put(
        `${API}/api/tasks/${task._id}`,
        { status: newStatus },
        config
      )

      // Replace old task with updated task in state
      // map goes through each task:
      //   if this is the updated task → use res.data (updated)
      //   otherwise → keep original task unchanged
      setTasks(tasks.map(t => t._id === task._id ? res.data : t))

    } catch (err) {
      setError('Failed to update task.')
    }
  }

  // ─── Delete Task ───────────────────────────────────────────────────
  const handleDelete = async (taskId) => {
    try {
      // DELETE /api/tasks/:id → removes task from MongoDB
      await axios.delete(`${API}/api/tasks/${taskId}`, config)

      // Remove deleted task from state
      // filter keeps all tasks EXCEPT the deleted one
      setTasks(tasks.filter(t => t._id !== taskId))

    } catch (err) {
      setError('Failed to delete task.')
    }
  }

  // ─── Filter Tasks for Display ──────────────────────────────────────
  // filteredTasks changes based on which tab user clicked
  const filteredTasks = tasks.filter(task => {
    if (filter === 'all')       return true               // show all
    if (filter === 'pending')   return task.status === 'pending'
    if (filter === 'completed') return task.status === 'completed'
    return true
  })

  // ─── Stats ────────────────────────────────────────────────────────
  const totalTasks     = tasks.length
  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const pendingTasks   = tasks.filter(t => t.status === 'pending').length

  // ─── JSX ──────────────────────────────────────────────────────────
  return (
    <div className="dashboard">

      {/* Navbar — shows logo, username, logout */}
      <Navbar />

      <div className="dashboard-body">

        {/* ── Stats Row ── */}
        <div className="stats-row">

          <div className="stat-card">
            <div className="stat-label">Total Tasks</div>
            <div className="stat-value purple">{totalTasks}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Completed</div>
            <div className="stat-value green">{completedTasks}</div>
          </div>

          <div className="stat-card">
            <div className="stat-label">Pending</div>
            <div className="stat-value pink">{pendingTasks}</div>
          </div>

        </div>

        {/* ── Error Message ── */}
        {error && (
          <div className="error-msg" style={{ marginBottom: '24px' }}>
            <span>⚠</span> {error}
          </div>
        )}

        {/* ── Task Form ── */}
        {/* Pass handleAddTask as onAdd prop to TaskForm */}
        <TaskForm onAdd={handleAddTask} loading={adding} />

        {/* ── Task List ── */}
        <div>

          {/* Header with filter tabs */}
          <div className="tasks-header">
            <div className="tasks-title">Your Tasks</div>

            {/* Filter tabs — click to filter tasks */}
            <div className="filter-tabs">
              {['all', 'pending', 'completed'].map(f => (
                <button
                  key={f}
                  className={`filter-tab ${filter === f ? 'active' : ''}`}
                  onClick={() => setFilter(f)}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                  {/* Show count on each tab */}
                  {f === 'all'       && ` (${totalTasks})`}
                  {f === 'pending'   && ` (${pendingTasks})`}
                  {f === 'completed' && ` (${completedTasks})`}
                </button>
              ))}
            </div>
          </div>

          {/* Loading state — shown while fetching tasks */}
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <span>Loading your tasks...</span>
            </div>

          ) : filteredTasks.length === 0 ? (
            // Empty state — no tasks to show
            <div className="empty-state">
              <div className="empty-icon">
                {filter === 'completed' ? '🎉' : '📋'}
              </div>
              <div className="empty-text">
                {filter === 'all'       && 'No tasks yet. Add your first task above!'}
                {filter === 'pending'   && 'No pending tasks. Great work!'}
                {filter === 'completed' && 'No completed tasks yet. Keep going!'}
              </div>
              <div className="empty-subtext">
                {filter === 'all' && 'Your tasks will appear here once you add them.'}
              </div>
            </div>

          ) : (
            // Task list — map over filteredTasks and render TaskCard
            <div className="tasks-list">
              {filteredTasks.map(task => (
                <TaskCard
                  key={task._id}          // React needs unique key for lists
                  task={task}             // pass full task object
                  onToggle={handleToggle} // pass toggle function
                  onDelete={handleDelete} // pass delete function
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  )
}

export default Dashboard
