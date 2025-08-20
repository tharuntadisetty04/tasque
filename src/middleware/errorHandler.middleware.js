const errorHandler = (err, req, res, next) => {
  // Set default status code and message if not provided
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Handle invalid MongoDB ObjectId errors
  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  // Handle invalid JWT token errors
  if (err.name === "JsonWebTokenError") {
    message = `Invalid token, please try again.`;
    statusCode = 401;
  }

  // Handle expired JWT token errors
  if (err.name === "TokenExpiredError") {
    message = `Token has expired, please login again.`;
    statusCode = 401;
  }

  // Send error response as JSON
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
