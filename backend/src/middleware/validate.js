const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: {
        message: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: errors.array()
      }
    });
  }
  next();
};

const validateCreateTodo = [
  body('title')
    .trim()
    .notEmpty().withMessage('Title is required')
    .isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('due_date')
    .optional({ nullable: true })
    .isISO8601().withMessage('Due date must be a valid ISO 8601 date string'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Category must be at most 100 characters'),
];

const validateUpdateTodo = [
  body('title')
    .optional()
    .trim()
    .notEmpty().withMessage('Title cannot be empty if provided')
    .isLength({ max: 200 }).withMessage('Title must be at most 200 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 }).withMessage('Description must be at most 1000 characters'),
  body('completed')
    .optional()
    .isBoolean().withMessage('Completed must be a boolean'),
  body('priority')
    .optional()
    .isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('due_date')
    .optional({ nullable: true })
    .isISO8601().withMessage('Due date must be a valid ISO 8601 date string'),
  body('category')
    .optional()
    .trim()
    .isLength({ max: 100 }).withMessage('Category must be at most 100 characters'),
];

module.exports = {
  validateCreateTodo,
  validateUpdateTodo,
  handleValidationErrors
};
