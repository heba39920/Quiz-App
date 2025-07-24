import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
<<<<<<< HEAD
import type { ChangePasswordData, ForgetPasswordPayload } from "@/interface/AuthInterface";
=======
import type { ForgetPasswordPayload, RegisterPayload } from "@/interface/AuthInterface";
>>>>>>> 687b63881f4c41f66305f629ba4d17f11648eb65
import type { ResetPasswordPayload } from "@/interface/AuthInterface";


export const forgotPassword = async (data: ForgetPasswordPayload) => {
  const response = await axiosInstance.post(USERS_URLS.FORGET_PASSWORD, data);
  return response.data;
};


export const resetPassword = async (data: ResetPasswordPayload) => {
  const response = await axiosInstance.post(USERS_URLS.RESET_PASSWORD, {
    email: data.email,
    otp: data.otp,
    password: data.password,
  });
  return response.data;
};
<<<<<<< HEAD
export const changePassword = async (data:ChangePasswordData) => {
  const response = await axiosInstance.post(USERS_URLS.CHANGE_PASSWORD, data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get(USERS_URLS.LOGOUT);
  return response.data;
};
=======


export const register = async (data: RegisterPayload) => {
  const response = await axiosInstance.post(USERS_URLS.REGISTER, {
    first_name: data.first_name,
    last_name: data.last_name,
    email: data.email,
    role: data.role,
    password: data.password
  });

  return response.data;
};
>>>>>>> 687b63881f4c41f66305f629ba4d17f11648eb65
