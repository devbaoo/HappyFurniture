import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL: apiOrigin ? `${apiOrigin}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
