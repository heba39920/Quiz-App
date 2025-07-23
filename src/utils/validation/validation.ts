// src/utils/validation/validation.ts

import type { RegisterOptions } from "react-hook-form";
import type { ResetPasswordPayload } from "@/interface/AuthInterface";

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
