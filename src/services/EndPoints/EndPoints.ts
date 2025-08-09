import axios from "axios";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
const baseURL = "https://upskilling-egypt.com:3005/api/";
const AuthUrl = "auth/";
const GroupUrl = "group";
const StudentUrl = "student";
const QuizUrl = "quiz";
export const axiosInstance = axios.create({
  baseURL,
});

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     if (token) {
//       config.headers.Authorization = token;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

axiosInstance.interceptors.request.use(
  (config) => {
    // const token =
      // "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2ODgyMzkxNDQ0ZGFiN2I4Y2IwMjY4Y2IiLCJlbWFpbCI6IlVzZXJTaGltYWFAZ21haWwuY29tIiwicm9sZSI6IlN0dWRlbnQiLCJpYXQiOjE3NTQ3NDEwNDksImV4cCI6MTc1ODM0MTA0OX0.nA1J9nsHYJasaLfX_Bpv1uUjBPA-9DnPmIJ9z9KaLHA";
const token = useSelector((state )=> state.auth.token)
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = Cookies.get("token");
//     console.log("Token from cookie:", token);  // تأكد أنه يظهر التوكن في الكونسول

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );


/*************Authentication EndPoint Start*******************/

export const USERS_URLS = {
  LOGIN: `${AuthUrl}/login`,
  FORGET_PASSWORD: `${AuthUrl}/forgot-password`,
  RESET_PASSWORD: `${AuthUrl}/reset-password`,
  REGISTER: `${AuthUrl}/register`,
  CHANGE_PASSWORD: `${AuthUrl}/change-password`,
  LOGOUT: `${AuthUrl}/logout`,
};

/*************Authentication EndPoint End*******************/

/*************Group EndPoint Start*******************/

export const GROUP_URLS = {
  GET_GROUP_LIST: `${GroupUrl}`,
  DELETE_GROUP: (id: string) => `${GroupUrl}/${id}`,
  VIEW_GROUP: (id: string) => `${GroupUrl}/${id}`,
  ADD_GROUP: `${GroupUrl}`,
  UPDATE_GROUP: (id: string) => `${GroupUrl}/${id}`,
};
/*************Group EndPoint End*******************/

/*************Student EndPoint Start*******************/

export const STUDENT_URLS = {
  GET_ALL_STUDENT: StudentUrl,
  GET_ALL_STUDENTS_WITHOUT_GROUP: `${StudentUrl}/without-group`,
  DELETE_STUDENT: (id: string) => `${StudentUrl}/${id}`,
  DELETE_STUDENT_FROM_GROUP: (StudentId: string, GroupId: string) =>
    `${StudentUrl}/${StudentId}/${GroupId}`,

  GET_STUDENT_BY_ID: (id: string) => `${StudentUrl}/${id}`,
};
/*************Student EndPoint End*******************/
/*************Questions EndPoint Start*******************/
export const QUESTIONS_URLS = {
  GET_ALL_QUESTIONS: "question",
  ADD_QUESTION: "question",
  UPDATE_QUESTION: (id: string) => `question/${id}`,
  DELETE_QUESTION: (id: string) => `question/${id}`,
  GET_QUESTION_BY_ID: (id:string)=>`question/${id}`,
};


/*************Quizzes EndPoint Start*******************/

export const QUIZZES_URL = {
  GET_FIRSTFIVEINCOMING: `${QuizUrl}/incomming`,
  GET_LASTFIVECOMPLETED: `${QuizUrl}/completed`,
  CREATE_NEW_QUIZE: `${QuizUrl}`,
  CET_ALL_QUIZZES: `${QuizUrl}`,
  GET_QUIZ_DETAILS : (id:string) => `${QuizUrl}/${id}`,
};

/********* Student Exam (learner) ********* */

export const STUDENT_EXAM = {
   GET_QUIZWITHOUTANSWER: (id:string) => `${QuizUrl}/without-answers/${id}`,
   JOIN_EXAM : `${QuizUrl}/join`,
   SUBMIT_QUIZ: (id: string) => `${QuizUrl}/submit/${id}`,
   GET_INCOMING: `${QuizUrl}/incomming`,
   GET_COMPLETED: `${QuizUrl}/completed`,
}