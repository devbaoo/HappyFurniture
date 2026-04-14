import api from "./api";
import type { CompanyInfo } from "./api";

export const companyInfoService = {
  getActive: async (): Promise<CompanyInfo[]> => {
    const response = await api.get("/CompanyInfo");
    const data = response.data;
    return Array.isArray(data) ? data : (data.items ?? []);
  },
};
