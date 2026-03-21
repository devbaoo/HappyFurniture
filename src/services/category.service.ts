import api from "./api";

export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  parentId: string | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const categoryService = {
  // Lấy danh sách thể loại có phân trang
  getCategories: async (params?: {
    pageNumber?: number;
    pageSize?: number;
    name?: string;
    parentId?: string;
    isActive?: boolean;
  }): Promise<PaginatedResponse<Category>> => {
    const response = await api.get("/Categories", { params });
    return response.data;
  },

  // Lấy các thể loại gốc (không có ParentId)
  getRootCategories: async (): Promise<Category[]> => {
    const response = await api.get("/Categories/root");
    return response.data;
  },

  // Lấy chi tiết thể loại theo ID
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/Categories/${id}`);
    return response.data;
  },

  // Tạo mới một thể loại
  createCategory: async (data: Partial<Category>): Promise<Category> => {
    const response = await api.post("/Categories", data);
    return response.data;
  },

  // Tạo mới một thể loại với ảnh
  createCategoryWithImage: async (formData: FormData): Promise<Category> => {
    const response = await api.post("/Categories/with-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Cập nhật thông tin thể loại
  updateCategory: async (
    id: string,
    data: Partial<Category>,
  ): Promise<Category> => {
    const response = await api.put(`/Categories/${id}`, data);
    return response.data;
  },

  // Xóa một thể loại
  deleteCategory: async (id: string): Promise<void> => {
    await api.delete(`/Categories/${id}`);
  },
};
