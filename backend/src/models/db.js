const Database = require('better-sqlite3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.resolve(__dirname, '../../data/todos.db');
const db = new Database(dbPath, { verbose: process.env.NODE_ENV === 'development' ? console.log : null });

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT DEFAULT '',
    completed INTEGER DEFAULT 0,
    priority TEXT DEFAULT 'medium',
    due_date TEXT,
    category TEXT DEFAULT '',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

// Check if database is empty and seed data if it is
const countStmt = db.prepare('SELECT COUNT(*) as count FROM todos');
const { count } = countStmt.get();

if (count === 0) {
  console.log('Database empty, seeding data...');
  const insertStmt = db.prepare(`
    INSERT INTO todos (id, title, description, completed, priority, due_date, category, created_at, updated_at)
    VALUES (@id, @title, @description, @completed, @priority, @due_date, @category, @created_at, @updated_at)
  `);

  const now = new Date().toISOString();
  const seedTodos = [
    {
      id: uuidv4(),
      title: 'Complete Ziptrrip assignment',
      description: 'Finish Ziptrrip full-stack todo application with React and Node.js',
      completed: 0,
      priority: 'high',
      due_date: new Date(Date.now() + 86400000 * 2).toISOString(), // 2 days from now
      category: 'Work',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Buy groceries',
      description: 'Milk, Eggs, Bread, Vegetables',
      completed: 1,
      priority: 'low',
      due_date: null,
      category: 'Shopping',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Read Node.js documentation',
      description: 'Focus on Express.js middleware and error handling',
      completed: 0,
      priority: 'medium',
      due_date: null,
      category: 'Learning',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Schedule dentist appointment',
      description: 'Call Dr. Smith clinic',
      completed: 0,
      priority: 'medium',
      due_date: new Date(Date.now() + 86400000 * 5).toISOString(),
      category: 'Health',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Review pull requests',
      description: '',
      completed: 0,
      priority: 'high',
      due_date: new Date(Date.now() + 86400000 * 1).toISOString(),
      category: 'Work',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Go for a morning run',
      description: '5km in the park',
      completed: 1,
      priority: 'low',
      due_date: null,
      category: 'Health',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Update portfolio website',
      description: 'Add recent projects and update resume',
      completed: 0,
      priority: 'medium',
      due_date: new Date(Date.now() + 86400000 * 7).toISOString(),
      category: 'Personal',
      created_at: now,
      updated_at: now
    },
    {
      id: uuidv4(),
      title: 'Learn about SQLite',
      description: 'Understand better-sqlite3 features',
      completed: 0,
      priority: 'low',
      due_date: null,
      category: 'Learning',
      created_at: now,
      updated_at: now
    }
  ];

  const insertMany = db.transaction((todos) => {
    for (const todo of todos) {
      insertStmt.run(todo);
    }
  });

  insertMany(seedTodos);
  console.log('Seeded database with 8 todos.');
}

module.exports = db;
