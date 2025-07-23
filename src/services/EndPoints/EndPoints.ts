import axios from "axios";
import CookieServices from "../CookiesServices/CookiesServices";
const AuthURL = "https://upskilling-egypt.com:3005/api/auth";
export const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = CookieServices.get("token");
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
  LOGIN: `${AuthURL}/login`,
  FORGET_PASSWORD: `${AuthURL}/forgot-password`,
  RESET_PASSWORD: `${AuthURL}/reset-password`,
  REGISTER: `${AuthURL}`,
  CHANGE_PASSWORD: `${AuthURL}/change-password`,
  facebook_auth: `${AuthURL}/auth/facebook`,
  google_auth: `${AuthURL}/auth/google`,
};

/*************Authentication EndPoint End*******************/
