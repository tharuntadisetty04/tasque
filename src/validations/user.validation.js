import { z } from "zod";

export const updateUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(50, "Username must be at most 50 characters"),
  email: z
    .string()
    .email()
    .refine(
      (val) =>
        ["gmail.com", "yahoo.com", "outlook.com"].includes(val.split("@")[1]),
      {
        message: "Email must be a Gmail, Yahoo, or Outlook address",
      }
    ),
});

export const updatePasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .max(50, "Password must be at most 50 characters"),
  })
  .superRefine(({ oldPassword, newPassword, confirmPassword }, ctx) => {
    if (oldPassword === newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        message: "New password cannot be the same as old password",
      });
    }

    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        path: ["confirmPassword"],
        message: "Passwords do not match",
      });
    }
  });
