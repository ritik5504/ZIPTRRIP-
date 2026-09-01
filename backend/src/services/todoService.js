const db = require('../models/db');
const { v4: uuidv4 } = require('uuid');
const { NotFoundError } = require('../middleware/errorHandler');

class TodoService {
  getAllTodos({ search, filter, sort }) {
    let query = 'SELECT * FROM todos WHERE 1=1';
    const params = {};

    if (search) {
      query += ' AND (title LIKE @search OR description LIKE @search)';
      params.search = `%${search}%`;
    }

    if (filter) {
      switch (filter) {
        case 'active':
          query += ' AND completed = 0';
          break;
        case 'completed':
          query += ' AND completed = 1';
          break;
        case 'low':
        case 'medium':
        case 'high':
          query += ' AND priority = @priority';
          params.priority = filter;
          break;
      }
    }

    if (sort) {
      switch (sort) {
        case 'oldest':
          query += ' ORDER BY created_at ASC';
          break;
        case 'alpha':
          query += ' ORDER BY title ASC';
          break;
        case 'priority':
          // Custom sorting for priority: high -> medium -> low
          query += ` ORDER BY 
            CASE priority 
              WHEN 'high' THEN 1 
              WHEN 'medium' THEN 2 
              WHEN 'low' THEN 3 
              ELSE 4 
            END ASC, created_at DESC`;
          break;
        case 'newest':
        default:
          query += ' ORDER BY created_at DESC';
          break;
      }
    } else {
      query += ' ORDER BY created_at DESC';
    }

    const stmt = db.prepare(query);
    const todos = stmt.all(params);
    
    // Map completed from integer to boolean for the frontend
    return todos.map(todo => ({
      ...todo,
      completed: todo.completed === 1
    }));
  }

  getTodoById(id) {
    const stmt = db.prepare('SELECT * FROM todos WHERE id = ?');
    const todo = stmt.get(id);
    
    if (!todo) {
      throw new NotFoundError(`Todo with ID ${id} not found`);
    }

    return {
      ...todo,
      completed: todo.completed === 1
    };
  }

  createTodo({ title, description = '', priority = 'medium', due_date = null, category = '' }) {
    const now = new Date().toISOString();
    const id = uuidv4();
    
    const stmt = db.prepare(`
      INSERT INTO todos (id, title, description, completed, priority, due_date, category, created_at, updated_at)
      VALUES (@id, @title, @description, 0, @priority, @due_date, @category, @created_at, @updated_at)
    `);

    stmt.run({
      id,
      title,
      description,
      priority,
      due_date,
      category,
      created_at: now,
      updated_at: now
    });

    return this.getTodoById(id);
  }

  updateTodo(id, fields) {
    // Check if it exists first
    this.getTodoById(id);

    const allowedFields = ['title', 'description', 'completed', 'priority', 'due_date', 'category'];
    const updateFields = [];
    const params = { id, updated_at: new Date().toISOString() };

    for (const [key, value] of Object.entries(fields)) {
      if (allowedFields.includes(key)) {
        updateFields.push(`${key} = @${key}`);
        params[key] = key === 'completed' ? (value ? 1 : 0) : value;
      }
    }

    if (updateFields.length === 0) {
      return this.getTodoById(id);
    }

    updateFields.push('updated_at = @updated_at');

    const query = `UPDATE todos SET ${updateFields.join(', ')} WHERE id = @id`;
    const stmt = db.prepare(query);
    stmt.run(params);

    return this.getTodoById(id);
  }

  deleteTodo(id) {
    // Check if it exists first
    this.getTodoById(id);

    const stmt = db.prepare('DELETE FROM todos WHERE id = ?');
    const result = stmt.run(id);

    return result.changes > 0;
  }
}

module.exports = new TodoService();
