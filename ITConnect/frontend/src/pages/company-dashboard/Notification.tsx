import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import api from "@/config/api";

interface Notification {
  _id: string;
  developerId: string;
  developerName: string;
  jobTitle: string;
}

interface Invite {
  _id: string;
  developerEmail: string;
  positionTitle: string;
  interviewDate: string;
  interviewTime: string;
  interviewLocation: string;
}

export default function CompanyNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDeveloper, setSelectedDeveloper] = useState<{
    id: string;
    jobTitle: string;
  }>({ id: "", jobTitle: "" });
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");
  const [invites, setInvites] = useState<Invite[]>([]);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingInvite, setEditingInvite] = useState<Invite | null>(null);
  const [editDate, setEditDate] = useState("");
  const [editLocation, setEditLocation] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const companyId = localStorage.getItem("companyId");
        if (!companyId) return;

        const res = await api.get(`/notifications/company/${companyId}`);
        setNotifications(Array.isArray(res.data.applications) ? res.data.applications : []);
      } catch (err) {
        console.error("Gabim gjatë marrjes së njoftimeve:", err);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    const fetchInvites = async () => {
      try {
        const companyEmail = localStorage.getItem("companyEmail");
        const res = await api.get(`/company/interview-invites?email=${companyEmail}`);
        setInvites(res.data);
      } catch (error) {
        console.error("Gabim në marrjen e ftesave", error);
      }
    };
    fetchInvites();
  }, []);

  const openInterviewModal = (developerId: string, jobTitle: string) => {
    setSelectedDeveloper({ id: developerId, jobTitle });
    setShowModal(true);
  };

  const sendInterviewInvite = async () => {
    const companyName = localStorage.getItem("companyName") || "Kompania";
    if (!interviewDate || !interviewLocation) {
      toast({ description: "Ju lutem plotësoni të gjitha fushat!" });
      return;
    }

    try {
      await api.post("/notifications/developer/send", {
        to: selectedDeveloper.id,
        type: "interview",
        positionTitle: selectedDeveloper.jobTitle,
        interviewDate,
        interviewLocation,
        companyName,
      });

      toast({ description: "Ftesa u dërgua me sukses 📩" });
      setShowModal(false);
      setInterviewDate("");
      setInterviewLocation("");
    } catch (err) {
      console.error("Gabim gjatë dërgimit të ftesës:", err);
      toast({ description: "Dështoi dërgimi i ftesës", variant: "destructive" });
    }
  };

  const handleReject = async (developerId: string, jobTitle: string) => {
    const companyName = localStorage.getItem("companyName") || "Kompania";

    try {
      await api.post("/notifications/developer/send", {
        to: developerId,
        type: "rejected",
        positionTitle: jobTitle,
        companyName,
      });

      toast({ description: "Kandidati u refuzua" });
    } catch (err) {
      console.error("Gabim gjatë refuzimit:", err);
      toast({ description: "Dështoi refuzimi", variant: "destructive" });
    }
  };

  const handleDelete = async (inviteId: string) => {
    try {
      await api.delete(`/company/invite/${inviteId}`);
      setInvites((prev) => prev.filter((i) => i._id !== inviteId));
      toast({ description: "❌ Ftesa u anulua" });
    } catch (err) {
      console.error("Gabim në anulimin e ftesës", err);
      toast({ description: "Dështoi anulimi i ftesës", variant: "destructive" });
    }
  };

  const openEditModal = (invite: Invite) => {
    setEditingInvite(invite);
    setEditDate(invite.interviewDate);
    setEditLocation(invite.interviewLocation);
    setEditModalOpen(true);
  };

  const handleEditSave = async () => {
    if (!editingInvite) return;
    try {
      await api.patch(`/company/invite/${editingInvite._id}`, {
        interviewDate: editDate,
        interviewLocation: editLocation,
      });
      setInvites((prev) =>
        prev.map((i) =>
          i._id === editingInvite._id
            ? { ...i, interviewDate: editDate, interviewLocation: editLocation }
            : i
        )
      );
      setEditModalOpen(false);
      toast({ description: "Ftesa u përditësua!" });
    } catch (err) {
      toast({ description: "Gabim gjatë përditësimit të ftesës", variant: "destructive" });
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">
        Njoftimet e Aplikimeve
      </h1>

      {notifications.length === 0 ? (
        <p className="text-gray-600">Nuk ka ende aplikime.</p>
      ) : (
        notifications.map((n) => (
          <Card key={n._id} className="border border-gray-300 rounded-2xl">
            <CardContent className="p-4">
              <h3 className="font-semibold text-lg mb-2">
                {n.developerName} ka aplikuar për pozitën{" "}
                <b>{n.jobTitle}</b>
              </h3>

              <div className="flex gap-3 flex-wrap">
                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(`/company-dashboard/developer-profile/${n.developerId}`)
                  }
                >
                  Shiko Profilin
                </Button>

                <Button
                  className="bg-blue-600 text-white"
                  onClick={() => openInterviewModal(n.developerId, n.jobTitle)}
                >
                  Fto në Intervistë
                </Button>

                <Button
                  variant="destructive"
                  onClick={() => handleReject(n.developerId, n.jobTitle)}
                >
                  Refuzo
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}

      {/* Modal për ftesë në intervistë */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Fto për Intervistë për pozitën <b>{selectedDeveloper.jobTitle}</b>
            </DialogTitle>
          </DialogHeader>

          <Input
            placeholder="Data e intervistës (p.sh. 2025-06-24)"
            value={interviewDate}
            onChange={(e) => setInterviewDate(e.target.value)}
          />
          <Input
            placeholder="Link ose lokacion (p.sh. https://meet.google.com/... ose adresë)"
            value={interviewLocation}
            onChange={(e) => setInterviewLocation(e.target.value)}
          />

          <Button className="bg-blue-600 text-white w-full mt-3" onClick={sendInterviewInvite}>
            Dërgo Ftesën
          </Button>
        </DialogContent>
      </Dialog>

      <h1 className="text-2xl font-semibold text-gray-800 mb-4 mt-6">
        Ftesat për Intervistë
      </h1>
      {invites.length === 0 ? (
        <p className="text-gray-600">Nuk ka ende ftesa për intervistë.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {invites.map((invite) => (
            <Card key={invite._id} className="bg-white p-4 rounded-xl border border-[#d8ccc2] shadow-sm">
              <CardContent>
                <h4 className="font-semibold text-lg mb-1">🎯 {invite.positionTitle}</h4>
                <p className="text-sm text-gray-700 mb-1">👤 {invite.developerEmail}</p>
                <p className="text-sm text-gray-700 mb-1">📅 {invite.interviewDate}</p>
                <p className="text-sm text-gray-700 mb-2">📍 {invite.interviewLocation}</p>
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" onClick={() => handleDelete(invite._id)}>Anulo</Button>
                  <Button variant="secondary" onClick={() => openEditModal(invite)}>Edito</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Modal për editim të ftesës */}
      <Dialog open={editModalOpen} onOpenChange={setEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edito Ftesën për Intervistë</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Data e intervistës"
            value={editDate}
            onChange={(e) => setEditDate(e.target.value)}
          />
          <Input
            placeholder="Link ose lokacion"
            value={editLocation}
            onChange={(e) => setEditLocation(e.target.value)}
          />
          <Button className="bg-blue-600 text-white w-full mt-3" onClick={handleEditSave}>
            Ruaj Ndryshimet
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
