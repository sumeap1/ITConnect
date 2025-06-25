import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import api from "@/config/api";

interface Invite {
  _id: string;
  developerEmail: string;
  positionTitle: string;
  interviewDate: string;
  interviewTime: string;
  interviewLocation: string;
}

export default function InterviewInvites() {
  const [invites, setInvites] = useState<Invite[]>([]);

  const fetchInvites = async () => {
    try {
      const companyEmail = localStorage.getItem("companyEmail");
      const res = await api.get(`/company/interview-invites?email=${companyEmail}`);
      setInvites(res.data);
    } catch (error) {
      console.error("Gabim në marrjen e ftesave", error);
    }
  };

  const handleSend = async (
    inviteId: string,
    developerEmail: string,
    positionTitle: string,
    interviewDate: string,
    interviewLocation: string
  ) => {
    try {
      const companyName = localStorage.getItem("companyName") || "Kompania";
      await api.post("/notifications/developer", {
        to: developerEmail,
        type: "interview",
        companyName,
        positionTitle,
        interviewDate,
        interviewLocation,
      });
      alert("📨 Ftesa u dërgua me sukses!");
    } catch (err) {
      console.error("Gabim në dërgimin e ftesës", err);
      alert("❌ Dështoi dërgimi i ftesës");
    }
  };

  const handleDelete = async (inviteId: string) => {
    try {
      await api.delete(`/company/invite/${inviteId}`);
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
      alert("❌ Ftesa u anulua");
    } catch (err) {
      console.error("Gabim në anulimin e ftesës", err);
    }
  };

  useEffect(() => {
    fetchInvites();
  }, []);

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {invites.map((invite) => (
        <div key={invite._id} className="bg-white p-4 rounded-xl border border-[#d8ccc2] shadow-sm">
          <h4 className="font-semibold text-lg mb-1">🎯 {invite.positionTitle}</h4>
          <p className="text-sm text-gray-700 mb-1">👤 {invite.developerEmail}</p>
          <p className="text-sm text-gray-700 mb-1">📅 {invite.interviewDate}</p>
          <p className="text-sm text-gray-700 mb-2">📍 {invite.interviewLocation}</p>
          <div className="flex justify-end gap-2 mt-2">
            <Button variant="outline" onClick={() => handleDelete(invite._id)}>Anulo</Button>
            <Button className="bg-[#2c2c2c] text-white" onClick={() => handleSend(
              invite._id,
              invite.developerEmail,
              invite.positionTitle,
              invite.interviewDate,
              invite.interviewLocation
            )}>
              Dërgo
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
