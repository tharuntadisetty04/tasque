import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .refine(
      (val) =>
        ["gmail.com", "yahoo.com", "outlook.com"].includes(val.split("@")[1]),
      {
        message: "Email must be a Gmail, Yahoo, or Outlook address",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(30, "Password must be at most 30 characters"),
});

export const loginSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .refine(
      (val) =>
        ["gmail.com", "yahoo.com", "outlook.com"].includes(val.split("@")[1]),
      {
        message: "Email must be a Gmail, Yahoo, or Outlook address",
      }
    ),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters"),
});
