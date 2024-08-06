import React from "react";
import { useForm } from "react-hook-form";
import { Product } from "../../../interface/Product";
import { Category } from "../../../interface/Category";
import { useState, useEffect } from "react";
import { getAllCategories } from "../../../api/apiCategory";
import { toast } from "react-toastify";

type Props = {
  product: Product | null;
  onEdit: (product: Product) => void;
  onCancel: () => void;
};

const EditProduct = ({ product, onEdit, onCancel }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        setFetchError("Có lỗi xảy ra khi lấy danh mục.");
        console.error("Error fetching categories:", error);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (product) {
      reset(product);
    }
  }, [product, reset]);

  const onSubmit = async (data: Product) => {
    try {
      const updatedProduct = {
        ...data,
        categoryId: Number(data.categoryId)
      };
      await onEdit(updatedProduct);
      toast.success("Sửa sản phẩm thành công!");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi sửa sản phẩm.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md space-y-6">
      <h2 className="text-3xl font-semibold text-gray-800">Sửa sản phẩm</h2>
      {fetchError && <div className="text-red-500 mb-4">{fetchError}</div>}
      {loadingCategories ? (
        <p>Đang tải danh mục...</p>
      ) : (
        <>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Tên sản phẩm
              </label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Tên sản phẩm là bắt buộc" })}
                placeholder="Tên sản phẩm"
                className={`block w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
                URL ảnh sản phẩm
              </label>
              <input
                type="text"
                id="image"
                {...register("image", { required: "Ảnh sản phẩm là bắt buộc" })}
                placeholder="URL ảnh sản phẩm"
                className={`block w-full p-3 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.image && <span className="text-red-500 text-sm">{errors.image.message}</span>}
            </div>

            <div>
              <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả sản phẩm
              </label>
              <input
                type="text"
                id="desc"
                {...register("desc", { required: "Mô tả sản phẩm là bắt buộc" })}
                placeholder="Mô tả sản phẩm"
                className={`block w-full p-3 border ${errors.desc ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.desc && <span className="text-red-500 text-sm">{errors.desc.message}</span>}
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
                Giá sản phẩm
              </label>
              <input
                type="number"
                id="price"
                {...register("price", { required: "Giá sản phẩm là bắt buộc", min: { value: 0, message: "Giá sản phẩm không thể âm" } })}
                placeholder="Giá sản phẩm"
                className={`block w-full p-3 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500`}
              />
              {errors.price && <span className="text-red-500 text-sm">{errors.price.message}</span>}
            </div>

            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
                Danh mục
              </label>
              <select
                id="categoryId"
                {...register("categoryId", { required: "Danh mục là bắt buộc" })}
                className={`block w-full p-3 border ${errors.categoryId ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:ring-blue-500 focus:border-blue-500`}
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.categoryId && <span className="text-red-500 text-sm">{errors.categoryId.message}</span>}
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isBestSeller"
                {...register("isBestSeller")}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isBestSeller" className="text-gray-900">Best Seller</label>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Sửa sản phẩm
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg shadow-md hover:bg-gray-700 transition duration-300"
              >
                Hủy
              </button>
            </div>
          </div>
        </>
      )}
    </form>
  );
};

export default EditProduct;
