import api, { API_ENDPOINTS } from "@/config/api";

// ✅ Regjistrimi i kompanisë
export const registerCompany = async (data: {
  companyName: string;
  email: string;
  password: string;
  confirmPassword: string;
  website: string;
  businessNumber: string;
}) => {
  const response = await api.post(API_ENDPOINTS.COMPANY.REGISTER, data);
  return response.data;
};

// ✅ Login i kompanisë
export const loginCompany = async (payload: { email: string; password: string }) => {
    const response = await api.post(API_ENDPOINTS.COMPANY.LOGIN, payload);
    return response.data; // përfshin { token, company }
  };
