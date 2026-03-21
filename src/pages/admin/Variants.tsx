import React, { useState, useEffect } from 'react';
import { variantService, ProductVariant } from '../../services/variant.service';
import { productService, Product } from '../../services/product.service';

export default function Variants() {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [selectedProductId, setSelectedProductId] = useState('');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    productId: '',
    color: '',
    size: '',
    storage: '',
    sku: '',
    priceAdjustment: 0,
    stock: 0,
    isActive: true
  });

  useEffect(() => {
    // Tải danh sách tất cả sản phẩm để đưa vào dropdown filter và create form
    productService.getProducts({ pageSize: 1000 }).then(data => setProducts(data.items));
  }, []);

  const fetchVariants = async (productId: string) => {
    if (!productId) {
      setVariants([]);
      return;
    }
    try {
      setLoading(true);
      const data = await variantService.getVariantsByProductId(productId);
      setVariants(data.items || data); // Phụ thuộc vào BE trả về Paginated hay List
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVariants(selectedProductId);
  }, [selectedProductId]);

  const handleOpenModal = (variant?: ProductVariant) => {
    if (variant) {
      setEditingId(variant.id);
      setFormData({
        productId: variant.productId,
        color: variant.color || '',
        size: variant.size || '',
        storage: variant.storage || '',
        sku: variant.sku || '',
        priceAdjustment: variant.priceAdjustment,
        stock: variant.stock,
        isActive: variant.isActive
      });
    } else {
      setEditingId(null);
      setFormData({
        productId: selectedProductId || (products[0]?.id || ''),
        color: '', size: '', storage: '', sku: '', priceAdjustment: 0, stock: 0, isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await variantService.updateVariant(editingId, formData);
      } else {
        await variantService.createVariant(formData);
      }
      handleCloseModal();
      fetchVariants(selectedProductId || formData.productId);
      if (!selectedProductId) setSelectedProductId(formData.productId);
    } catch (error) {
      console.error('Save failed', error);
      alert('Có lỗi xảy ra.');
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa biến thể này?')) {
      try {
        await variantService.deleteVariant(id);
        fetchVariants(selectedProductId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cấu Hình Biến Thể Sản Phẩm</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
          disabled={products.length === 0}
        >
          + Thêm Biến Thể
        </button>
      </div>

      <div className="mb-6 mb-4 p-4 bg-blue-50 border border-blue-200 rounded">
        <label className="block text-sm text-blue-800 font-semibold mb-2">Chọn sản phẩm cần quản lý biến thể:</label>
        <select 
          className="w-full md:w-1/2 border border-gray-300 rounded px-3 py-2"
          value={selectedProductId}
          onChange={(e) => setSelectedProductId(e.target.value)}
        >
          <option value="">-- Vui lòng chọn sản phẩm --</option>
          {products.map(p => (
            <option key={p.id} value={p.id}>{p.name} ({p.slug})</option>
          ))}
        </select>
      </div>

      {selectedProductId ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-3 font-semibold text-gray-700">Mã SKU</th>
                <th className="p-3 font-semibold text-gray-700">Màu sắc</th>
                <th className="p-3 font-semibold text-gray-700">Kích thước</th>
                <th className="p-3 font-semibold text-gray-700">Chênh lệch giá</th>
                <th className="p-3 font-semibold text-gray-700">Tồn kho</th>
                <th className="p-3 font-semibold text-gray-700 text-right">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">Đang tải...</td></tr>
              ) : variants.length === 0 ? (
                <tr><td colSpan={6} className="p-4 text-center text-gray-500">Sản phẩm này chưa có biến thể nào.</td></tr>
              ) : (
                variants.map(v => (
                  <tr key={v.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="p-3 font-mono text-sm">{v.sku}</td>
                    <td className="p-3">
                      {v.color ? <span className="flex items-center gap-2"><div className="w-4 h-4 rounded-full border shadow-sm" style={{backgroundColor: v.color}}></div> {v.color}</span> : '-'}
                    </td>
                    <td className="p-3">{v.size || v.storage || '-'}</td>
                    <td className="p-3 text-red-500">{v.priceAdjustment > 0 ? '+' : ''}{v.priceAdjustment.toLocaleString()}đ</td>
                    <td className="p-3">{v.stock}</td>
                    <td className="p-3 flex justify-end gap-2">
                       <button onClick={() => handleOpenModal(v)} className="text-blue-500 hover:text-blue-700 mx-1">Sửa</button>
                      <button onClick={() => handleDelete(v.id)} className="text-red-500 hover:text-red-700 mx-1">Xóa</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center p-12 text-gray-400">
          Vui lòng chọn một sản phẩm ở menu thả xuống phía trên để bắt đầu quản lý.
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Sửa Biến Thể' : 'Thêm Biến Thể'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thuộc Sản Phẩm *</label>
                <select 
                  required disabled={!!editingId}
                  value={formData.productId} onChange={e => setFormData({...formData, productId: e.target.value})}
                  className="w-full border border-gray-300 rounded px-3 py-2 bg-gray-50"
                >
                  {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mã SKU</label>
                  <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng tồn kho *</label>
                  <input required type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Màu (Mã Hex hoặc tên)</label>
                  <input type="text" placeholder="#FFFFFF hoặc Đỏ" value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Kích thước</label>
                  <input type="text" placeholder="XL, XXL..." value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dung lượng</label>
                  <input type="text" placeholder="Trọng lượng..." value={formData.storage} onChange={e => setFormData({...formData, storage: e.target.value})} className="w-full border border-gray-300 rounded px-3 py-2" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Điều chỉnh giá tiền (Cộng thêm hoặc trừ đi so với giá gốc sản phẩm)</label>
                <input required type="number" placeholder="Ví dụ: 50000" value={formData.priceAdjustment} onChange={e => setFormData({...formData, priceAdjustment: Number(e.target.value)})} className="w-full border border-gray-300 rounded px-3 py-2" />
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
                <button type="button" onClick={handleCloseModal} className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50">Hủy</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu lại</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
