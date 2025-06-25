import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("companyToken");
  const isCompany = localStorage.getItem("companyEmail");
  const companyVerified = localStorage.getItem("companyVerified");

  if (!token || !isCompany) {
    return <Navigate to="/company-login" replace />;
  }
  if (companyVerified !== "true") {
    return <Navigate to="/verification-pending" replace />;
  }

  return <>{children}</>;
}
