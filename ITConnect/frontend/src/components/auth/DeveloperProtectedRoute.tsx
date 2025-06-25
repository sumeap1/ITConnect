// src/components/DeveloperProtectedRoute.tsx
import { Navigate } from "react-router-dom";

export default function DeveloperProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("developerToken");
  const isDeveloper = localStorage.getItem("developerEmail");
  const isVerified = localStorage.getItem("developerVerified") === "true";

  if (!token || !isDeveloper) {
    return <Navigate to="/developer-login" replace />;
  }
  if (!isVerified) {
    return <Navigate to="/verification-pending" replace />;
  }

  return <>{children}</>;
}
