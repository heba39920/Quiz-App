
import Cookies from 'js-cookie';
import React from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
const token = Cookies.get("token");

  if (token === undefined) return null;
  if (!token) return <Navigate to="/login" replace />;

  return <>{children}</>;
};

export default ProtectedRoute;