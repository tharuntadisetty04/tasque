class ApiError extends Error {
  /**
   * Creates an instance of ApiError
   * @param {number} statuscode - HTTP status code for the error
   * @param {string} message - Error message (default: "Something went wrong")
   * @param {Array} errors - Additional error details (default: empty array)
   * @param {string} stack - Optional stack trace
   */
  constructor(
    statuscode,
    message = "Something went wrong",
    errors = [],
    stack = ""
  ) {
    // Call the parent Error constructor with the message
    super(message);
    // Set HTTP status code
    this.statuscode = statuscode;
    // Optional data property (can be set later)
    this.data = null;
    // Error message
    this.message = message;
    // Indicates failure
    this.success = false;
    // Array of error details
    this.errors = errors;

    // Set stack trace if provided, otherwise capture it
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
