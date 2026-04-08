import api from "./api";

export interface Product {
  id: string;
  name: string;
  nameEn?: string | null;
  slug: string;
  description: string;
  descriptionEn?: string | null;
  price: number;
  oldPrice?: number;
  dimensionsHeight?: number;
  dimensionsWidth?: number;
  dimensionsDepth?: number;
  dimensionUnit?: string;
  detail?: string;
  detailEn?: string | null;
  deliveryInfo?: string;
  deliveryInfoEn?: string | null;
  weight?: number;
  deliveryHeight?: number;
  deliveryWidth?: number;
  deliveryDepth?: number;
  isFeatured?: boolean;
  isActive: boolean;
  assemblyId?: number | null;
  assembly?: {
    id: number;
    name?: string | null;
    nameVi?: string | null;
    nameEn?: string | null;
    code?: string;
    description?: string | null;
    descriptionVi?: string | null;
    descriptionEn?: string | null;
  } | null;
  categoryId?: string;
  categories?: any[];
  images?: any[];
  materials?: Array<{
    id: number;
    name?: string | null;
    nameVi?: string | null;
    nameEn?: string | null;
    description?: string | null;
    descriptionVi?: string | null;
    descriptionEn?: string | null;
  }>;
  variants?: any[];
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description: string;
  price: number;
  oldPrice: number;
  dimensionsHeight: number;
  dimensionsWidth: number;
  dimensionsDepth: number;
  dimensionUnit: string;
  detail: string;
  deliveryInfo: string;
  weight: number;
  isFeatured: boolean;
  isActive: boolean;
  categoryIds: number[];
  imageUrls: string[];
}

export const productService = {
  // Lấy toàn bộ sản phẩm (lọc và phân trang)
  getProducts: async (params?: any): Promise<any> => {
    const response = await api.get("/Products", { params });
    return response.data;
  },

  // Lấy các sản phẩm nổi bật
  getFeaturedProducts: async (): Promise<Product[]> => {
    const response = await api.get("/Products/featured");
    return response.data;
  },

  // Lấy chi tiết sản phẩm theo ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get(`/Products/${id}`);
    return response.data;
  },

  // Lấy sản phẩm theo SLug
  getProductBySlug: async (slug: string): Promise<Product> => {
    const response = await api.get(`/Products/slug/${slug}`);
    return response.data;
  },

  // Tạo một sản phẩm mới
  createProduct: async (data: any): Promise<Product> => {
    const response = await api.post("/Products", data);
    return response.data;
  },

  // Tạo sản phẩm kèm file ảnh
  createProductWithImages: async (data: FormData): Promise<Product> => {
    const response = await api.post("/Products/with-images", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  // Cập nhật sản phẩm
  updateProduct: async (id: string, data: any): Promise<Product> => {
    const response = await api.put(`/Products/${id}`, data);
    return response.data;
  },

  // Xóa sản phẩm
  deleteProduct: async (id: string): Promise<void> => {
    await api.delete(`/Products/${id}`);
  },
};
