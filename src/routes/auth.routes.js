import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { loginSchema, registerSchema } from "../validations/auth.validation.js";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/auth.controller.js";
import { verifyJWT } from "../middleware/auth.middleware.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUser);
authRouter.post("/login", validate(loginSchema), loginUser);
authRouter.post("/logout", verifyJWT, logoutUser);

export default authRouter;
