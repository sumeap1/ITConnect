import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";

export default function DeveloperLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await api.post("/authcontroller/login-developer", { email, password }) as {
        data: {
          token: string;
          developerId: string;
          developerName: string;
          isVerified: boolean | string;
          email: string;
        };
      };

      const {
        token,
        developerId,
        developerName,
        isVerified,
        email: developerEmail,
      } = response.data;

      console.log("Login response:", response.data);

      // ✅ Ruaj në localStorage
      localStorage.setItem("developerToken", token);
      localStorage.setItem("developerId", developerId);
      localStorage.setItem("developerName", developerName);
      localStorage.setItem("developerEmail", developerEmail);
      localStorage.setItem("developerVerified", isVerified.toString());

      // ✅ Verifikim
      if (isVerified === true || isVerified === "true") {
        toast({ description: "Mirë se u riktheve! 🚀" });
        navigate("/developer-dashboard");
      } else {
        toast({ description: "Ju lutem verifikoni email-in tuaj 📩" });
        navigate("/verification-pending");
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Login Failed",
        description:
          error?.response?.data?.message || "Login dështoi. Kontrollo kredencialet!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Developer Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-transparent"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-transparent"
          />
          <Button
            type="submit"
            className="w-full bg-[#14181F] text-white hover:bg-[#14181F]/90"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        <p className="text-center mt-4 text-stone-600">
          Don't have an account?{" "}
          <Link to="/developer-register" className="text-[#14181F] hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
