// services/EndPoints/EndPoints.ts
import axios from "axios";
import Cookies from "js-cookie";

const baseURL = "https://upskilling-egypt.com:3005/api/";

// 👇 خليه بدون سلاش أخير لتفادي auth//login
const AuthUrl = "auth";
const GroupUrl = "group";
const StudentUrl = "student";
const QuizUrl = "quiz";

export const axiosInstance = axios.create({
  baseURL,
  // لو API يعتمد على كوكيز السيرفر، فعّل السطر التالي:
  // withCredentials: true,
  timeout: 20000,
});

// ---------- Request Interceptor (واحد فقط) ----------
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    // تأكد من نوع المحتوى افتراضيًا
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ---------- Response Interceptor (اختياري لكن مفيد) ----------
axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    // لو انتهت الجلسة أو التوكن باطل
    if (error?.response?.status === 401) {
      Cookies.remove("token", { path: "/" });
      // لو بتستخدمي روتينج: ممكن ترجعي للّوجين
      // window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

/************* Authentication EndPoints ******************/
export const USERS_URLS = {
  LOGIN: `${AuthUrl}/login`,
  FORGET_PASSWORD: `${AuthUrl}/forgot-password`,
  RESET_PASSWORD: `${AuthUrl}/reset-password`,
  REGISTER: `${AuthUrl}/register`,
  CHANGE_PASSWORD: `${AuthUrl}/change-password`,
  LOGOUT: `${AuthUrl}/logout`,
  ME: `${AuthUrl}/me`, // مفيد للهيدرايشن بعد الريفريش
};

/************* Group EndPoints ******************/
export const GROUP_URLS = {
  GET_GROUP_LIST: `${GroupUrl}`,
  DELETE_GROUP: (id: string) => `${GroupUrl}/${id}`,
  VIEW_GROUP: (id: string) => `${GroupUrl}/${id}`,
  ADD_GROUP: `${GroupUrl}`,
  UPDATE_GROUP: (id: string) => `${GroupUrl}/${id}`,
};

/************* Student EndPoints ******************/
export const STUDENT_URLS = {
  GET_ALL_STUDENT: StudentUrl,
  GET_ALL_STUDENTS_WITHOUT_GROUP: `${StudentUrl}/without-group`,
  DELETE_STUDENT: (id: string) => `${StudentUrl}/${id}`,
  DELETE_STUDENT_FROM_GROUP: (StudentId: string, GroupId: string) =>
    `${StudentUrl}/${StudentId}/${GroupId}`,
  GET_STUDENT_BY_ID: (id: string) => `${StudentUrl}/${id}`,
  GET_TOP_FIVE: `${StudentUrl}/top-five`,
};

/************* Questions EndPoints ******************/
export const QUESTIONS_URLS = {
  GET_ALL_QUESTIONS: "question",
  ADD_QUESTION: "question",
  UPDATE_QUESTION: (id: string) => `question/${id}`,
  DELETE_QUESTION: (id: string) => `question/${id}`,
  GET_QUESTION_BY_ID: (id: string) => `question/${id}`,
};

/************* Quizzes EndPoints ******************/
export const QUIZZES_URL = {
  GET_FIRSTFIVEINCOMING: `${QuizUrl}/incomming`, // لو السيرفر كاتبه كده سيبيه
  GET_LASTFIVECOMPLETED: `${QuizUrl}/completed`,
  CREATE_NEW_QUIZE: `${QuizUrl}`,
  CET_ALL_QUIZZES: `${QuizUrl}`,
  GET_QUIZ_DETAILS: (id: string) => `${QuizUrl}/${id}`,
};

/********* Student Exam (learner) *********/
export const STUDENT_EXAM = {
  GET_QUIZWITHOUTANSWER: (id: string) => `${QuizUrl}/without-answers/${id}`,
  JOIN_EXAM: `${QuizUrl}/join`,
  SUBMIT_QUIZ: (id: string) => `${QuizUrl}/submit/${id}`,
  GET_INCOMING: `${QuizUrl}/incomming`,
  GET_COMPLETED: `${QuizUrl}/completed`,
  GET_RESULTS: `${QuizUrl}/result`,
};
