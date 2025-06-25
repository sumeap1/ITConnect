// src/pages/developer-dashboard/profile.tsx

import { useEffect, useState, useRef, ChangeEvent } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { BarChart3, CheckCircle2, Eye } from "lucide-react";
import api from "@/config/api";

const TECHNOLOGIES = [
  "React", "Node.js", "Python", "Java", "C#", "TypeScript", "Vue", "Angular", "SQL", "MongoDB"
];

interface Experience {
  position: string;
  company: string;
  period: string;
  description: string;
}
interface Education {
  university: string;
  field: string;
  date: string;
}
interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  profilePhoto: File | null;
  profilePhotoUrl: string;
  cv: File | null;
  cvUrl: string;
}
interface AboutInfo {
  title: string;
  bio: string;
  technologies: string[];
  experienceLevel: string;
  availability: string;
  github: string;
  linkedin: string;
}
interface Stats {
  applicationsMade: number;
  positionsAccepted: number;
  profileViews: number;
}

export default function DeveloperProfilePage() {
  const isVerified = localStorage.getItem("developerVerified") === "true";
  const navigate = useNavigate();

  const [personal, setPersonal] = useState<PersonalInfo>({
    name: "",
    email: "",
    phone: "",
    location: "",
    profilePhoto: null,
    profilePhotoUrl: "",
    cv: null,
    cvUrl: "",
  });

  const [about, setAbout] = useState<AboutInfo>({
    title: "",
    bio: "",
    technologies: [],
    experienceLevel: "",
    availability: "",
    github: "",
    linkedin: "",
  });

  const [experiences, setExperiences] = useState<Experience[]>([{ position: "", company: "", period: "", description: "" }]);
  const [educationList, setEducationList] = useState<Education[]>([{ university: "", field: "", date: "" }]);
  const [stats, setStats] = useState<Stats | null>(null);

  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const cvInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("developerToken");
    if (!token) {
      navigate("/developer-login");
    }
  }, [navigate]);

  useEffect(() => {
    const email = localStorage.getItem("developerEmail");
    if (!email) return;

    const fetchProfile = async () => {
      try {
        const res = await api.get(`/developer/profile?email=${email}`);
        const data = res.data;
        if (!data.success || !data.developer) return;
        const dev = data.developer;
        setPersonal({
          name: dev.name || dev.firstName || "",
          email: dev.email || "",
          phone: dev.phone || "",
          location: dev.location || "",
          profilePhoto: null,
          profilePhotoUrl: dev.profilePhotoUrl || "",
          cv: null,
          cvUrl: dev.cvUrl || "",
        });
        setAbout({
          title: dev.title || "",
          bio: dev.bio || "",
          technologies: dev.technologies || dev.skills || [],
          experienceLevel: dev.experienceLevel || dev.experience || "",
          availability: dev.availability || "",
          github: dev.github || "",
          linkedin: dev.linkedin || "",
        });
        setExperiences(dev.experiences || [{ position: "", company: "", period: "", description: "" }]);
        setEducationList(dev.education || [{ university: "", field: "", date: "" }]);
      } catch (err) {
        console.error("Gabim gjatë marrjes së profilit:", err);
      }
    };

    const fetchStats = async () => {
      try {
        const res = await api.get(`/developer/stats?email=${email}`);
        setStats(res.data);
      } catch (err) {
        console.error("Gabim gjatë statistikave:", err);
      }
    };

    fetchProfile();
    fetchStats();
  }, []);

  const handlePersonalChange = (field: keyof PersonalInfo, value: string) =>
    setPersonal(p => ({ ...p, [field]: value }));

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setPersonal(p => ({ ...p, profilePhoto: file, profilePhotoUrl: URL.createObjectURL(file) }));
  };

  const handleCVChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) setPersonal(p => ({ ...p, cv: file, cvUrl: file.name }));
  };

  const handleSavePersonal = async () => {
    const formData = new FormData();
    Object.entries(personal).forEach(([k, v]) => {
      if (v && (k === "profilePhoto" || k === "cv")) {
        formData.append(k, v);
      } else {
        formData.append(k, v as string);
      }
    });
    if (!formData.get("email")) {
      const email = localStorage.getItem("developerEmail");
      if (email) formData.append("email", email);
    }
    await api.post("/developer/profile/personal", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    alert("Të dhënat personale u ruajtën!");
  };

  const handleSaveAbout = async () => {
    const email = localStorage.getItem("developerEmail");
    if (!email) return;

    try {
      await api.put("/developer/profile/about", {
        ...about,
        email,
      });
      alert("Të dhënat profesionale u ruajtën me sukses!");
    } catch (err) {
      console.error("Gabim në ruajtjen e 'about':", err);
      alert("Ndodhi një gabim.");
    }
  };

  const handleSaveExperience = async () => {
    const email = localStorage.getItem("developerEmail");
    if (!email) return;

    try {
      await api.put("/developer/profile/experience", { email, experiences });
      alert("Përvojat u ruajtën!");
    } catch (err) {
      console.error("Gabim gjatë ruajtjes së përvojave:", err);
      alert("Gabim gjatë ruajtjes së përvojave.");
    }
  };

  const handleSaveEducation = async () => {
    const email = localStorage.getItem("developerEmail");
    if (!email) return;

    try {
      await api.put("/developer/profile/education", { email, education: educationList });
      alert("Edukimi u ruajt!");
    } catch (err) {
      console.error("Gabim gjatë ruajtjes së edukimit:", err);
      alert("Gabim gjatë ruajtjes së edukimit.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f3ee] p-8">
      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Të Dhënat Personale</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Emri i plotë" value={personal.name} onChange={(e) => handlePersonalChange("name", e.target.value)} />
          <Input placeholder="Email" value={personal.email} disabled />
          <Input placeholder="Numri i telefonit" value={personal.phone} onChange={(e) => handlePersonalChange("phone", e.target.value)} />
          <Input placeholder="Lokacioni" value={personal.location} onChange={(e) => handlePersonalChange("location", e.target.value)} />
        </div>

        <div className="flex gap-4 mt-4">
          <input ref={photoInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          <Button onClick={() => photoInputRef.current?.click()} className="bg-blue-600 text-white">Ngarko Foto</Button>

          <input ref={cvInputRef} type="file" accept=".pdf,.doc,.docx" className="hidden" onChange={handleCVChange} />
          <Button onClick={() => cvInputRef.current?.click()} className="bg-green-600 text-white">Ngarko CV</Button>
        </div>

        <Button onClick={handleSavePersonal} className="mt-4 bg-emerald-600 text-white">Ruaj të Dhënat</Button>
      </div>

      {/* About Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Rreth Jush</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input placeholder="Titulli profesional" value={about.title} onChange={(e) => setAbout({ ...about, title: e.target.value })} />
          <select value={about.experienceLevel} onChange={(e) => setAbout({ ...about, experienceLevel: e.target.value })} className="border p-2 rounded">
            <option value="">Niveli i eksperiencës</option>
            <option value="Junior">Junior</option>
            <option value="Mid">Mid</option>
            <option value="Senior">Senior</option>
          </select>
        </div>

        <Textarea placeholder="Bio profesionale" value={about.bio} rows={4} className="mt-4" onChange={(e) => setAbout({ ...about, bio: e.target.value })} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Input placeholder="GitHub" value={about.github} onChange={(e) => setAbout({ ...about, github: e.target.value })} />
          <Input placeholder="LinkedIn" value={about.linkedin} onChange={(e) => setAbout({ ...about, linkedin: e.target.value })} />
        </div>

        <select value={about.availability} onChange={(e) => setAbout({ ...about, availability: e.target.value })} className="border p-2 rounded mt-4">
          <option value="">Disponueshmëria</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Freelance">Freelance</option>
        </select>

        <div className="mt-4">
          <label className="block mb-1 font-medium">Teknologjitë</label>
          <div className="flex flex-wrap gap-2">
            {TECHNOLOGIES.map((tech) => (
              <button
                key={tech}
                className={`px-3 py-1 rounded border ${
                  about.technologies.includes(tech) ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  setAbout((prev) => ({
                    ...prev,
                    technologies: prev.technologies.includes(tech)
                      ? prev.technologies.filter(t => t !== tech)
                      : [...prev.technologies, tech],
                  }));
                }}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <Button className="mt-4 bg-blue-600 text-white" onClick={handleSaveAbout}>Ruaj Rreth Jush</Button>
      </div>

      {/* Experience Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Përvojat Profesionale</h2>
        {experiences.map((exp, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
            <Input placeholder="Pozita" value={exp.position} onChange={(e) => {
              const updated = [...experiences];
              updated[idx].position = e.target.value;
              setExperiences(updated);
            }} />
            <Input placeholder="Kompania" value={exp.company} onChange={(e) => {
              const updated = [...experiences];
              updated[idx].company = e.target.value;
              setExperiences(updated);
            }} />
            <Input placeholder="Periudha" value={exp.period} onChange={(e) => {
              const updated = [...experiences];
              updated[idx].period = e.target.value;
              setExperiences(updated);
            }} />
            <Textarea placeholder="Përshkrimi" value={exp.description} onChange={(e) => {
              const updated = [...experiences];
              updated[idx].description = e.target.value;
              setExperiences(updated);
            }} />
            <div className="col-span-2 flex justify-end">
              <Button variant="destructive" onClick={() => {
                const updated = experiences.filter((_, i) => i !== idx);
                setExperiences(updated);
              }}>Fshij</Button>
            </div>
          </div>
        ))}
        <Button onClick={() => setExperiences([...experiences, { position: "", company: "", period: "", description: "" }])}>➕ Shto Përvojë</Button>
        <Button className="ml-4 bg-blue-600 text-white" onClick={handleSaveExperience}>💾 Ruaj Përvojat</Button>
      </div>

      {/* Education Section */}
      <div className="bg-white p-6 rounded-lg shadow mt-6">
        <h2 className="text-xl font-semibold mb-4">Edukimi</h2>
        {educationList.map((edu, idx) => (
          <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 border-b pb-4">
            <Input placeholder="Universiteti" value={edu.university} onChange={(e) => {
              const updated = [...educationList];
              updated[idx].university = e.target.value;
              setEducationList(updated);
            }} />
            <Input placeholder="Dega" value={edu.field} onChange={(e) => {
              const updated = [...educationList];
              updated[idx].field = e.target.value;
              setEducationList(updated);
            }} />
            <Input placeholder="Data e përfundimit" value={edu.date} onChange={(e) => {
              const updated = [...educationList];
              updated[idx].date = e.target.value;
              setEducationList(updated);
            }} />
            <div className="col-span-2 flex justify-end">
              <Button variant="destructive" onClick={() => {
                const updated = educationList.filter((_, i) => i !== idx);
                setEducationList(updated);
              }}>Fshij</Button>
            </div>
          </div>
        ))}
        <Button onClick={() => setEducationList([...educationList, { university: "", field: "", date: "" }])}>➕ Shto Edukim</Button>
        <Button className="ml-4 bg-blue-600 text-white" onClick={handleSaveEducation}>💾 Ruaj Edukimin</Button>
      </div>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <BarChart3 className="text-blue-600" />
            <div>
              <div className="text-xl font-bold">{stats.applicationsMade}</div>
              <div className="text-sm text-gray-500">Pozita të Aplikuara</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <CheckCircle2 className="text-green-600" />
            <div>
              <div className="text-xl font-bold">{stats.positionsAccepted}</div>
              <div className="text-sm text-gray-500">Pozita të Pranuara</div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex items-center gap-4">
            <Eye className="text-purple-600" />
            <div>
              <div className="text-xl font-bold">{stats.profileViews}</div>
              <div className="text-sm text-gray-500">Vizitorë Profilit</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
