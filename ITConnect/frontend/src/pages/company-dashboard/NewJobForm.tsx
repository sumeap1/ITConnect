import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import api from "@/config/api";

export default function NewJobForm() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    technologies: "",
    location: "",
    deadline: "",
    payment: "",
    type: "job",
  });

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const companyId = localStorage.getItem("companyId");
    if (!companyId) {
      alert("❌ Nuk u gjet ID e kompanisë. Kyçu përsëri.");
      return;
    }

    try {
      await api.post("/jobs", {
        ...form,
        company: companyId,
        technologies: form.technologies.split(",").map((tech) => tech.trim()),
      });

      alert("✅ Shpallja u ruajt me sukses!");
      navigate("/company-dashboard");
    } catch (error) {
      console.error("❌ Gabim gjatë ruajtjes së shpalljes:", error);
      alert("❌ Dështoi ruajtja e shpalljes.");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F0EB] text-[#1E1E1E] py-12 px-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-serif font-bold mb-8 text-center">➕ Shto një shpallje</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-[#D4C3B4]"
      >
        <Input
          name="title"
          placeholder="Titulli i pozitës"
          value={form.title}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Përshkrimi i pozitës"
          value={form.description}
          onChange={handleChange}
          required
        />
        <Input
          name="technologies"
          placeholder="Teknologjitë (React, Node.js...)"
          value={form.technologies}
          onChange={handleChange}
          required
        />
        <Input
          name="location"
          placeholder="Lokacioni ose Remote"
          value={form.location}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="deadline"
          value={form.deadline}
          onChange={handleChange}
          required
        />
        <Input
          name="payment"
          placeholder="Pagesa (opsionale)"
          value={form.payment}
          onChange={handleChange}
        />
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border border-[#D4C3B4] rounded-md px-4 py-2"
        >
          <option value="job">PUNË</option>
          <option value="freelance">PROJEKT FREELANCE</option>
        </select>
        <Button type="submit" className="w-full bg-[#1E1E1E] text-white hover:opacity-90">
          💾 Ruaj Shpalljen
        </Button>
      </form>
    </div>
  );
}
