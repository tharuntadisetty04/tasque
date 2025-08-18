const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    message = `Resource not found. Invalid: ${err.path}`;
    statusCode = 400;
  }

  if (err.name === "JsonWebTokenError") {
    message = `Invalid token, please try again.`;
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = `Token has expired, please login again.`;
    statusCode = 401;
  }

  return res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
