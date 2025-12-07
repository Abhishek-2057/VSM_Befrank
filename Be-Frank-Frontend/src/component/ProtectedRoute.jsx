import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { Loader } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const ProtectedRoute = () => {
  const auth = useAuth();

  if (auth.loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-3">
        <Loader
          className="w-12 h-12 text-[#f48321] animate-spin"
          aria-hidden="true"
        />
        <span className="text-[#f48321] font-semibold text-lg">
          Loading...
        </span>
      </div>
    );
  }

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
};
