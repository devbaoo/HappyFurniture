import axios from "axios";

const apiOrigin = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");

const api = axios.create({
  baseURL: apiOrigin ? `${apiOrigin}/api` : "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export interface ContentBlock {
  id: number;
  newsId: number;
  type: "Text" | "Image";
  titleVi: string | null;
  titleEn: string | null;
  contentVi: string | null;
  contentEn: string | null;
  imageUrl: string | null;
  imageAltVi: string | null;
  imageAltEn: string | null;
  sortOrder: number;
  isFullWidth: boolean;
}

export interface News {
  id: number;
  titleVi: string;
  titleEn: string | null;
  slug: string;
  metaTitleVi: string | null;
  metaTitleEn: string | null;
  metaDescriptionVi: string | null;
  metaDescriptionEn: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  isActive: boolean;
  sortOrder: number;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface NewsDetail extends News {
  contentBlocks: ContentBlock[];
}

export interface NewsResponse {
  news: News[];
  companyActivities: News[];
}

export default api;
