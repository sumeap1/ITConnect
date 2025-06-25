import { useEffect, useState } from "react";
import api from "@/config/api";
import { Mail, XCircle, Calendar, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Notification {
  _id: string;
  to: string;
  type: "interview" | "rejected";
  companyName: string;
  positionTitle: string;
  interviewDate?: string;
  interviewLocation?: string;
  createdAt: string;
}

export default function DeveloperNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("developerToken");
    if (!token) {
      navigate("/developer-login");
    }
  }, [navigate]);

  useEffect(() => {
    const email = localStorage.getItem("developerEmail");
    if (!email) return;

    const fetchNotifications = async () => {
      try {
        const res = await api.get(`/notifications/developer?email=${email}`);
        setNotifications(res.data);
      } catch (err) {
        console.error("Gabim gjatë marrjes së njoftimeve:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0EB] p-6">
      <h1 className="text-2xl font-bold text-[#1E1E1E] mb-6">🔔 Njoftimet e tua</h1>

      <div className="space-y-4">
        {notifications.length === 0 && (
          <div className="text-gray-600">Nuk ka ende njoftime.</div>
        )}

        {notifications.map((notif) => (
          <div
            key={notif._id}
            className={`p-4 rounded-xl shadow border transition-all duration-300 ${
              notif.type === "interview"
                ? "border-[#D4C3B4] bg-white"
                : "border-red-300 bg-red-50"
            }`}
          >
            <div className="flex items-center gap-3 mb-2">
              {notif.type === "interview" ? (
                <Mail className="text-[#5F4B3B]" />
              ) : (
                <XCircle className="text-red-500" />
              )}
              <span className="font-semibold text-[#1E1E1E]">
                {notif.type === "interview"
                  ? `📩 Ftesë për intervistë nga ${notif.companyName}`
                  : `❌ Refuzim nga ${notif.companyName}`}
              </span>
            </div>

            <div className="ml-7 text-sm text-gray-700">
              <p>
                Pozita:{" "}
                <span className="font-medium">{notif.positionTitle}</span>
              </p>

              {notif.type === "interview" && (
                <>
                  <p className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" />
                    {notif.interviewDate || "Data nuk është caktuar"}
                  </p>
                  <p className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4" />
                    {notif.interviewLocation || "Lokacioni/Link nuk është caktuar"}
                  </p>
                </>
              )}

              {notif.type === "rejected" && (
                <p className="mt-1 italic text-red-600">
                  Me vjen keq, jeni refuzuar për këtë pozitë.
                </p>
              )}
            </div>

            <div className="text-xs text-right text-gray-400 mt-2">
              {new Date(notif.createdAt).toLocaleString("sq-AL", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
