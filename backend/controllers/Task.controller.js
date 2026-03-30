import Task from '../models/Tasks.model.js'

// ─────────────────────────────────────────
// GET ALL TASKS
// GET /api/tasks
// ─────────────────────────────────────────
const getTasks = async (req, res) => {
  try {

    // find all tasks that belong to logged in user
    // req.userId comes from authMiddleware
    const tasks = await Task.find({ user: req.userId })

    res.status(200).json(tasks)

  } catch (error) {
    console.error('Error getting tasks:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


// ─────────────────────────────────────────
// CREATE TASK
// POST /api/tasks
// ─────────────────────────────────────────
const createTask = async (req, res) => {
  try {

    // get task details from request body
    const { title, description } = req.body

    // validate title is not empty
    if (!title) {
      return res.status(400).json({ message: 'Title is required' })
    }

    // create task in DB
    // req.userId comes from authMiddleware — links task to user
    const task = await Task.create({
      title,
      description,
      user: req.userId     // ← this connects task to logged in user
    })

    res.status(201).json(task)

  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


// ─────────────────────────────────────────
// UPDATE TASK
// PUT /api/tasks/:id
// ─────────────────────────────────────────
const updateTask = async (req, res) => {
  try {

    // find task by id AND user
    // user check ensures you can only update YOUR tasks
    const task = await Task.findOneAndUpdate(
      {
        _id:  req.params.id,   // task id from URL
        user: req.userId       // must belong to logged in user
      },
      req.body,                // update with new data
      { new: true }            // return updated task not old one
    )

    // if task not found or belongs to different user
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json(task)

  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


// ─────────────────────────────────────────
// DELETE TASK
// DELETE /api/tasks/:id
// ─────────────────────────────────────────
const deleteTask = async (req, res) => {
  try {

    // find task by id AND user
    // user check ensures you can only delete YOUR tasks
    const task = await Task.findOneAndDelete({
      _id:  req.params.id,   // task id from URL
      user: req.userId       // must belong to logged in user
    })

    // if task not found
    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    res.status(200).json({ message: 'Task deleted successfully' })

  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}


export { getTasks, createTask, updateTask, deleteTask }
