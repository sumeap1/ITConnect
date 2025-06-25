import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Bell, Plus, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import api, { API_ENDPOINTS } from "@/config/api";

// ✅ InfoCard component
function InfoCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm text-center border border-[#d8ccc2]">
      <h4 className="text-lg font-semibold mb-2 tracking-wide uppercase">{title}</h4>
      <p className="text-sm text-gray-700">{description}</p>
    </div>
  );
}

// ✅ DeveloperCard component
function DeveloperCard({ developer, onViewProfile }: { developer: any; onViewProfile: (dev: any) => void }) {
  return (
    <div className="border p-4 rounded-lg bg-white shadow-sm border-[#d8ccc2]">
      <div className="flex items-center gap-4">
        <img
          src={developer.profilePicture || "/placeholder.png"}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h5 className="font-medium text-lg">{developer.fullName}</h5>
          <p className="text-sm text-gray-500">{developer.location}</p>
          <p className="text-sm text-gray-500">{developer.experienceYears} years experience</p>
          <div className="flex gap-2 mt-2 flex-wrap">
            {developer.technologies?.map((tech: string, i: number) => (
              <span key={i} className="bg-[#d8ccc2] text-[#2c2c2c] text-xs px-2 py-1 rounded-md">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-4">
        <Button variant="outline" onClick={() => onViewProfile(developer)}>View Profile</Button>
        <Button className="bg-[#2c2c2c] text-white" onClick={() => onViewProfile(developer)}>Invite</Button>
      </div>
    </div>
  );
}

export default function CompanyDashboard() {
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const navigate = useNavigate();

  const [positionTitle, setPositionTitle] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [interviewLocation, setInterviewLocation] = useState("");

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const res = await api.get("/developers/all-verified");
        setDevelopers(res.data);
      } catch (error) {
        console.error("Gabim në marrjen e zhvilluesve", error);
      }
    };
    fetchDevelopers();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("companyToken");
    if (!token) {
      navigate("/company-login");
    }
  }, [navigate]);

  const openProfile = (developer: any) => {
    setSelectedDeveloper(developer);
    setIsModalOpen(true);
  };

  const openInviteModal = () => {
    setShowInviteModal(true);
  };

  const closeInviteModal = () => {
    setShowInviteModal(false);
    setPositionTitle("");
    setInterviewDate("");
    setInterviewTime("");
    setInterviewLocation("");
  };

  const handleSendInvite = async () => {
    if (!selectedDeveloper) return;
    const companyName = localStorage.getItem("companyName") || "Kompania";
    if (!positionTitle || !interviewDate || !interviewTime || !interviewLocation) {
      alert("Ju lutem plotësoni të gjitha fushat!");
      return;
    }
    try {
      await api.post("/notifications/developer", {
        to: selectedDeveloper.email,
        type: "interview",
        companyName,
        positionTitle,
        interviewDate: `${interviewDate}T${interviewTime}`,
        interviewLocation,
      });
      alert("📨 Ftesa u dërgua me sukses!");
      closeInviteModal();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Gabim në dërgimin e njoftimit", err);
      alert("❌ Dështoi dërgimi i njoftimit.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("companyToken");
    navigate("/company-login");
  };

  return (
    <div className="min-h-screen bg-[#f5f0eb] text-[#2c2c2c] font-serif">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-[#d8ccc2] sticky top-0 bg-[#f5f0eb] z-10">
        <h1 className="text-2xl font-bold tracking-widest">ITConnect</h1>
        <div className="flex gap-4 items-center">
          <Button variant="ghost" onClick={() => navigate("/company-dashboard/newjob")}>
            <Plus className="w-5 h-5 mr-1" /> Add Job
          </Button>
          <Button variant="ghost" onClick={() => navigate("/company-dashboard/notification")}>
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" onClick={() => navigate("/company-dashboard/profile")}>
            <User className="w-5 h-5" />
          </Button>
          <Button variant="outline" onClick={handleLogout}>Logout</Button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center py-16 px-6 bg-[#f5f0eb] border-b border-[#d8ccc2]">
        <h2 className="text-3xl font-semibold mb-4 uppercase tracking-wide">I Have Several Service Offerings</h2>
        <p className="text-gray-600 mb-6 max-w-xl mx-auto">That may help your business grow fast!</p>
        <div className="max-w-md mx-auto">
          <Input placeholder="Search for 'React Developer', 'Node.js'..." className="bg-white border border-[#d8ccc2]" />
        </div>
      </section>

      {/* Info Cards */}
      <section className="grid md:grid-cols-3 gap-6 px-6 py-12 bg-[#f5f0eb]">
        <InfoCard title="💼 Branding" description="From $1400 - Helping you build brand identity with impact." />
        <InfoCard title="📚 Coaching" description="From $1400 - Personalized sessions to empower your business." />
        <InfoCard title="💻 Webdesign" description="From $1400 + Development - Crafting elegant digital experiences." />
      </section>

      {/* Developers List */}
      <section className="px-6 py-12 bg-[#f5f0eb]">
        <h3 className="text-xl font-semibold mb-4">Available Developers</h3>
        <div className="grid md:grid-cols-3 gap-6">
          {developers.length === 0 ? (
            <p>No developers found.</p>
          ) : (
            developers.map((dev, idx) => (
              <DeveloperCard key={idx} developer={dev} onViewProfile={openProfile} />
            ))
          )}
        </div>
      </section>

      {selectedDeveloper && (
        <div className="space-y-6">
          {/* Profili i Developerit */}
          <div className="flex items-center gap-4">
            <img
              src={selectedDeveloper.profilePicture || "/placeholder.png"}
              alt="Profile"
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <h2 className="text-lg font-semibold">{selectedDeveloper.fullName}</h2>
              <p className="text-sm text-gray-600">{selectedDeveloper.location || "Unknown"}</p>
              <p className="text-sm text-gray-500">{selectedDeveloper.experienceYears || 0} years experience</p>
            </div>
          </div>

          {/* Teknologjitë dhe Bio */}
          <div>
            <h4 className="font-medium mb-1">Technologies</h4>
            <div className="flex gap-2 flex-wrap">
              {selectedDeveloper.technologies?.map((tech: string, i: number) => (
                <span key={i} className="bg-[#d8ccc2] text-[#2c2c2c] text-xs px-2 py-1 rounded-md">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-1">About</h4>
            <p className="text-sm text-gray-700">{selectedDeveloper.bio || "Experienced developer..."}</p>
          </div>

          {/* Ftesa për Intervistë */}
          <div className="space-y-2 border-t pt-4 mt-4">
            <h3 className="text-sm font-semibold text-gray-700">Invite {selectedDeveloper.fullName} for Interview</h3>

            <Input
              placeholder="Position (e.g. Frontend Developer)"
              value={positionTitle}
              onChange={(e) => setPositionTitle(e.target.value)}
            />

            <div className="flex gap-2">
              <Input
                type="date"
                value={interviewDate}
                onChange={(e) => setInterviewDate(e.target.value)}
                className="w-1/2"
              />
              <Input
                type="time"
                value={interviewTime}
                onChange={(e) => setInterviewTime(e.target.value)}
                className="w-1/2"
              />
            </div>

            <Input
              placeholder="Meeting link (e.g. https://meet.google.com/...)"
              value={interviewLocation}
              onChange={(e) => setInterviewLocation(e.target.value)}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button className="bg-[#2c2c2c] text-white" onClick={openInviteModal}>
                📅 Invite to Interview
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="tracking-wide uppercase text-lg font-bold">Candidate Profile</DialogTitle>
          </DialogHeader>

          {selectedDeveloper && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={selectedDeveloper.profilePicture || "/placeholder.png"}
                  alt="Profile"
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-semibold">{selectedDeveloper.fullName}</h2>
                  <p className="text-sm text-gray-600">{selectedDeveloper.location || "Unknown"}</p>
                  <p className="text-sm text-gray-500">{selectedDeveloper.experienceYears || 0} years experience</p>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">Technologies</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedDeveloper.technologies?.map((tech: string, i: number) => (
                    <span key={i} className="bg-[#d8ccc2] text-[#2c2c2c] text-xs px-2 py-1 rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-1">About</h4>
                <p className="text-sm text-gray-700">{selectedDeveloper.bio || "Experienced developer..."}</p>
              </div>

              <div>
                <h4 className="font-medium mb-1">Contact</h4>
                <p className="text-sm text-gray-500">
                  Email:{" "}
                  <a href={`mailto:${selectedDeveloper.email}`} className="text-blue-600 underline">
                    {selectedDeveloper.email}
                  </a>
                </p>
              </div>

              <div className="flex gap-2 justify-end">
                {selectedDeveloper.cvUrl ? (
                  <a
                    href={selectedDeveloper.cvUrl}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 border rounded hover:bg-gray-100 text-sm"
                  >
                    Download CV
                  </a>
                ) : (
                  <Button variant="outline" disabled>
                    No CV
                  </Button>
                )}

                <Button variant="outline" asChild>
                  <a href={`mailto:${selectedDeveloper.email}`}>Contact</a>
                </Button>

                <Button className="bg-[#2c2c2c] text-white" onClick={openInviteModal}>
                  📅 Invite to Interview
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invite Modal */}
      {showInviteModal && (
        <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Invite {selectedDeveloper?.fullName} for Interview</DialogTitle>
            </DialogHeader>
            <Input
              placeholder="Position (e.g. Frontend Developer)"
              value={positionTitle}
              onChange={e => setPositionTitle(e.target.value)}
            />
            <div className="flex gap-2">
              <Input
                type="date"
                value={interviewDate}
                onChange={e => setInterviewDate(e.target.value)}
                className="w-1/2"
              />
              <Input
                type="time"
                value={interviewTime}
                onChange={e => setInterviewTime(e.target.value)}
                className="w-1/2"
              />
            </div>
            <Input
              placeholder="Meeting link (e.g. https://meet.google.com/...)"
              value={interviewLocation}
              onChange={e => setInterviewLocation(e.target.value)}
            />
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={closeInviteModal}>Cancel</Button>
              <Button className="bg-blue-600 text-white" onClick={handleSendInvite}>
                Send Invitation
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Footer */}
      <footer className="text-center py-8 bg-[#f5f0eb] border-t border-[#d8ccc2] mt-12">
        <p className="text-gray-600">
          © 2025 IT Conect. Back to <a className="underline" href="/">main site</a>.
        </p>
      </footer>
    </div>
  );
}

async function sendInterviewInvite({ to, positionTitle, interviewDate, interviewLocation }: { to: string; positionTitle: string; interviewDate: string; interviewLocation: string; }) {
  try {
    const res = await api.post("/company/invite", {
      to,
      positionTitle,
      interviewDate,
      interviewLocation,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
}

