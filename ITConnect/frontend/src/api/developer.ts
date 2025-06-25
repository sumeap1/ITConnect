import api, { API_ENDPOINTS } from "@/config/api";

// ✅ Regjistrimi i developerit
export const registerDeveloper = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const response = await api.post(API_ENDPOINTS.DEVELOPER.REGISTER, data);
  return response.data;
};

// ✅ Login i developerit
export const loginDeveloper = async (data: {
  email: string;
  password: string;
}) => {
  const response = await api.post(API_ENDPOINTS.DEVELOPER.LOGIN, data);
  return response.data;
};

export const getDeveloperProfile = async (email: string) => {
  return await api.get(`/developer/profile?email=${email}`);
};


export const getDeveloperStats = async (email: string) => {
  return await api.get(`/developer/stats`);
};


