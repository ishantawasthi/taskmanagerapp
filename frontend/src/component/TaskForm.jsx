

// TaskForm.jsx — Form to create a new task
// Takes title + description → calls onAdd prop function

import { useState } from 'react'

// onAdd = function passed from Dashboard that handles API call
function TaskForm({ onAdd, loading }) {
  // ─── State for form inputs ─────────────────────────────────────────
  const [title,       setTitle]       = useState('')
  const [description, setDescription] = useState('')

  // ─── Handle Submit ─────────────────────────────────────────────────
  const handleSubmit = async (e) => {
    e.preventDefault()

    // Don't submit if title is empty
    if (!title.trim()) return

    // Call parent function with task data
    // Dashboard handles the actual API call
    await onAdd({ title, description })

    // Clear form after successful add
    setTitle('')
    setDescription('')
  }

  return (
    <div className="task-form-card">

      <div className="task-form-title">
        <span>✦</span> Add New Task
      </div>

      <form onSubmit={handleSubmit}>
        <div className="task-form-row">

          {/* Title input */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Task Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="What needs to be done?"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description input */}
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Description (optional)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Add more details..."
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn-add"
            disabled={loading || !title.trim()}
          >
            {loading ? '...' : '+ Add Task'}
          </button>

        </div>
      </form>

    </div>
  )
}

export default TaskForm