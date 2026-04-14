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
  /** "full" | "left" | "right" — chỉ dùng khi type = Image */
  imagePosition: "full" | "left" | "right" | null;
  sortOrder: number;
  isFullWidth: boolean;
}

export interface NewsListItem {
  id: number;
  titleVi: string;
  titleEn: string | null;
  slug: string;
  imageUrl: string | null;
  excerptVi: string | null;
  excerptEn: string | null;
  sortOrder: number;
  type: string;
  createdAt: string;
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
  news: NewsListItem[];
  companyActivities: NewsListItem[];
}

// ─── Certificates ─────────────────────────────────────────────────────────────

export interface Certificate {
  id: number;
  nameVi: string;
  nameEn: string | null;
  descriptionVi: string | null;
  descriptionEn: string | null;
  logoUrl: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string;
}

// ─── CompanyInfo ─────────────────────────────────────────────────────────────

export interface CompanyInfo {
  id: number;
  nameVi: string;
  nameEn: string | null;
  email: string | null;
  phoneVi: string | null;
  phoneEn: string | null;
  faxVi: string | null;
  faxEn: string | null;
  sortOrder: number;
  isActive: boolean;
  createdAt: string;
}

export default api;
