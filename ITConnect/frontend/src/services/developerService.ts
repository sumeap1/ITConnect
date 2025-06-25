import api from "@/config/api";
import axios from "axios";
import { toast } from "sonner";


export const fetchVerifiedDevelopers = async () => {
  const res = await api.get("/developer/verified");
  return res.data;
};


export async function applyToJob(jobId: string) {
  const token = localStorage.getItem("developerToken");

  if (!token) {
    toast.error("❌ Ju duhet të jeni të kyçur si zhvillues.");
    return;
  }

  try {
    console.log("[applyToJob] jobId:", jobId);
    const payload = { jobId };
    console.log("[applyToJob] payload:", payload);
    await api.post(
      "/developer/apply",
      payload
    );

    toast.success("✅ Aplikuat me sukses!");
  } catch (err: any) {
    toast.error("❌ Gabim gjatë aplikimit. Kontrollo nëse je i verifikuar.");
    console.error(err);
  }
}
