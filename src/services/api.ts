import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL: apiOrigin ? `${apiOrigin}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface News {
  id: number;
  titleVi: string;
  titleEn: string | null;
  slug: string;
  contentVi: string | null;
  contentEn: string | null;
  imageUrl: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  isActive: boolean;
  sortOrder: number;
  type: string;
  category: string | null;
  year: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface NewsResponse {
  events: News[];
  activities: News[];
}

export default api;
