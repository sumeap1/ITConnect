import api from "@/config/api";

// ====================
// Company API Services
// ====================

export const registerCompany = async (companyData: any) => {
  const response = await api.post("/authcontroller/register-company", companyData);
  return response.data;
};

export const loginCompany = async (credentials: any) => {
  const response = await api.post("/authcontroller/login-company", credentials);
  return response.data;
};

// ====================
// Developer API Services
// ====================

export const registerDeveloper = async (developerData: any) => {
  const response = await api.post("/authcontroller/register-developer", developerData);
  return response.data;
};

export const loginDeveloper = async (credentials: any) => {
  const response = await api.post("/authcontroller/login-developer", credentials);
  return response.data;
};
