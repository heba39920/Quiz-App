import { ToastContainer } from "react-toastify";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  AuthLayout,
  ChangePassword,
  Dashboard,
  ForgetPassword,
  Login,
  NotFound,
  Register,
  ResetPassword,
} from "./pages";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import GroupList from "./pages/Group/GroupList";
import StudentsList from "./pages/StudentsList/StudentsList";
import DashboardQuizzes from "./pages/DashboardQuizzes/DashboardQuizzes";
import QuizeDeatiles from "./pages/DashboardQuizzes/QuizeDeatiles";

function App() {
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
        element: <MasterLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "groups", element: <GroupList /> },
          { path: "students", element: <StudentsList /> },
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
