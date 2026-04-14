import api from "./api";
import type { Certificate } from "./api";

export const certificateService = {
  getActiveCertificates: async (): Promise<Certificate[]> => {
    const response = await api.get("/Certificates");
    const data = response.data;
    return Array.isArray(data) ? data : (data.items ?? []);
  },
};
