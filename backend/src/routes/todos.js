const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const { validateCreateTodo, validateUpdateTodo, handleValidationErrors } = require('../middleware/validate');

router.get('/', todoController.getAllTodos);
router.get('/:id', todoController.getTodoById);
router.post('/', validateCreateTodo, handleValidationErrors, todoController.createTodo);
router.put('/:id', validateUpdateTodo, handleValidationErrors, todoController.updateTodo);
router.patch('/:id', validateUpdateTodo, handleValidationErrors, todoController.patchTodo);
router.delete('/:id', todoController.deleteTodo);

module.exports = router;
