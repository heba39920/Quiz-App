import axios from "axios";
import Cookies from "js-cookie";
const baseURL = "https://upskilling-egypt.com:3005";

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
  LOGIN: `${baseURL}/api/auth/login`,
  FORGET_PASSWORD: `${baseURL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${baseURL}/api/auth/reset-password`,
  REGISTER: `${baseURL}`,
  CHANGE_PASSWORD: `${baseURL}/api/auth/change-password`,
  facebook_auth: `${baseURL}/api/auth/auth/facebook`,
  google_auth: `${baseURL}/api/auth/auth/google`,
};

/*************Authentication EndPoint End*******************/
