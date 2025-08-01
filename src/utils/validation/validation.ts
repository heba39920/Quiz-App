import { z } from "zod";



/* Login */

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, { message: "Invalid email format" }),
    password: z.string()
    .min(1, { message: "Password is required" })

});

/* Forget Password Schema */
export const forgetPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
});

/* Reset Password Schema */
export const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
    otp: z
      .string()
      .min(6, "OTP must be 6 digits")
      .max(6, "OTP must be 6 digits"),
    password: z
      .string()
      .min(8, "At least 8 characters required")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[0-9]/, "Must include a number")
      .regex(/[^A-Za-z0-9]/, "Must include a special character"),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const oldPasswordRequired = {
  required: "Old Password is required",
};

/* Register Schema */
export const registerSchema = z.object({
  first_name: z.string().min(2, "First name must be at least 2 characters"),
  last_name: z.string().min(2, "Last name must be at least 2 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  role: z.string().nonempty("Role is required"),
  password: z
    .string()
    .min(8, "At least 8 characters required")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});
/* Change Password Schema */
export const changePasswordSchema = z.object({
  password: z.string().min(1, "Old password is required"),
  password_new: z
    .string()
    .min(8, "At least 8 characters required")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a special character"),
});




export const questionSchema = z.object({
  title: z.string().min(1, "Question's Title is required"),
  description: z.string().min(1, "Question's Description is required"),
  type: z.string().min(1, "Question's Category Type is required"),
  options: z.object({
    A: z.string().min(1, "Option A is required"),
    B: z.string().min(1, "Option B is required"),
    C: z.string().min(1, "Option C is required"),
    D: z.string().min(1, "Option D is required"),
  }),
  answer: z.string().min(1, "Answer is required"),
  difficulty: z.string().min(1, "Difficulty is required"),
});