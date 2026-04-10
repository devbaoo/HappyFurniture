import api from "./api";

export interface Assembly {
  id: number;
  name?: string | null;
  nameVi?: string | null;
  nameEn?: string | null;
  code?: string;
  description?: string | null;
  descriptionVi?: string | null;
  descriptionEn?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const assemblyService = {
  // Lấy tất cả assembly đang active (dùng cho dropdown/filter)
  getActiveAssemblies: async (): Promise<Assembly[]> => {
    const response = await api.get("/assemblies/active");
    return Array.isArray(response.data) ? response.data : [];
  },
};
