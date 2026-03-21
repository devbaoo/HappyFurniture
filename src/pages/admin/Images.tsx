import React, { useState, useEffect } from 'react';
import { imageService, ProductImage } from '../../services/image.service';
import { productService, Product } from '../../services/product.service';

export default function Images() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    productService.getProducts({ pageSize: 1000 }).then(data => setProducts(data.items));
  }, []);

  const fetchImages = async (productId: string) => {
    if (!productId) {
      setImages([]);
      return;
    }
    try {
      setLoading(true);
      const data = await imageService.getImagesByProductId(productId);
      setImages(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages(selectedProductId);
  }, [selectedProductId]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0 || !selectedProductId) return;
    
    // Convert to array to support multiple
    const files = Array.from(e.target.files);
    setUploading(true);

    try {
      // Loop over and upload via multipart backend
      for (const file of files) {
        const formData = new FormData();
        formData.append('File', file);
        formData.append('ProductId', selectedProductId);
        // Note: Assuming /ProductImages/with-image accepts form-data with File and ProductId. Or you might need to adapt it to your exact DTO shape.
        await imageService.uploadProductImage(formData);
      }
      
      alert('Tải ảnh thành công!');
      fetchImages(selectedProductId);
    } catch (error) {
      console.error(error);
      alert('Tải ảnh thất bại. Có thể do lỗi API hoặc file quá lớn.');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  const setPrimary = async (id: string) => {
    try {
      await imageService.setPrimaryImage(id);
      fetchImages(selectedProductId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc muốn xóa ảnh này? Lưu ý ảnh có thể xóa trên cloud.')) {
      try {
        await imageService.deleteImage(id);
        fetchImages(selectedProductId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Cấu Hình Hình Ảnh Sản Phẩm</h1>
      </div>

       <div className="mb-6 mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded flex items-center justify-between">
          <div className="w-full md:w-1/2">
             <label className="block text-sm text-yellow-800 font-semibold mb-2">Chọn sản phẩm cần quản lý ảnh:</label>
             <select 
               className="w-full border border-gray-300 rounded px-3 py-2"
               value={selectedProductId}
               onChange={(e) => setSelectedProductId(e.target.value)}
             >
               <option value="">-- Vui lòng chọn sản phẩm --</option>
               {products.map(p => (
                 <option key={p.id} value={p.id}>{p.name} ({p.slug})</option>
               ))}
             </select>
          </div>
          
          <div className="mt-6 md:mt-0">
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium cursor-pointer disabled:opacity-50">
               {uploading ? 'Đang tải lên...' : '+ Tải thêm ảnh'}
               <input 
                 type="file" 
                 multiple 
                 accept="image/*"
                 className="hidden" 
                 disabled={!selectedProductId || uploading}
                 onChange={handleUpload}
               />
            </label>
          </div>
      </div>

      {loading ? (
         <div className="text-center p-12 text-gray-400">Đang tải thư viện ảnh...</div>
      ) : selectedProductId ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-4">
          {images.length === 0 ? (
            <div className="col-span-full text-center p-12 text-gray-400">Không có hình ảnh nào cho sản phẩm này. Hãy tải lên!</div>
          ) : (
             images.map(img => (
               <div key={img.id} className={`relative group rounded-lg overflow-hidden border-2 ${img.isPrimary ? 'border-green-500 shadow-md' : 'border-gray-200'}`}>
                 <img src={img.imageUrl} alt="Sản phẩm" className="w-full h-48 object-cover bg-gray-100" />
                 
                 {img.isPrimary && (
                   <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold shadow">
                     Ảnh Chính (Bìa)
                   </div>
                 )}

                 <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 gap-2">
                    {!img.isPrimary && (
                      <button onClick={() => setPrimary(img.id)} className="bg-white text-gray-800 text-xs px-2 py-1 rounded font-semibold hover:bg-blue-100 shadow">
                        Đặt làm Bìa
                      </button>
                    )}
                    <button onClick={() => handleDelete(img.id)} className="bg-red-500 text-white text-xs px-2 py-1 rounded font-semibold hover:bg-red-600 shadow">
                      Xóa
                    </button>
                 </div>
               </div>
             ))
          )}
        </div>
      ) : (
         <div className="text-center p-12 text-gray-400">
           Vui lòng chọn một sản phẩm ở menu thả xuống phía trên để xem thư viện ảnh.
         </div>
      )}
    </div>
  );
}