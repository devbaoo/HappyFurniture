import api from "./api";

export const uploadService = {
  // Upload một ảnh
  uploadImage: async (
    file: File,
    folder: string = "general",
  ): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    // Gửi thư mục upload dưới dạng params hoặc append tuỳ backend của bạn,
    // Ở đây theo bảng API DOC thì có Params phụ folder
    const response = await api.post("/Upload/image", formData, {
      params: { folder },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    // Trả về URL của image
    return response.data.url;
  },

  // Upload nhiều ảnh cùng lúc
  uploadMultipleImages: async (
    files: FileList | File[],
    folder: string = "general",
  ): Promise<string[]> => {
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    const response = await api.post("/Upload/images", formData, {
      params: { folder },
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.urls;
  },

  // Xóa ảnh có trên hệ thống Cloudinary
  deleteImage: async (publicId: string): Promise<void> => {
    await api.delete("/Upload/image", {
      params: { publicId },
    });
  },
};
