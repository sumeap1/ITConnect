import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginCompany } from "@/api/company";
import api from "@/config/api";

export default function CompanyLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await loginCompany({ email, password });
      const { token, company } = response;

      // ✅ Ruaj të dhënat në localStorage
      localStorage.setItem("companyToken", token);
      localStorage.setItem("userType", "company");
      localStorage.setItem("companyName", company.companyName);
      localStorage.setItem("companyEmail", company.email);
      localStorage.setItem("companyVerified", company.isVerified ? "true" : "false");
      localStorage.setItem("companyId", company.id);

      toast({
        title: "Login Successful",
        description: `Welcome back, ${company.companyName}!`,
      });

      // Redirekto te dashboardi
      navigate("/company-dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error?.response?.data?.message ||
          error?.message ||
          "Login failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    const isVerified = localStorage.getItem("companyVerified") === "true";

    if (!token) {
      navigate("/company-login", { replace: true });
    } else if (!isVerified) {
      navigate("/verification-pending", { replace: true });
    }
  }, [navigate]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto mt-10">
      <h2 className="text-xl font-bold text-center">Company Login</h2>

      <Input
        type="email"
        placeholder="Company Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={isLoading}
      />
      <Input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        disabled={isLoading}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading ? "Logging in..." : "Login"}
      </Button>

      <p className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/company-register" className="underline font-medium">
          Register here
        </Link>
      </p>
    </form>
  );
}
