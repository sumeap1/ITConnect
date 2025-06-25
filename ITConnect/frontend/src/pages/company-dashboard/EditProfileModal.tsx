import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import api from "@/config/api";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  profile: {
    id?: string;
    companyName?: string;
    location?: string;
    businessNumber?: string;
    shortBio?: string;
    mission?: string;
    values?: string;
    website?: string;
    linkedIn?: string;
    logoUrl?: string;
    [key: string]: any;
  };
  refresh: () => void;
}

export default function EditProfileModal({
  open,
  onClose,
  profile,
  refresh,
}: EditProfileModalProps) {
  const [form, setForm] = useState({
    id: "",
    companyName: "",
    location: "",
    businessNumber: "",
    shortBio: "",
    mission: "",
    values: "",
    website: "",
    linkedIn: "",
    logoUrl: "",
  });

  // Kur hapet modal, vendos të dhënat e profilit në form
  useEffect(() => {
    if (profile) {
      setForm({
        id: profile.id || "",
        companyName: profile.companyName || "",
        location: profile.location || "",
        businessNumber: profile.businessNumber || "",
        shortBio: profile.shortBio || "",
        mission: profile.mission || "",
        values: profile.values || "",
        website: profile.website || "",
        linkedIn: profile.linkedIn || "",
        logoUrl: profile.logoUrl || "",
      });
    }
  }, [profile]);

  useEffect(() => {
    const savedCompany = localStorage.getItem("companyData");
    if (savedCompany) {
      setForm(JSON.parse(savedCompany));
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const files = e.target.files;

    const readAsBase64 = (file: File) =>
      new Promise<string | ArrayBuffer | null>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    if (field === "logoUrl" && files && files.length > 0) {
      const base64 = await readAsBase64(files[0]);
      setForm((prev) => ({
        ...prev,
        logoUrl: typeof base64 === "string" ? base64 : "",
      }));
    }
  };

  const handleSubmit = async () => {
    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      alert("Nuk ka ID të kompanisë");
      return;
    }
  
    try {
      // Update Company (main collection)
      await api.patch(`/companies/profile/${companyId}`, form);
      // Update or create CompanyProfile (profile collection)
      await api.post(`/company-profile/profile`, { companyId, ...form });
      onClose();
      refresh();
    } catch (error) {
      console.error(error);
    }
  }
  

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Ndrysho Profilin</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            name="companyName"
            value={form.companyName}
            onChange={handleChange}
            placeholder="Emri i Kompanisë"
          />
          <Input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="Lokacioni"
          />
          <Input
            name="businessNumber"
            value={form.businessNumber}
            onChange={handleChange}
            placeholder="Business Number"
          />
          <Input
            name="shortBio"
            value={form.shortBio}
            onChange={handleChange}
            placeholder="Bio e shkurtër"
          />
          <Input
            name="mission"
            value={form.mission}
            onChange={handleChange}
            placeholder="Misioni"
          />
          <Input
            name="values"
            value={form.values}
            onChange={handleChange}
            placeholder="Vlerat"
          />
          <Input
            name="website"
            value={form.website}
            onChange={handleChange}
            placeholder="Faqja zyrtare"
          />
          <Input
            name="linkedIn"
            value={form.linkedIn}
            onChange={handleChange}
            placeholder="LinkedIn"
          />

          <div className="grid gap-2 mt-4 col-span-2">
            <label className="text-sm text-gray-600">Ngarko Logon:</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => handleImageUpload(e, "logoUrl")}
            />
          </div>
        </div>

        <Button className="mt-6 w-full" onClick={handleSubmit}>
          Ruaj Ndryshimet
        </Button>
      </DialogContent>
    </Dialog>
  );
}
