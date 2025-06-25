import { Navigate } from "react-router-dom";

export default function VerifiedRoute({ children }: { children: React.ReactNode }) {
  const devVerified = localStorage.getItem("developerVerified");
  const compVerified = localStorage.getItem("companyVerified");

  if (devVerified !== "true" && compVerified !== "true") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
