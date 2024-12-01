import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthGuard() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    // 保存原始URL到state中
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // 使用Outlet渲染子路由
  return <Outlet />;
}
