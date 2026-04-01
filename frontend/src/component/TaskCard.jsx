

// TaskCard.jsx — Displays a single task
// Shows title, description, status badge, toggle and delete buttons

function TaskCard({ task, onToggle, onDelete }) {

  const isCompleted = task.status === 'completed'

  return (
    <div className={`task-card ${isCompleted ? 'completed' : ''}`}>

      {/* Checkbox — click to toggle status */}
      <div
        className={`task-checkbox ${isCompleted ? 'checked' : ''}`}
        onClick={() => onToggle(task)}
        title={isCompleted ? 'Mark as pending' : 'Mark as complete'}
      >
        {/* Show checkmark if completed */}
        {isCompleted && '✓'}
      </div>

      {/* Task info */}
      <div className="task-info">
        {/* Title — strikethrough if completed */}
        <div className={`task-title ${isCompleted ? 'done' : ''}`}>
          {task.title}
        </div>

        {/* Description — only show if it exists */}
        {task.description && (
          <div className="task-desc">{task.description}</div>
        )}
      </div>

      {/* Status badge */}
      <span className={`task-badge ${task.status}`}>
        {task.status}
      </span>

      {/* Action buttons — visible on hover */}
      <div className="task-actions">

        {/* Toggle button */}
        <button
          className="btn-icon toggle"
          onClick={() => onToggle(task)}
          title={isCompleted ? 'Mark pending' : 'Mark complete'}
        >
          {isCompleted ? '↺' : '✓'}
        </button>

        {/* Delete button */}
        <button
          className="btn-icon delete"
          onClick={() => onDelete(task._id)}
          title="Delete task"
        >
          ✕
        </button>

      </div>
    </div>
  )
}

export default TaskCard
