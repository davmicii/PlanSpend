const express = require('express');
const router = express.Router();
const {
    createTaskController,
    getAllTasksController,
    getTaskByUserIdController,
    getTaskByTaskIdController,
    getTaskByIsNotCompletedController,
    updateTaskController,
    deleteTaskController,
} = require('../controllers/taskController');
const authenticateToken = require('../middlewares/authMiddleware');


router.post('/create', authenticateToken, createTaskController);
router.get('/getAllTasks', authenticateToken, getAllTasksController);
router.post('/getTaskByUserId', authenticateToken, getTaskByUserIdController);
router.post('/getTaskByTaskId', authenticateToken, getTaskByTaskIdController);
router.get('/getTaskByIsNotCompleted/:p_user_id', authenticateToken, getTaskByIsNotCompletedController);
router.put('/update/:id', authenticateToken, updateTaskController);
router.delete('/delete/:p_task_id', authenticateToken, deleteTaskController);


module.exports = router;