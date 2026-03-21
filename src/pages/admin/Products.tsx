import React, { useState, useEffect } from "react";
import { productService, Product } from "../../services/product.service";
import { categoryService, Category } from "../../services/category.service";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  // Filters & Pagination
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [filterCategoryId, setFilterCategoryId] = useState("");
  const [filterSlug, setFilterSlug] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Modal Handling
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: 0,
    oldPrice: 0,
    categoryId: "",
    slug: "",
    isActive: true,
  });

  // Helper to generate slug from name
  const generateSlug = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .replace(
        /Ã¡|Ã |áº£|áº¡|Ã£|Äƒ|áº¯|áº±|áº³|áºµ|áº·|Ã¢|áº¥|áº§|áº©|áº«|áº­/gi,
        "a",
      )
      .replace(/Ã©|Ã¨|áº»|áº½|áº¹|Ãª|áº¿|á»|á»ƒ|á»…|á»‡/gi, "e")
      .replace(/i|Ã­|Ã¬|á»‰|Ä©|á»‹/gi, "i")
      .replace(
        /Ã³|Ã²|á»|Ãµ|á»|Ã´|á»‘|á»“|á»•|á»—|á»™|Æ¡|á»›|á»|á»Ÿ|á»¡|á»£/gi,
        "o",
      )
      .replace(/Ãº|Ã¹|á»§|Å©|á»¥|Æ°|á»©|á»«|á»­|á»¯|á»±/gi, "u")
      .replace(/Ã½|á»³|á»·|á»¹|á»µ/gi, "y")
      .replace(/Ä‘/gi, "d")
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setFormData((prev) => ({
      ...prev,
      name: newName,
      slug: generateSlug(newName), // Auto-generate slug when name changes for new products
    }));
  };

  const [selectedImages, setSelectedImages] = useState<FileList | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await productService.getProducts({
        pageNumber: page,
        pageSize: pageSize,
        categoryId: filterCategoryId || undefined,
        slug: filterSlug || undefined,
        minPrice: minPrice || undefined,
        maxPrice: maxPrice || undefined,
      });
      // Response cÃ³ dáº¡ng { items, totalCount, ... }
      setProducts(data.items);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error("Failed to fetch products", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await categoryService.getCategories({ pageSize: 100 }); // láº¥y táº¥t cáº£ category Ä‘á»ƒ vÃ o dropdown
      setCategories(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, filterCategoryId, filterSlug, minPrice, maxPrice]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingId(product.id);
      setFormData({
        name: product.name,
        description: product.description || "",
        price: product.price,
        oldPrice: product.oldPrice || 0,
        categoryId: (product.categories && product.categories.length > 0) ? product.categories[0].id.toString() : (product.categoryId || ""),
        slug: product.slug, // Make sure we load the exact current slug
        isActive: product.isActive,
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        price: 0,
        oldPrice: 0,
        categoryId: "",
        slug: "",
        isActive: true,
      });
    }
    setImagePreviews([]);
    setSelectedImages(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedImages(e.target.files);
      const newPreviews = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews(newPreviews);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit flow
        await productService.updateProduct(editingId, formData);
      } else {
        // Create Product flow
        if (selectedImages && selectedImages.length > 0) {
          const form = new FormData();
          form.append("Name", formData.name);
          form.append("Description", formData.description);
          form.append("Price", formData.price.toString());
          form.append("oldPrice", formData.oldPrice.toString());
          form.append("CategoryId", formData.categoryId);
          form.append("Slug", formData.slug);
          form.append("IsActive", formData.isActive.toString());

          Array.from(selectedImages).forEach((file) => {
            form.append("Images", file);
          });

          const newProduct = await productService.createProductWithImages(form);
          alert("Sản phẩm đã được tạo thành công: " + newProduct.name);
        } else {
          await productService.createProduct(formData);
        }
      }
      handleCloseModal();
      fetchProducts();
    } catch (error) {
      console.error("Save failed", error);
      alert("Có lỗi xảy ra.");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        await productService.deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Delete failed", error);
        alert("Có lỗi xảy ra khi xóa sản phẩm.");
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Sản Phẩm</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium">
          + Thêm Sản Phẩm
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Tìm theo slug..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={filterSlug}
          onChange={(e) => {
            setFilterSlug(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={filterCategoryId}
          onChange={(e) => {
            setFilterCategoryId(e.target.value);
            setPage(1);
          }}>
          <option value="">Tất cả Thể loại</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Giá từ..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={minPrice}
          onChange={(e) => {
            setMinPrice(e.target.value);
            setPage(1);
          }}
        />
        <input
          type="number"
          placeholder="Đến giá..."
          className="border border-gray-300 rounded px-3 py-2 w-full"
          value={maxPrice}
          onChange={(e) => {
            setMaxPrice(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="p-3 font-semibold text-gray-700">Hình ảnh</th>
              <th className="p-3 font-semibold text-gray-700">Tên SP / Slug</th>
              <th className="p-3 font-semibold text-gray-700">Giá</th>
              <th className="p-3 font-semibold text-gray-700">Thể Loại</th>
              <th className="p-3 font-semibold text-gray-700 text-right">
                Hành Động
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Đang tải...
                </td>
              </tr>
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-4 text-center text-gray-500">
                  Không tìm thấy dữ liệu.
                </td>
              </tr>
            ) : (
              products.map((product) => {
                const cateName = product.categories && product.categories.length > 0 ? product.categories.map((c) => c.name).join(", ") : categories.find((c) => c.id === product.categoryId)?.name || "-";
                // Try grabbing primary image
                const primaryImage =
                  product.images?.find((i) => i.isPrimary)?.imageUrl ||
                  product.images?.[0]?.imageUrl;

                return (
                  <tr
                    key={product.id}
                    className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3">
                      {primaryImage ? (
                        <img
                          src={primaryImage}
                          alt={product.name}
                          className="w-12 h-12 rounded object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-400">
                          No Img
                        </div>
                      )}
                    </td>
                    <td className="p-3">
                      <div className="font-medium text-gray-800">
                        {product.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {product.slug}
                      </div>
                    </td>
                    <td className="p-3 text-red-600 font-semibold">
                      {product.price.toLocaleString()}₫
                      {product.oldPrice ? (
                        <span className="text-gray-400 line-through text-xs block">
                          {product.oldPrice.toLocaleString()}₫
                        </span>
                      ) : null}
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                        {cateName}
                      </span>
                    </td>
                    <td className="p-3 flex justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(product)}
                        className="text-blue-500 hover:text-blue-700 mx-1">
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-700 mx-1">
                        Xóa
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
        <div>
          Hiển thị {products.length} / {totalCount} Sản phẩm
        </div>
        <div className="flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Trước
          </button>
          <span className="px-3 py-1">Trang {page}</span>
          <button
            disabled={page * pageSize >= totalCount}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50">
            Sau
          </button>
        </div>
      </div>

      {/* Modal Creating / Editing */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingId ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên sản phẩm *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.name}
                    onChange={handleNameChange}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Slug (Đường dẫn tĩnh) *
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Thể loại *
                  </label>
                  <select
                    required
                    value={formData.categoryId}
                    onChange={(e) =>
                      setFormData({ ...formData, categoryId: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2">
                    <option value="">Chọn một thể loại...</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá bán *
                  </label>
                  <input
                    required
                    type="number"
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        price: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Giá gốc (nếu giảm giá)
                  </label>
                  <input
                    type="number"
                    value={formData.oldPrice}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        oldPrice: Number(e.target.value),
                      })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mô tả chi tiết
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  rows={4}></textarea>
              </div>

              {!editingId && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tải ảnh lên (được chọn nhiều)
                  </label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <div className="flex gap-2 flex-wrap mt-3">
                    {imagePreviews.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        className="w-16 h-16 object-cover border rounded"
                        alt="Preview"
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2 mt-2">
                <input
                  type="checkbox"
                  id="isActiveProduct"
                  checked={formData.isActive}
                  onChange={(e) =>
                    setFormData({ ...formData, isActive: e.target.checked })
                  }
                />
                <label
                  htmlFor="isActiveProduct"
                  className="text-sm font-medium text-gray-700">
                  Sản phẩm đang được bày bán
                </label>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  LƯu sản phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
