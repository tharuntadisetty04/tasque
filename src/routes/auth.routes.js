import { Router } from "express";
import { validate } from "../middleware/validate.middleware.js";
import { registerSchema } from "../validations/auth.validation.js";
import { registerUser } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), registerUser);

export default authRouter;
