import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getUserDetails = asyncHandler(async (req, res, next) => {
  const user = req?.user;

  if (!user) {
    return next(new ApiError(401, "User not authenticated"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, user, "User details fetched successfully"));
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  // We can paginate users if there are more
  const users = await User.find().select("-password -refreshToken");

  if (!users) {
    return next(new ApiError(404, "Users not found at all"));
  }

  res
    .status(200)
    .json(new ApiResponse(200, users, "All users fetched successfully"));
});

const updateUser = asyncHandler(async (req, res, next) => {
  const { username, email } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return next(new ApiError(400, "No user id"));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { username, email },
    { new: true, runValidators: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    return next(new ApiError(500, "Failed to update user profile"));
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, "User details updated successfully")
    );
});

const updatePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  const userId = req.user?._id;
  const user = await User.findById(userId);

  if (!user) {
    return next(new ApiError(404, "User not found"));
  }

  const isMatch = await user.isPasswordCorrect(oldPassword);

  if (!isMatch) {
    return next(new ApiError(400, "Old password is incorrect"));
  }

  user.password = newPassword;
  await user.save();

  res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return next(new ApiError(400, "Invalid user ID format"));
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return next(new ApiError(404, "User not found"));
    }

    return res
      .status(200)
      .json(new ApiResponse(200, `User with id ${id} deleted successfully`));
  } catch (error) {
    next(new ApiError(500, "Error deleting user"));
  }
});

export { getAllUsers, getUserDetails, updateUser, updatePassword, deleteUser };
