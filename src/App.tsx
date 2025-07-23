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
        path: "/dashboard",
        // element: <MasterLayout />,
        errorElement: <NotFound />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
        ],
      },
    ],
    {
      basename: "/Quiz-App/",
    }
  );

  return (
    <>
      <ToastContainer position="top-center"  />
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
