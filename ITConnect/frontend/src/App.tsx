import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Pages
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import HowItWorks from "@/pages/HowItWorks";
import ForCompanies from "@/pages/ForCompanies";
import ForDevelopers from "@/pages/ForDevelopers";
import About from "@/pages/About";
import Privacy from "@/pages/Privacy";
import CompanyRegister from "@/pages/company/CompanyRegister";
import CompanyLogin from "@/pages/company/CompanyLogin";
import DeveloperRegister from "@/pages/developer/DeveloperRegister";
import DeveloperLogin from "@/pages/developer/DeveloperLogin";
import VerificationPending from "@/pages/VerificationPending";
import VerifyEmail from "@/pages/VerifyEmail";

// Dashboards
import DeveloperDashboard from "@/pages/developer-dashboard/DeveloperDashboard";
import DeveloperProfilePage from "@/pages/developer-dashboard/Profile";
import DeveloperNotification from "@/pages/developer-dashboard/Notification";
import CompanyDashboard from "@/pages/company-dashboard/CompanyDashboard";
import NewJobForm from "@/pages/company-dashboard/NewJobForm";
import CompanyNotification from "@/pages/company-dashboard/Notification";
import CompanyProfile from "@/pages/company-dashboard/Profile";

// Auth Wrappers
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import VerifiedRoute from "@/components/auth/VerifiedRoute";
import DeveloperProtectedRoute from "@/components/auth/DeveloperProtectedRoute";

// React Query instance
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <Router>
          <Routes>
            {/* 🌐 Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/for-companies" element={<ForCompanies />} />
            <Route path="/for-developers" element={<ForDevelopers />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/company-register" element={<CompanyRegister />} />
            <Route path="/company-login" element={<CompanyLogin />} />
            <Route path="/developer-register" element={<DeveloperRegister />} />
            <Route path="/developer-login" element={<DeveloperLogin />} />
            <Route path="/verification-pending" element={<VerificationPending />} />
            <Route path="/verify-email" element={<VerifyEmail />} />

            {/* 🧑‍💼 Company Dashboard Routes */}
            <Route
              path="/company-dashboard"
              element={
                <ProtectedRoute>
                  <VerifiedRoute>
                    <CompanyDashboard />
                  </VerifiedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard/profile"
              element={
                <ProtectedRoute>
                  <VerifiedRoute>
                    <CompanyProfile />
                  </VerifiedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard/newjob"
              element={
                <ProtectedRoute>
                  <VerifiedRoute>
                    <NewJobForm />
                  </VerifiedRoute>
                </ProtectedRoute>
              }
            />
            <Route
              path="/company-dashboard/notification"
              element={
                <ProtectedRoute>
                  <VerifiedRoute>
                    <CompanyNotification />
                  </VerifiedRoute>
                </ProtectedRoute>
              }
            />

            {/* 👨‍💻 Developer Dashboard Routes */}
            <Route
              path="/developer-dashboard"
              element={
                <DeveloperProtectedRoute>
                  <DeveloperDashboard />
                </DeveloperProtectedRoute>
              }
            />
            <Route
              path="/developer-dashboard/profile"
              element={
                <DeveloperProtectedRoute>
                  <DeveloperProfilePage />
                </DeveloperProtectedRoute>
              }
            />
            <Route
              path="/developer-dashboard/notification"
              element={
                <DeveloperProtectedRoute>
                  <DeveloperNotification />
                </DeveloperProtectedRoute>
              }
            />

            {/* ❌ 404 Page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
