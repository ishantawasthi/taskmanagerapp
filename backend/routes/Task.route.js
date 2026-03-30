
 import express from 'express'
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask
} from '../controllers/Task.controller.js'
import protect from '../midleware/authMiddleware.js'

const router = express.Router()

// GET    /api/tasks        → get all tasks for logged in user
// POST   /api/tasks        → create new task
// PUT    /api/tasks/:id    → update task by id
// DELETE /api/tasks/:id    → delete task by id

router.get('/',       protect, getTasks)
router.post('/',      protect, createTask)
router.put('/:id',    protect, updateTask)
router.delete('/:id', protect, deleteTask)

export default router