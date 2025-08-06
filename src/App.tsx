import { useEffect } from "react";
import Cookies from "js-cookie";
import { useAppDispatch } from "@/utils/hooks/Auth";
import { login } from "@/redux/slices/authSlice";

import { ToastContainer } from "react-toastify";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthLayout,
  ChangePassword,
  Dashboard,
  ForgetPassword,
  Login,
  QuestionsList,
  Register,
  ResetPassword,
  StudentsList,
  GroupList
} from "./pages";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import DashboardQuizzes from "./pages/DashboardQuizzes/DashboardQuizzes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import QuizeDeatiles from "./pages/DashboardQuizzes/QuizeDeatiles";
import NotFound from "./components/NotFound/NotFound";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      dispatch(login({ token, user: null }));
    } else {
      console.log("⛔ No token found in cookies");
    }
  }, []);

  const routes = createBrowserRouter(
    [
      {
        path: "/",
        element: <AuthLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Login /> },
          { path: "login", element: <Login /> },
          { path: "register", element: <Register /> },
          { path: "forget-password", element: <ForgetPassword /> },
          { path: "reset-password", element: <ResetPassword /> },
          { path: "change-password", element: <ChangePassword /> },
        ],
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <MasterLayout />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "groups", element: <GroupList /> },
          { path: "students", element: <StudentsList /> },
          { path: "questions", element: <QuestionsList /> },


          { path: "quizzes", element: <DashboardQuizzes /> },
          { path: "quizzes/:id", element: <QuizeDeatiles /> },
        ],
        errorElement: <NotFound />,
      },
    ],
    {
      basename: "/Quiz-App/",
    }
  );

  return (
    <>
      <ToastContainer position="top-center" />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
