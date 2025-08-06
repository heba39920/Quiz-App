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
  QuestionsList,
  Register,
  ResetPassword,
  StudentsList,
  GroupList
} from "./pages";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import DashboardQuizzes from "./pages/DashboardQuizzes/DashboardQuizzes";

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
          { path: "questions", element: <QuestionsList /> },


          { path: "quizzes", element: <DashboardQuizzes /> },
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
