import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <h2 className="text-2xl font-semibold">Loading...</h2>
    </div>
  );
}

  //   Not Logged In

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }

  // Logged in but not admin check
  if (user.role !== "admin") {
    return <Navigate to={"/"} replace />;
  }

  if (children) {
    return children;
  }

  return <Outlet />;
};

export default ProtectedAdminRoute;
