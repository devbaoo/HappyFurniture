import api from "./api";
import type { News, NewsDetail, NewsResponse } from "./api";

export const newsService = {
  getActiveNews: async (): Promise<NewsResponse> => {
    const response = await api.get("/News");
    return response.data;
  },

  getBySlug: async (slug: string): Promise<NewsDetail> => {
    const response = await api.get(`/News/slug/${slug}`);
    return response.data;
  },

  getById: async (id: number): Promise<NewsDetail> => {
    const response = await api.get(`/News/${id}`);
    return response.data;
  },
};
