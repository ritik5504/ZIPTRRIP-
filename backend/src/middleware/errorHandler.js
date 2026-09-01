class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${err.name}: ${err.message}`);
  if (process.env.NODE_ENV === 'development' && err.name !== 'NotFoundError') {
    console.error(err.stack);
  }

  // Handle express-validator errors (if any slip through, though we have a specific handler)
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      success: false,
      error: {
        message: err.message,
        code: 'VALIDATION_ERROR',
        details: err.details || null
      }
    });
  }

  if (err instanceof NotFoundError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: 'NOT_FOUND'
      }
    });
  }

  // Default to 500 server error
  res.status(500).json({
    success: false,
    error: {
      message: 'Internal Server Error',
      code: 'SERVER_ERROR'
    }
  });
};

module.exports = {
  errorHandler,
  NotFoundError
};
