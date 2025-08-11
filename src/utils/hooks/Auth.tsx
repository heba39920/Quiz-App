import {
  useMutation,
  type UseMutationResult,
} from "@tanstack/react-query";
import {
  changePassword,
  forgotPassword,
  logout,
  register,
  resetPassword,
  login,
} from "@/services/API/Auth";
import type {
  ForgetPasswordPayload,
  RegisterPayload,
  ResetPasswordPayload,
} from "@/interface/AuthInterface";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import { login as loginRedux } from "@/redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "@/redux/store";
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useForgotPassword = (): UseMutationResult<
  any,
  unknown,
  ForgetPasswordPayload,
  unknown
> => {
  return useMutation({
    mutationFn: forgotPassword,
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

export const useChangePassword = () => {
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success("Password has been changed successfully!");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong with changing your password!"
      );
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: logout,
  });
};



export const useRegister = (): UseMutationResult<
  any,
  Error,
  RegisterPayload,
  unknown
> => {
  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      toast.success("Registration successful! You can now log in.");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
export const useLogin = () => {
  const dispatch = useAppDispatch();

  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      const { accessToken, profile, message } = response?.data ?? {};

      if (!accessToken) {
        toast.error("No token returned from server");
        return;
      }

      Cookies.set("token", accessToken, { expires: 7, path: "/" });
      dispatch(loginRedux({ token: accessToken, user: profile }));

      toast.success(message || "Logged in successfully!");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};


export default function useAuth() {
  const logedInData = useAppSelector((state) => state.auth); // أو حسب طريقة تخزين auth في الريدوكس
  return { logedInData };
}