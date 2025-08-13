

import { ToastContainer } from "react-toastify";
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
  GroupList,
} from "./pages";
import MasterLayout from "./components/MasterLayout/MasterLayout";
import DashboardQuizzes from "./pages/DashboardQuizzes/DashboardQuizzes";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import QuizeDeatiles from "./pages/DashboardQuizzes/QuizeDeatiles";
import NotFound from "./components/NotFound/NotFound";
import ExamModel from "./pages/Learner/ExamModel/ExamModel";
import Profile from "./pages/Authentication/Profile/Profile";
import LearnerDashboard from "./pages/Learner/LearnerDashboard/LearnerDashboard";
import Results from "./pages/Learner/Results/Results";


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
          { path: "exammodel/:quizId", element: <ExamModel /> },
          { path: "learner-dashboard", element: <LearnerDashboard /> },
          { path: "results", element: <Results /> },


          { path: "profile", element: <Profile /> },
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
