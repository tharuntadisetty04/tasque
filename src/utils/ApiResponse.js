class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    // HTTP status code
    this.statusCode = statusCode;
    // Response data
    this.data = data;
    // Message describing the response
    this.message = message;
    // Indicates success if status code is less than 400
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
