const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(`[Error] ${req.method} ${req.originalUrl} - Status: ${statusCode} - Message: ${err.message}`);

  const message = statusCode === 500 ? 'Something went wrong' : (err.message || 'An error occurred');

  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = errorHandler;
