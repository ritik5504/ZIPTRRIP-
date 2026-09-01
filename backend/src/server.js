require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Import routes and middleware
const todosRouter = require('./routes/todos');
const healthRouter = require('./routes/health');
const { errorHandler } = require('./middleware/errorHandler');

// Initialize database (this will trigger the table creation and seeding)
require('./models/db');

const app = express();
const PORT = process.env.PORT || 8000;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// Middleware
app.use(cors({ origin: FRONTEND_URL }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/todos', todosRouter);
app.use('/api/health', healthRouter);

// 404 handler for unknown routes
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    error: {
      message: 'API route not found',
      code: 'ROUTE_NOT_FOUND'
    }
  });
});

// Global error handler (must be last middleware)
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

module.exports = server;
