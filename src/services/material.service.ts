import api from "./api";

export interface Material {
  id: number;
  name: string;
  description: string;
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
