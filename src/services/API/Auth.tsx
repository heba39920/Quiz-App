import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import type { ChangePasswordData, ForgetPasswordPayload } from "@/interface/AuthInterface";
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
export const changePassword = async (data:ChangePasswordData) => {
  const response = await axiosInstance.post(USERS_URLS.CHANGE_PASSWORD, data);
  return response.data;
};

export const logout = async () => {
  const response = await axiosInstance.get(USERS_URLS.LOGOUT);
  return response.data;
};