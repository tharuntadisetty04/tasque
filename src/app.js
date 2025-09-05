import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler.middleware.js";

// Configuring .env variables before app creation to prevent errors
dotenv.config();

const app = express();

// To parse json body requests
app.use(express.json({ limit: "16kb" }));

// To parse url encoded bodies(simple form data)
app.use(express.urlencoded({ limit: "16kb", extended: true }));

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

// Root route for server status
app.get("/", (req, res) => {
  res.send("Server running...");
});

// Router imports
import authRouter from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

// Auth route
app.use("/api/v1/auth", authRouter);

// User route
app.use("/api/v1/users", userRoutes);

// 404 for unknown routes
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
});

// Global error handler
app.use(errorHandler);

export default app;
