import { axiosInstance, USERS_URLS } from "@/services/EndPoints/EndPoints";
import type { ForgetPasswordPayload } from "@/interface/AuthInterface";
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
