import { ZodError } from "zod";
import { ApiError } from "../utils/ApiError.js";

const validate = (schema) => (req, res, next) => {
  try {
    // Check if the request body is empty or undefined
    if (!req.body || Object.keys(req.body).length === 0) {
      return next(new ApiError(400, "Please enter the required fields"));
    }

    // Attempt to parse the request body
    schema.parse(req.body);

    // If validation passes, move to the next middleware/controller.
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      // Extract all validation issues and create a structured error response.
      const errorDetails = error.issues.map((issue) => ({
        path: issue.path.join("."),
        message: issue.message,
      }));

      // Use the custom ApiError utility to send a consistent 400 response.
      next(new ApiError(400, errorDetails));
    } else {
      // For any other type of error, pass it to the default Express error handler.
      next(error);
    }
  }
};

export { validate };
