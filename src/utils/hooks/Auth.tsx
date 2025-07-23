// src/utils/hooks/Auth/useForgotPassword.ts

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { forgotPassword, resetPassword } from "@/services/API/Auth";
import type {
  ForgetPasswordPayload,
  ResetPasswordPayload,
} from "@/interface/AuthInterface";
import { toast } from "react-hot-toast";

export const useForgotPassword = (): UseMutationResult<
  any,
  unknown,
  ForgetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: (data: ForgetPasswordPayload) => forgotPassword(data),
    onSuccess: () => {
      toast.success("Check your email for reset instructions!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};

export const useResetPassword = (): UseMutationResult<
  any,
  Error,
  ResetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Password reset successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
