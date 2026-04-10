import api from "./api";

export interface Material {
  id: number;
  name?: string | null;
  nameVi?: string | null;
  nameEn?: string | null;
  description?: string | null;
  descriptionVi?: string | null;
  descriptionEn?: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const materialService = {
  getActiveMaterials: async (): Promise<Material[]> => {
    const response = await api.get("/Materials/active");
    return response.data;
  },
};
