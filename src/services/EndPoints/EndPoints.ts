import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "https://upskilling-egypt.com:3005";
const AuthUrl ="/api/auth/";
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/*************Authentication EndPoint Start*******************/

export const USERS_URLS = {
  LOGIN: `${AuthUrl}/login`,
  FORGET_PASSWORD: `${AuthUrl}/forgot-password`,
  RESET_PASSWORD: `${AuthUrl}/reset-password`,
  REGISTER: `${AuthUrl}/register`,
  CHANGE_PASSWORD: `${AuthUrl}/change-password`,
  LOGOUT :`${AuthUrl}/logout`
};

/*************Authentication EndPoint End*******************/
