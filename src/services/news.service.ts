import api from "./api";
import type { News, NewsResponse } from "./api";

export const newsService = {
  getActiveNews: async (): Promise<NewsResponse> => {
    const response = await api.get("/News/active");
    return response.data;
  },

  getBySlug: async (slug: string): Promise<News> => {
    const response = await api.get(`/News/slug/${slug}`);
    return response.data;
  },

  getById: async (id: number): Promise<News> => {
    const response = await api.get(`/News/${id}`);
    return response.data;
  },
};
