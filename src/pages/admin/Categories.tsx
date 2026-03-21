import React, { useState, useEffect } from "react";
import {
  categoryService,
  Category,
  PaginatedResponse,
} from "../../services/category.service";
import { PageHeader } from "../../components/admin/ui/PageHeader";
import { SectionCard } from "../../components/admin/ui/SectionCard";
import { DataTable } from "../../components/admin/ui/DataTable";
import { Modal } from "../../components/admin/ui/Modal";
import { FormWrapper } from "../../components/admin/ui/FormWrapper";
import { Input } from "../../components/admin/ui/Input";
import { Button } from "../../components/admin/ui/Button";

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [rootCategories, setRootCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [filterParentId, setFilterParentId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [imagePreview, setImagePreview] = useState<string>("");

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    imageUrl: "",
    parentId: "",
    isActive: true,
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data: PaginatedResponse<Category> =
        await categoryService.getCategories({
          pageNumber: page,
          pageSize,
          name: searchName || undefined,
          parentId: filterParentId || undefined,
        });
      setCategories(data.items);
      setTotalCount(data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRootCategories = async () => {
    try {
      const data = await categoryService.getCategories({ pageSize: 100 });
      const roots = data.items.filter((c) => !c.parentId);
      setRootCategories(roots);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [page, pageSize, searchName, filterParentId]);

  useEffect(() => {
    fetchRootCategories();
  }, []);

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingId(category.id);
      setFormData({
        name: category.name,
        description: category.description || "",
        imageUrl: category.imageUrl || "",
        parentId: category.parentId || "",
        isActive: category.isActive,
      });
      setImagePreview(category.imageUrl || "");
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        description: "",
        imageUrl: "",
        parentId: "",
        isActive: true,
      });
      setImagePreview("");
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingId) {
        await categoryService.updateCategory(editingId, {
          name: formData.name,
          description: formData.description,
          imageUrl: formData.imageUrl,
          parentId: formData.parentId || null,
          isActive: formData.isActive,
        });
      } else {
        await categoryService.createCategory({
          name: formData.name,
          description: formData.description,
          imageUrl: "",
          parentId: formData.parentId || null,
          isActive: formData.isActive,
        });
      }
      handleCloseModal();
      fetchCategories();
      fetchRootCategories();
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi lưu thể loại.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc muốn xóa thể loại này?")) {
      try {
        await categoryService.deleteCategory(id);
        fetchCategories();
        fetchRootCategories();
      } catch (error) {
        console.error(error);
        alert("Có lỗi xảy ra khi xóa.");
      }
    }
  };

  const columns = [
    {
      header: "Hình ảnh",
      accessor: (category: Category) =>
        category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt={category.name}
            className="w-12 h-12 rounded object-cover border border-gray-200"
          />
        ) : (
          <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded flex items-center justify-center text-xs text-gray-400">
            Trống
          </div>
        ),
    },
    {
      header: "Tên Thể Loại",
      accessor: (category: Category) => (
        <div>
          <div className="font-medium text-gray-900">{category.name}</div>
          {category.description && (
            <div className="text-sm text-gray-500 mt-0.5">
              {category.description}
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Thể Loại Cha",
      accessor: (category: Category) =>
        category.parentId ? (
          rootCategories.find((r) => r.id === category.parentId)?.name ||
          category.parentId
        ) : (
          <span className="text-gray-400">-</span>
        ),
    },
    {
      header: "Trạng Thái",
      accessor: (category: Category) => (
        <span
          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
            category.isActive
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}>
          {category.isActive ? "Bật" : "Tắt"}
        </span>
      ),
    },
    {
      header: "Hành động",
      accessor: (category: Category) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleOpenModal(category)}>
            Sửa
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => handleDelete(category.id)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <PageHeader
        title="Quản lý Thể Loại"
        subtitle="Danh sách các danh mục sản phẩm trên hệ thống"
        action={
          <Button onClick={() => handleOpenModal()}>+ Thêm Thể Loại</Button>
        }
      />

      <div className="flex gap-4">
        <Input
          className="max-w-xs bg-white"
          placeholder="Tìm kiếm danh mục..."
          value={searchName}
          onChange={(e) => {
            setSearchName(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="h-10 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
          value={filterParentId}
          onChange={(e) => {
            setFilterParentId(e.target.value);
            setPage(1);
          }}>
          <option value="">Tất cả danh mục gốc/con</option>
          {rootCategories.map((rc) => (
            <option key={rc.id} value={rc.id}>
              Lọc con của: {rc.name}
            </option>
          ))}
        </select>
      </div>

      <SectionCard noPadding>
        <DataTable
          columns={columns}
          data={categories}
          isLoading={loading}
          emptyMessage="Không tìm thấy danh mục nào."
        />
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="text-sm text-gray-500">
            Hiển thị <span className="font-medium">{categories.length}</span> /{" "}
            <span className="font-medium">{totalCount}</span> danh mục
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page <= 1}
              onClick={() => setPage(page - 1)}>
              Trước
            </Button>
            <span className="flex items-center px-2 text-sm text-gray-600">
              Trang {page}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={categories.length < pageSize}
              onClick={() => setPage(page + 1)}>
              Sau
            </Button>
          </div>
        </div>
      </SectionCard>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={editingId ? "Cập nhật Thể Loại" : "Thêm Thể Loại Mới"}>
        <FormWrapper
          onSubmit={handleSubmit}
          submitText={editingId ? "Cập nhật" : "Tạo mới"}
          cancelText="Hủy"
          onCancel={handleCloseModal}
          isSubmitting={isSubmitting}>
          <Input
            label="Tên thể loại"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="VD: Bàn ghế phòng khách"
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Mô tả</label>
            <textarea
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              rows={3}
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Mô tả danh mục..."
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Thể loại cha (Tuỳ chọn)
            </label>
            <select
              className="h-10 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-black focus:border-black"
              value={formData.parentId}
              onChange={(e) =>
                setFormData({ ...formData, parentId: e.target.value })
              }>
              <option value="">-- Không có (Làm mốc) --</option>
              {rootCategories
                .filter((rc) => rc.id !== editingId)
                .map((rc) => (
                  <option key={rc.id} value={rc.id}>
                    {rc.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">
              Ảnh đại diện
            </label>
            <input
              type="file"
              accept="image/*"
              className="text-sm text-gray-600"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="w-24 h-24 object-cover mt-2 rounded border border-gray-200"
              />
            )}
          </div>
          <div className="flex items-center mt-2">
            <input
              type="checkbox"
              id="isActive"
              checked={formData.isActive}
              onChange={(e) =>
                setFormData({ ...formData, isActive: e.target.checked })
              }
              className="w-4 h-4 text-black border-gray-300 rounded focus:ring-black"
            />
            <label
              htmlFor="isActive"
              className="ml-2 block text-sm text-gray-900">
              Kích hoạt
            </label>
          </div>
        </FormWrapper>
      </Modal>
    </div>
  );
}
