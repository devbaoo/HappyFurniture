import api from "./api";

export interface Category {
  id: string;
  name: string;
  nameEn?: string | null;
  description: string;
  descriptionEn?: string | null;
  imageUrl?: string;
  parentId: string | null;
  sortOrder?: number | null;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
  children?: Category[];
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
}

export const sortCategoriesByOrder = <T extends {
  sortOrder?: number | null;
  name?: string;
}>(categories: T[]): T[] =>
  [...categories].sort((a, b) => {
    const aOrder = a.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const bOrder = b.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (aOrder !== bOrder) return aOrder - bOrder;

    return (a.name ?? "").trim().localeCompare((b.name ?? "").trim());
  });

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
    const roots = Array.isArray(response.data) ? response.data : [];
    return sortCategoriesByOrder(roots);
  },

  // Lấy chi tiết thể loại theo ID
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get(`/Categories/${id}`);
    const category = response.data;

    return {
      ...category,
      children: Array.isArray(category?.children)
        ? sortCategoriesByOrder(category.children)
        : [],
    };
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
