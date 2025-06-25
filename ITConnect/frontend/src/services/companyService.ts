import api, { API_ENDPOINTS } from "@/config/api";

// ➕ Dërgo ftesë për intervistë
export const sendInterviewInvite = async (inviteData: {
  to: string;
  positionTitle: string;
  interviewDate: string;
  interviewLocation: string;
}) => {
  return api.post("/company/invite", inviteData);
};

// 📥 Merr listën e ftesave të intervistës
export const getCompanyInterviewInvites = async () => {
  return api.get("/company/interview-invites");
};

// 🔁 Përditëso statusin e një ftese
export const updateInviteStatus = async (id: string, status: string) => {
  return api.patch(`/company/invite/${id}`, { status });
};

// 🗑️ Fshij një ftesë intervistë sipas ID-së
export const deleteInterviewInvite = async (id: string) => {
  return api.delete(`/invite/${id}`);
};

// 🏢 Merr kompanitë me punë të hapura
export const getCompaniesWithOpenJobs = async () => {
  return api.get("/companies");
};

// ➕ Krijo një punë të re
export const createNewJob = async (jobData: {
  title: string;
  description: string;
  technologies: string[];
  experienceRequired: string;
}) => {
  return api.post("/newjob", jobData);
};
