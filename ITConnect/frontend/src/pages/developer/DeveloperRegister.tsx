import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function DeveloperRegister() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    location: "",
    experience: "",
    github: "",
    linkedin: "",
    skills: "", // ✅ renamed from technologies
  });

  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Password mismatch",
        description: "Passwords do not match.",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register-developer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          bio: formData.bio,
          location: formData.location,
          experience: formData.experience,
          github: formData.github,
          linkedin: formData.linkedin,
          skills: formData.skills
            .split(",")
            .map((tech) => tech.trim())
            .filter((tech) => tech !== ""), // ✅ required field for backend
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        let message = "Registration failed.";
        if (data.error?.includes("duplicate key") && data.error?.includes("email")) {
          message = "This email is already registered.";
        } else if (data.error?.includes("experience")) {
          message = "Experience is required.";
        } else if (data.error) {
          message = data.error;
        }

        toast({
          variant: "destructive",
          title: "Error",
          description: message,
        });
        return;
      }

      toast({
        title: "Success",
        description: "Registration successful! Please verify your email.",
      });

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        bio: "",
        location: "",
        experience: "",
        github: "",
        linkedin: "",
        skills: "", // reset
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Registration failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Developer Registration</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
              className="bg-transparent"
            />
            <Input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
              className="bg-transparent"
            />
          </div>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
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
          <Input
            name="bio"
            type="text"
            placeholder="Bio"
            value={formData.bio}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <Input
            name="location"
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={handleChange}
            required
            className="bg-transparent"
          />
          <select
            name="experience"
            value={formData.experience}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full bg-transparent"
          >
            <option value="">Select Experience Level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <Input
            name="github"
            type="url"
            placeholder="GitHub URL (optional)"
            value={formData.github}
            onChange={handleChange}
            className="bg-transparent"
          />
          <Input
            name="linkedin"
            type="url"
            placeholder="LinkedIn URL (optional)"
            value={formData.linkedin}
            onChange={handleChange}
            className="bg-transparent"
          />
          <Input
            name="skills"
            type="text"
            placeholder="Technologies (comma separated)"
            value={formData.skills}
            onChange={handleChange}
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
          <Link to="/developer-login" className="text-[#14181F] hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
