// src/pages/CompanyDashboard/CompanyProfile.tsx

import { useEffect, useState } from "react";
import api from "@/config/api";
import { Button } from "@/components/ui/button";

import EditProfileModal from "./EditProfileModal";

export default function CompanyProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [openModal, setOpenModal] = useState(false);
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    // Try to get companyId from backend token (if available)
    const token = localStorage.getItem("companyToken");
    if (!token) {
      setCompanyId(null);
      return;
    }
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setCompanyId(payload.id || payload._id || null);
    } catch (e) {
      setCompanyId(null);
    }
  }, []);

  useEffect(() => {
    if (!companyId) return;
    const fetchProfile = async () => {
      try {
        const res = await api.get(`/companies/profile/${companyId}`);
        const data = res.data;
        console.log("DATA NGA BACKEND:", data);
        setProfile({
          companyName: data.companyName || "",
          businessNumber: data.businessNumber || "",
          website: data.website || "",
          location: data.location || "",
          linkedIn: data.linkedIn || "",
          shortBio: data.shortBio || "",
          mission: data.mission || "",
          values: data.values || "",
          logoUrl: data.logoUrl || "",
          email: data.email || "",
          isVerified: data.isVerified || false,
          isEmailVerified: data.isEmailVerified || false,
        });
      } catch (err) {
        console.error("Gabim gjatë marrjes së profilit:", err);
      }
    };
    fetchProfile();
  }, [companyId]);

  if (!companyId) return <div className="p-8 text-center text-gray-500">Ju lutem bëni login si kompani.</div>;

  if (!profile) return <div className="p-8 text-center text-gray-500">Duke ngarkuar profilin...</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-[#2c2c2c] flex items-center gap-2">
          <span role="img" aria-label="folder">📁</span> Profili i Kompanisë
        </h1>
        <Button className="bg-[#2c2c2c] text-white hover:bg-[#1f1f1f] px-6 py-2 rounded-lg shadow" onClick={() => setOpenModal(true)}>
          <span role="img" aria-label="edit">🛠️</span> Ndrysho Profilin
        </Button>
      </div>

      {/* Main Card */}
      <div className="bg-white border border-[#e5e7eb] rounded-2xl shadow-lg p-6 md:p-10 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          <img
            src={profile.logoUrl || "/placeholder-logo.png"}
            alt="Logo"
            className="w-32 h-32 object-contain border rounded-xl bg-[#f5f0eb] shadow"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-semibold text-[#2c2c2c]">{profile.companyName || <span className="text-gray-400">Emri i kompanisë</span>}</h2>
            <p className="text-gray-500 flex items-center gap-2"><span role="img" aria-label="location">📍</span> {profile.location || <span className="text-gray-400">Lokacioni</span>}</p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><span role="img" aria-label="business">📇</span> Business Nr: {profile.businessNumber || <span className="text-gray-400">-</span>}</p>
            <p className="text-sm text-gray-500 flex items-center gap-2"><span role="img" aria-label="email">✉️</span> {profile.email || <span className="text-gray-400">Email</span>}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 text-base">
          <div className="space-y-3">
            <p>
              <span className="font-semibold">🌐 Website:</span>{" "}
              {profile.website ? (
                <a href={profile.website} className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
                  {profile.website}
                </a>
              ) : <span className="text-gray-400">Nuk ka website.</span>}
            </p>
            <p>
              <span className="font-semibold">🔗 LinkedIn:</span>{" "}
              {profile.linkedIn ? (
                <a href={profile.linkedIn} className="underline text-blue-600" target="_blank" rel="noopener noreferrer">
                  {profile.linkedIn}
                </a>
              ) : <span className="text-gray-400">Nuk ka LinkedIn.</span>}
            </p>
            <p>
              <span className="font-semibold">📜 Bio:</span> {profile.shortBio || <span className="text-gray-400">Nuk ka bio.</span>}
            </p>
          </div>
          <div className="space-y-3">
            <p>
              <span className="font-semibold">🎯 Misioni:</span> {profile.mission || <span className="text-gray-400">Nuk ka mision.</span>}
            </p>
            <p>
              <span className="font-semibold">💡 Vlerat:</span> {profile.values || <span className="text-gray-400">Nuk ka vlera.</span>}
            </p>
          </div>
        </div>
      </div>

      {/* Social Media Links */}
      {(profile.socialMedia?.instagram || profile.socialMedia?.facebook) && (
        <div className="bg-white border border-[#d8ccc2] rounded-xl shadow-md mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">📱 Rrjetet Sociale</h3>
          <div className="space-y-2 text-sm">
            {profile.socialMedia?.instagram && (
              <p>
                <span className="font-semibold">📸 Instagram:</span>{" "}
                <a href={profile.socialMedia.instagram} className="text-blue-600 underline" target="_blank">
                  {profile.socialMedia.instagram}
                </a>
              </p>
            )}
            {profile.socialMedia?.facebook && (
              <p>
                <span className="font-semibold">📘 Facebook:</span>{" "}
                <a href={profile.socialMedia.facebook} className="text-blue-600 underline" target="_blank">
                  {profile.socialMedia.facebook}
                </a>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Management Team */}
      {profile.managers?.length > 0 && (
        <div className="bg-white border border-[#d8ccc2] rounded-xl shadow-md mt-6 p-6">
          <h3 className="text-lg font-semibold mb-4">👥 Ekipi Menaxhues</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {profile.managers.map(
              (
                m: { photoUrl: string; name: string; position: string; linkedInUrl?: string },
                idx: number
              ) => (
                <div key={idx} className="p-4 border rounded-lg shadow text-center">
                  <img
                    src={m.photoUrl || "/placeholder-user.png"}
                    alt={m.name}
                    className="w-16 h-16 rounded-full object-cover mx-auto mb-2"
                  />
                  <p className="font-medium">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.position}</p>
                  {m.linkedInUrl && (
                    <a
                      href={m.linkedInUrl}
                      className="text-blue-500 text-sm underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      LinkedIn
                    </a>
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}

      {/* Modal për ndryshim profili */}
      <EditProfileModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        profile={profile}
        refresh={() => window.location.reload()}
      />
    </div>
  );
}
