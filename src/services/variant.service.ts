import api from "./api";

export interface ProductVariant {
  id: string;
  productId: string;
  color?: string;
  size?: string;
  storage?: string;
  sku: string;
  priceAdjustment: number;
  stock: number;
  isActive: boolean;
}

export const variantService = {
  // Lấy danh sách biến thể của sản phẩm
  getVariantsByProductId: async (
    productId: string,
    params?: any,
  ): Promise<any> => {
    const response = await api.get(`/ProductVariants/product/${productId}`, {
      params,
    });
    return response.data;
  },

  // Lấy danh sách biến thể ĐANG HOẠT ĐỘNG
  getActiveVariants: async (productId: string): Promise<ProductVariant[]> => {
    const response = await api.get(
      `/ProductVariants/active/product/${productId}`,
    );
    return response.data;
  },

  // Lấy chi tiết biến thể theo ID
  getVariantById: async (id: string): Promise<ProductVariant> => {
    const response = await api.get(`/ProductVariants/${id}`);
    return response.data;
  },

  // Thêm biến thể mới
  createVariant: async (
    data: Partial<ProductVariant>,
  ): Promise<ProductVariant> => {
    const response = await api.post("/ProductVariants", data);
    return response.data;
  },

  // Cập nhật biến thể
  updateVariant: async (
    id: string,
    data: Partial<ProductVariant>,
  ): Promise<ProductVariant> => {
    const response = await api.put(`/ProductVariants/${id}`, data);
    return response.data;
  },

  // Xóa biến thể
  deleteVariant: async (id: string): Promise<void> => {
    await api.delete(`/ProductVariants/${id}`);
  },
};
