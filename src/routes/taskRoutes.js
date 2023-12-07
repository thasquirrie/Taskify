const express = require('express');
const {
  createTask,
  getUserTasks,
  getTask,
  updateTask,
  deleteTask,
} = require('../controllers/taskController');
const { protect } = require('../controllers/authController');

const router = express.Router();

router.use(protect);

router.post('/create', createTask);
router.get('/', getUserTasks);
router.route('/:taskId').get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
