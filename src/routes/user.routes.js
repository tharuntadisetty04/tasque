import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserDetails,
  updatePassword,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyAdmin, verifyJWT } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {
  updatePasswordSchema,
  updateUserSchema,
} from "../validations/user.validation.js";

const userRouter = Router();

// secured routes
userRouter.get("/get-user-details", verifyJWT, getUserDetails);

userRouter.patch(
  "/update-user",
  verifyJWT,
  validate(updateUserSchema),
  updateUser
);

userRouter.patch(
  "/update-password",
  verifyJWT,
  validate(updatePasswordSchema),
  updatePassword
);

// Admin routes
userRouter.get("/all", verifyJWT, verifyAdmin, getAllUsers);
userRouter.delete("/delete-user/:id", verifyJWT, verifyAdmin, deleteUser);

export default userRouter;
