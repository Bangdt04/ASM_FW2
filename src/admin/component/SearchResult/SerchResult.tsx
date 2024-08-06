import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Product } from "../../../interface/Product";

const SearchResults: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use different API endpoint based on whether query is empty
        const url = query
          ? `http://localhost:3000/products?name_like=${query}`
          : `http://localhost:3000/products`;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [query]);

  if (loading) return <div className="text-center my-4 text-gray-600">Loading...</div>;

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="text-3xl font-bold text-neutral-600 my-8">
        {query
          ? `Kết quả tìm kiếm cho: ${query}`
          : "Danh sách tất cả sản phẩm"}
      </h2>
      {products.length === 0 ? (
        <div className="text-center text-gray-600 my-8">
          {query ? "Không có sản phẩm nào phù hợp." : "Không có sản phẩm nào."}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-semibold text-neutral-700 mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-2">{product.desc}</p>
              <p className="text-green-600 font-bold">${product.price}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
