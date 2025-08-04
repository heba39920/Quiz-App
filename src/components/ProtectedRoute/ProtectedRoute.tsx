// src/components/ProtectedRoute.tsx

import { type PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "@/utils/hooks/Auth";
import Cookies from "js-cookie";

const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const tokenFromRedux = useAppSelector((state) => state.auth.token);
  const tokenFromCookie = Cookies.get("token");

  const isAuthenticated = tokenFromRedux || tokenFromCookie;

  console.log("🧪 ProtectedRoute check:");
  console.log("🔐 tokenFromRedux:", tokenFromRedux);
  console.log("🍪 tokenFromCookie:", tokenFromCookie);
  console.log("✅ isAuthenticated:", isAuthenticated);

  if (isAuthenticated) return <>{children}</>;
  else return <Navigate to="/login" />;
};

export default ProtectedRoute;
