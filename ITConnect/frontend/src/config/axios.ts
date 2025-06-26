const token = localStorage.getItem("token");

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

export default api;
