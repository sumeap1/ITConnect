// src/components/NavbarCompany.tsx

import { useNavigate } from "react-router-dom";
import { Bell, Plus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NavbarCompany() {
  const navigate = useNavigate();

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b border-[#d8ccc2] sticky top-0 bg-[#f5f0eb] z-10">
      <h1 className="text-2xl font-bold tracking-widest">ITConnect</h1>
      
      <div className="flex gap-4 items-center">
        <Button variant="ghost" onClick={() => navigate("/company-dashboard/newjob")}> 
          <Plus className="w-5 h-5 mr-1" /> Add Job
        </Button>

        <Button variant="ghost" onClick={() => navigate("/company-dashboard/notifications")}> 
          <Bell className="w-5 h-5" />
        </Button>

        <Button variant="ghost" onClick={() => navigate("/company-dashboard/profile")}> 
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
}
