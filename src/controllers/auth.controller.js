import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Generate tokens
const generateTokens = async (id) => {
  try {
    const user = await User.findById(id);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token generation failed");
  }
};

// Register user
const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  const existedUser = await User.findOne({ email });

  if (existedUser) {
    return next(new ApiError(409, "User with email already exists"));
  }

  const user = await User.create({ username, email, password });

  const isUserCreated = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!isUserCreated) {
    return next(new ApiError(500, "User registration failed"));
  }

  const { accessToken, refreshToken } = await generateTokens(isUserCreated._id);

  const accessTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 1 * 24 * 60 * 60 * 1000,
  };

  const refreshTokenOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
    maxAge: 10 * 24 * 60 * 60 * 1000,
  };

  return res
    .status(201)
    .cookie("AccessToken", accessToken, accessTokenOptions)
    .cookie("RefreshToken", refreshToken, refreshTokenOptions)
    .json(new ApiResponse(201, isUserCreated, "User registered successfully"));
});

export { registerUser };
