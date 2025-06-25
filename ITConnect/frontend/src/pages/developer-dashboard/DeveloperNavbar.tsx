import { Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-white border-b z-50 shadow-sm px-6 py-3 flex justify-center">
      <div className="w-[200px] flex justify-between items-center space-x-4">
        <button className="relative">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">3</span>
        </button>

        <Link to="/developer-dashboard/profile">
          <User className="w-5 h-5 text-gray-600" />
        </Link>
      </div>
    </nav>
  );
}
