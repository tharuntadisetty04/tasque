import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";

// Configuring .env variables before app creation to prevent errors
dotenv.config();

const app = express();

// To parse json body requests
app.use(express.json({ limit: "16kb" }));

// To parse url encoded bodies(simple form data)
app.use(express.urlencoded({ limit: "16kb", extended: true }));

// To sanitize input(mongodb operators or queries especially)
// app.use(mongoSanitize());
// The above is causing errors because it is trying to modify req object which is read only in express 5 and the error is:
// {"success":false,"message":"Cannot set property query of #<IncomingMessage> which has only a getter"}

// Serves static files from the public folder
app.use(express.static("public"));

// To parse cookies
app.use(cookieParser());

// To share resources through different domains(origins)
app.use(cors());

// Adds security headers
app.use(helmet());

// Logs the requests made
app.use(morgan("dev"));

// Rate limiting to incoming requests
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});

app.use(limiter);

// Global error handler middleware
import errorHandler from "./middleware/errorHandler.middleware.js";
app.use(errorHandler);

// Root route for server status
app.get("/", (req, res) => {
  res.send("Server running...");
});

export default app;
