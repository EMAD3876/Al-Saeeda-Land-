import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ allowedRoles }: { allowedRoles?: string[] }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error("Not authenticated");
      })
      .then(data => {
        setIsAuthenticated(true);
        setUserRole(data.user.role);
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) {
    return <div className="min-h-screen flex items-center justify-center">جاري التحقق...</div>;
  }

  if (!isAuthenticated) {
    // In a real app, route to login page
    return <Navigate to="/" replace />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
