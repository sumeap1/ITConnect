// src/config/api.ts

import axios from "axios";
// ✅ Adresa bazë e API-së
const BASE_URL = "http://localhost:3000/api";

// ✅ Instanca kryesore e Axios
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});



// ✅ Shto automatikisht token në çdo kërkesë
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("developerToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Redirect në login nëse merr 401 (Unauthorized)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("developerToken");
      localStorage.removeItem("companyToken");
      const path = window.location.pathname;
      if (path.startsWith("/developer-dashboard")) {
        window.location.href = "/developer-login";
      } else {
        window.location.href = "/company-login";
      }
    }
    return Promise.reject(error);
  }
);

// ✅ Lista e endpoint-eve për referencë
export const API_ENDPOINTS = {
  COMPANY: {
    REGISTER: "/auth/register-company",
    LOGIN: "/auth/login-company",
    INVITE: "/company/invite",
    INTERVIEW_INVITES: "/company/interview-invites",
    UPDATE_INVITE_STATUS: (id: string) => `/company/invite/${id}`,
    DELETE_INVITE: (id: string) => `/invite/${id}`,
    VERIFY_EMAIL: (token: string) => `/auth/verify-company-email/${token}`,
  },
  JOB: {
    POST: "/jobs",
    GET_ALL: "/jobs",
  },
  DEVELOPER: {
    REGISTER: "/auth/register-developer",
    LOGIN: "/auth/login-developer",
    PROFILE: {
      GET: "/developers/profile", // ?email=
      STATS: "/developers/stats", // ?email=
      SAVE_PERSONAL: "/developer/profile/personal",
      SAVE_ABOUT: "/developer/profile/about",
      SAVE_EXPERIENCE: "/developer/profile/experience",
      SAVE_EDUCATION: "/developer/profile/education",
    },
    ALL_VERIFIED: "/developers/all-verified",
    NOTIFY: "/developer/notify",
    VERIFY_EMAIL: (token: string) => `/auth/verify-email/${token}`,
  },
  COMPANY_DATA: {
    GET_ALL_WITH_JOBS: "/companies",
  },
};


export async function sendVerificationEmail(to: string, verificationLink: string) {
  // ... dërgo email, mos kthe token
}

export default api;
