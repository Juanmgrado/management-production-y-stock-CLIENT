import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/useAuth";

export const AdminRoute = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  if (!user?.isAdmin) return <Navigate to="/products" replace />;

  return <Outlet />;
};
