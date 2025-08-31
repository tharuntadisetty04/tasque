import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function (val) {
          if (!validator.isEmail(val)) return false;
          const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
          const domain = val.split("@")[1];
          return allowedDomains.includes(domain);
        },
        message: "Email must be a valid Gmail, Yahoo, or Outlook address",
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    role: {
      type: String,
      enum: ["admin", "manager", "user"],
      default: "user",
      lowercase: true,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
