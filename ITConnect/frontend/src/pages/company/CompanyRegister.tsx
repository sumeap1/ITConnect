import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { registerCompany as registerCompanyApi } from "@/api/company"; // përdor API të vërtetë

export default function CompanyRegister() {
  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
    website: "",
    businessNumber: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  console.log('Request body:', formData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };



  const validateForm = () => {
    if (!formData.companyName.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Company name is required.",
      });
      return false;
    }

    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a valid email address.",
      });
      return false;
    }

    if (!formData.website.trim() || !/^https?:\/\/\S+\.\S+/.test(formData.website)) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please enter a valid website URL (starting with http:// or https://).",
      });
      return false;
    }

    if (!formData.businessNumber.trim()) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Business number (NIPT) is required.",
      });
      return false;
    }

    if (formData.password.length < 8) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Password must be at least 8 characters long.",
      });
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Passwords do not match.",
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!validateForm()) return;
    setIsLoading(true);
  
    try {
      const response = await registerCompanyApi({
        companyName: formData.companyName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        website: formData.website.trim(),
        businessNumber: formData.businessNumber.trim(),
        confirmPassword: formData.confirmPassword,
      });
  
      if (!response || !response.company || !response.company._id) {
        throw new Error("Registration failed. Please try again later.");
      }
  
      // ✅ Ruaj companyId në localStorage pas regjistrimit
      localStorage.setItem("companyId", response.company._id);
  
      toast({
        title: "Registration Successful",
        description: "Please check your email for verification instructions.",
      });
  
      navigate('/verification-pending');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: error?.response?.data?.message || error.message || "An unexpected error occurred.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Company Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="email"
            type="email"
            placeholder="Company Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="website"
            type="url"
            placeholder="Company Website (e.g., https://example.com)"
            value={formData.website}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="businessNumber"
            placeholder="Business Number (NIPT)"
            value={formData.businessNumber}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password (min. 8 characters)"
            value={formData.password}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Button
            type="submit"
            className="w-full bg-[#14181F] text-white hover:bg-[#14181F]/90"
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </Button>
        </form>
        <p className="text-center mt-4 text-stone">
          Already have an account?{" "}
          <Link to="/company-login" className="text-[#14181F] hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
