const todoService = require('../services/todoService');

class TodoController {
  getAllTodos(req, res, next) {
    try {
      const { search, filter, sort } = req.query;
      const todos = todoService.getAllTodos({ search, filter, sort });
      res.status(200).json({ success: true, data: todos });
    } catch (error) {
      next(error);
    }
  }

  getTodoById(req, res, next) {
    try {
      const { id } = req.params;
      const todo = todoService.getTodoById(id);
      res.status(200).json({ success: true, data: todo });
    } catch (error) {
      next(error);
    }
  }

  createTodo(req, res, next) {
    try {
      const todoData = req.body;
      const newTodo = todoService.createTodo(todoData);
      res.status(201).json({ success: true, data: newTodo });
    } catch (error) {
      next(error);
    }
  }

  updateTodo(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTodo = todoService.updateTodo(id, updateData);
      res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
      next(error);
    }
  }

  patchTodo(req, res, next) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedTodo = todoService.updateTodo(id, updateData);
      res.status(200).json({ success: true, data: updatedTodo });
    } catch (error) {
      next(error);
    }
  }

  deleteTodo(req, res, next) {
    try {
      const { id } = req.params;
      todoService.deleteTodo(id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new TodoController();
