import api from "./api";

export const authService = {
  login: async (email: string, password: string): Promise<any> => {
    const response = await api.post("/Auth/login", { email, password });
    if (response.data.token) {
      localStorage.setItem("adminToken", response.data.token);
    }
    return response.data;
  },

  register: async (userData: any): Promise<any> => {
    const response = await api.post("/Auth/register", userData);
    return response.data;
  },

  logout: (): void => {
    localStorage.removeItem("adminToken");
  },

  getCurrentUser: async (): Promise<any> => {
    const response = await api.get("/Auth/me");
    return response.data;
  },
};
