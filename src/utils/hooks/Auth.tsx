// src/utils/hooks/Auth/useForgotPassword.ts

import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { forgotPassword, register, resetPassword } from "@/services/API/Auth";
import type {
  ForgetPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/interface/AuthInterface";
import { toast } from "react-toastify";


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


export const useRegister  = ():UseMutationResult<
  any,          // نوع البيانات الراجعة من السيرفر عند النجاح (TData)
  Error,        // نوع الخطأ (TError)
  RegisterPayload , // البيانات اللي هنرسلها في الطلب (TVariables)
  unknown       // سياق (Context) لو هتستخدمي onMutate
> =>{

return useMutation ({
  mutationFn : register , // الدالة اللي بتعمل POST للـ API
  onSuccess : ()=>{
    toast.success("Registration successful! You can now log in.");
  },

  onError : (error: any)=>{
    toast.error(error?.response?.data?.message || "Something went wrong");
  },

})
}