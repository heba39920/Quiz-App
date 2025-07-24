// src/utils/validation/validation.ts

import type { RegisterOptions } from "react-hook-form";
import type { ResetPasswordPayload } from "@/interface/AuthInterface";
import { z } from "zod";

// ✅ Email validation (optional use)
export const emailValidation = {
  required: "Email is required",
  pattern: {
    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Invalid email format",
  },
};

// ✅ OTP validation
export const otpValidation = {
  required: "OTP is required",
  pattern: {
    value: /^\d{6}$/,
    message: "OTP must be 6 digits",
  },
};

// ✅ Password validation
export const passwordValidation = {
  required: "Password is required",
  minLength: {
    value: 8,
    message: "At least 8 characters required",
  },
  pattern: {
    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
    message: "Must include uppercase, lowercase, number & special character",
  },
};

// ✅ Confirm password validation (using closure to access password value)
export const confirmPasswordValidation = (
  password: string
): RegisterOptions<ResetPasswordPayload, "confirmPassword"> => ({
  validate: {
    matchesPassword: (value: string) =>
      value === password || "Passwords do not match",
  },
});

export const oldPasswordRequired ={
  required: "Old Password is required"
}

export const registerSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  role: z.string().nonempty("Role is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
