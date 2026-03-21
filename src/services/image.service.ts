import api from "./api";

export interface ProductImage {
  id: string;
  productId: string;
  imageUrl: string;
  isPrimary: boolean;
  displayOrder: number;
}

export const imageService = {
  // Lấy các hình ảnh của một sản phẩm
  getImagesByProductId: async (productId: string): Promise<ProductImage[]> => {
    const response = await api.get(`/ProductImages/product/${productId}`);
    return response.data;
  },

  // Lấy chi tiết của một hình ảnh
  getImageById: async (id: string): Promise<ProductImage> => {
    const response = await api.get(`/ProductImages/${id}`);
    return response.data;
  },

  // Thêm URL ảnh cho sản phẩm
  createProductImage: async (data: any): Promise<ProductImage> => {
    const response = await api.post("/ProductImages", data);
    return response.data;
  },

  // Upload và tạo mới ảnh (multipart/form-data)
  uploadProductImage: async (formData: FormData): Promise<ProductImage> => {
    const response = await api.post("/ProductImages/with-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Cập nhật hình ảnh sản phẩm
  updateImage: async (id: string, data: any): Promise<void> => {
    await api.put(`/ProductImages/${id}`, data);
  },

  // Đặt hình ảnh thành ảnh chính / bìa sản phẩm
  setPrimaryImage: async (id: string): Promise<void> => {
    await api.post(`/ProductImages/${id}/set-primary`);
  },

  // Xóa hình ảnh của sản phẩm
  deleteImage: async (id: string): Promise<void> => {
    await api.delete(`/ProductImages/${id}`);
  },
};
