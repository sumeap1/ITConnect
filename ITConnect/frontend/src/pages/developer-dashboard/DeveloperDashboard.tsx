import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, User } from "lucide-react";
import api from "@/config/api";
import { toast } from "sonner";
import { applyToJob } from "@/services/developerService";
import axios from "axios";

export default function DeveloperDashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get("/jobs");
        setJobs(res.data);
      } catch (err) {
        console.error("❌ Failed to fetch jobs", err);
      }
    };

    fetchJobs();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("developerToken");
    if (!token) {
      navigate("/developer-login");
    }
  }, [navigate]);

  const handleApply = async (jobId: string) => {
    console.log("Applying to jobId (handleApply):", jobId);
    try {
      await applyToJob(jobId);
    } catch (error: any) {
      if (error?.response?.status === 403) {
        toast.error("❌ Nuk jeni të autorizuar për të aplikuar. Verifikohuni.");
      } else {
        toast.error("❌ Aplikimi dështoi.");
        console.error(error);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("developerToken");
    localStorage.removeItem("companyToken");
    navigate("/developer-login");
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] text-[#2c2c2c] font-serif">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#d8ccc2] bg-[#f5f0eb] sticky top-0 z-10">
        <h1 className="text-2xl font-bold tracking-widest">ITCi</h1>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" onClick={() => navigate("/developer-dashboard/notification")}>
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => navigate("/developer-dashboard/profile")}>
            <User className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={() => {
            localStorage.removeItem("developerToken");
            localStorage.removeItem("companyToken");
            window.location.reload();
          }}>Logout </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-6 border-b border-[#d8ccc2] bg-[#f5f0eb]">
        <h2 className="text-3xl font-semibold mb-4 uppercase tracking-wide">
          Find Your Next Tech Role
        </h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">
          Browse freelance and full-time opportunities tailored for developers.
        </p>
        <div className="max-w-md mx-auto">
          <Input placeholder="Search for 'Frontend', 'Fullstack', 'Remote'..." className="bg-white border border-[#d8ccc2]" />
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 bg-[#f5f0eb]">
        <InfoCard title="💼 Freelance" description="High-paying freelance gigs available now." />
        <InfoCard title="🏢 Full-Time" description="Stable long-term job positions from top tech firms." />
        <InfoCard title="🌐 Remote" description="Remote roles so you can work from anywhere." />
      </section>

      {/* Jobs */}
      <section className="px-6 py-12 bg-white border-y border-[#d8ccc2]">
        <h3 className="text-2xl font-semibold mb-6">Latest Jobs</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job: any, idx: number) => (
            <JobCard key={idx} job={job} onApply={handleApply} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-8 bg-[#f5f0eb] border-t border-[#d8ccc2] mt-12">
        <p className="text-gray-600">© 2025 IT Conect. Back to <a className="underline" href="/">main site</a>.</p>
      </footer>
    </div>
  );
}

function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-[#d8ccc2]">
      <h4 className="text-lg font-semibold mb-2 tracking-wide uppercase">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

function JobCard({ job, onApply }: { job: any; onApply: (jobId: string) => void }) {
  console.log("JobCard job:", job);

  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm border-[#d8ccc2]">
      <h5 className="font-medium text-lg mb-1">{job.title}</h5>
      <p className="text-sm text-gray-500 mb-1">{job.companyName}</p>
      <p className="text-sm text-gray-600 mb-2">{job.location || "Remote"}</p>
      <div className="flex gap-2 mb-2 flex-wrap">
        {job.technologies?.map((tech: string, i: number) => (
          <span key={i} className="bg-[#d8ccc2] text-[#2c2c2c] text-xs px-2 py-1 rounded-md">{tech}</span>
        ))}
      </div>
      <p className="text-sm text-gray-700 mb-3 line-clamp-3">{job.description}</p>
      <div className="flex justify-end">
      <Button onClick={() => {
        console.log("Apply clicked for job:", job);
        onApply(job.id);
      }}>Apliko</Button>
      </div>
    </div>
  );
}

function decodeJWT(token: string) {
  if (!token) return null;
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    return null;
  }
}
