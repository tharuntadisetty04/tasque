// Utility to handle async route handlers(i.e, controllers)
// and forward errors to Express error middleware
const asyncHandler = (requestHandler) => {
  // Returns a function that wraps the request handler
  return (req, res, next) => {
    // Executes the handler and catches any errors, passing them to next()
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};

export { asyncHandler };
