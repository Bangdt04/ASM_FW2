import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Product } from "../../../interface/Product";
import { Category } from "../../../interface/Category";
import { getAllCategories } from "../../../api/apiCategory";

type Props = {
  onAdd: (product: Product) => void;
  onCancel: () => void;
};

const AddProduct = ({ onAdd, onCancel }: Props) => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<Product>();
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error("Có lỗi xảy ra khi lấy danh mục.");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async (data: Product) => {
    try {
      const newProduct = {
        ...data,
        categoryId: Number(data.categoryId),
      };
      await onAdd(newProduct);
      reset();
      toast.success("Thêm sản phẩm thành công!");
      navigate("/admin");
    } catch (error) {
      toast.error("Có lỗi xảy ra khi thêm sản phẩm.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full mx-auto max-w-lg p-6 bg-white shadow-lg rounded-lg space-y-6"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Thêm sản phẩm</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Tên sản phẩm
          </label>
          <input
            type="text"
            id="name"
            {...register("name", {
              required: "Tên sản phẩm là bắt buộc",
              minLength: { value: 3, message: "Tên sản phẩm phải có ít nhất 3 ký tự" },
            })}
            placeholder="Tên sản phẩm"
            className={`block w-full p-3 border ${errors.name ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.name && <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>}
        </div>

        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-1">
            URL ảnh sản phẩm
          </label>
          <input
            type="text"
            id="image"
            {...register("image", {
              required: "Ảnh sản phẩm là bắt buộc",
              pattern: {
                value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/,
                message: "URL ảnh sản phẩm không hợp lệ",
              },
            })}
            placeholder="URL ảnh sản phẩm"
            className={`block w-full p-3 border ${errors.image ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.image && <span className="text-red-500 text-xs mt-1">{errors.image.message}</span>}
        </div>

        <div>
          <label htmlFor="desc" className="block text-sm font-medium text-gray-700 mb-1">
            Mô tả sản phẩm
          </label>
          <input
            type="text"
            id="desc"
            {...register("desc", {
              required: "Mô tả sản phẩm là bắt buộc",
              minLength: { value: 10, message: "Mô tả sản phẩm phải có ít nhất 10 ký tự" },
            })}
            placeholder="Mô tả sản phẩm"
            className={`block w-full p-3 border ${errors.desc ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.desc && <span className="text-red-500 text-xs mt-1">{errors.desc.message}</span>}
        </div>

        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">
            Giá sản phẩm
          </label>
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Giá sản phẩm là bắt buộc",
              min: { value: 0, message: "Giá sản phẩm không thể âm" },
            })}
            placeholder="Giá sản phẩm"
            className={`block w-full p-3 border ${errors.price ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {errors.price && <span className="text-red-500 text-xs mt-1">{errors.price.message}</span>}
        </div>

        <div>
          <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-1">
            Danh mục
          </label>
          <select
            id="categoryId"
            {...register("categoryId", { required: "Danh mục là bắt buộc" })}
            className={`block w-full p-3 border ${errors.categoryId ? "border-red-500" : "border-gray-300"} rounded-lg bg-gray-50 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="">Chọn danh mục</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId && <span className="text-red-500 text-xs mt-1">{errors.categoryId.message}</span>}
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isBestSeller"
            {...register("isBestSeller")}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isBestSeller" className="text-gray-700 text-sm">
            Best Seller
          </label>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
        >
          Hủy
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        >
          Thêm sản phẩm
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
