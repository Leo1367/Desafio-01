import express from 'express';
import taskController from '../controllers/taskController.js';

const router = express.Router();

router.post('/', taskController.validateTaskData, taskController.createTask);
router.get('/', taskController.getTasks);
router.put('/:id', taskController.validateTaskData, taskController.updateTask);
router.delete('/:id', taskController.deleteTask);
router.patch('/:id/complete', taskController.updateTaskComplete);

export default router;