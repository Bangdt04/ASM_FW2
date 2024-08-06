import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../../../../interface/Product";
import { Category } from "../../../../interface/Category";

const ProductsByCategory = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/products?categoryId=${categoryId}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategory = async () => {
      try {
        const response = await fetch(`http://localhost:3000/categories/${categoryId}`);
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchProducts();
    fetchCategory();
    setLoading(false);
  }, [categoryId]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-[80%] mx-auto">
      {category && (
        <h2 className="text-3xl font-bold text-neutral-600 my-8">
          {category.name}
        </h2>
      )}
      {products.length > 0 ? (
        <div className="grid grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-lg">
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.desc}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 my-8">Không có sản phẩm nào trong danh mục này.</div>
      )}
    </div>
  );
};

export default ProductsByCategory;
