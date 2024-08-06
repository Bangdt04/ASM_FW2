import React, { useState, useEffect } from "react";
import { Divider } from "@mui/material";
import { Category } from "../../../interface/Category";
import { Link } from "react-router-dom";
import { Product } from "../../../interface/Product";

const Kategorien = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResponse = await fetch("http://localhost:3000/categories");
        const categoriesData: Category[] = await categoryResponse.json();

        const productResponse = await fetch("http://localhost:3000/products");
        const productsData: Product[] = await productResponse.json();

        const categoryProductCount: { [key: number]: number } = {};

        productsData.forEach((product: Product) => {
          const categoryId = product.categoryId;
          if (!categoryProductCount[categoryId]) {
            categoryProductCount[categoryId] = 0;
          }
          categoryProductCount[categoryId]++;
        });

        const updatedCategories = categoriesData.map((category: Category) => ({
          ...category,
          quantity: categoryProductCount[category.id] || 0
        }));

        setCategories(updatedCategories);
        setProducts(productsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] leading-10">
        Kategorien
      </h3>
      <Divider />
      <div className="grid grid-cols-4 mx-auto gap-6 w-[80%]">
        {categories.map((category: Category) => (
          <Link to={`/category/${category.id}`} key={category.id}>
            <div className="relative rounded-xl overflow-hidden group">
              <div className="h-60 w-full relative">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute w-[50%] top-3 right-0 text-white flex flex-col z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="font-semibold text-[18px]">{category.name}</p>
                <p className="text-[16px]">{category.quantity} items</p>
              </div>
              <div className="opacity-30 group-hover:opacity-0 bg-neutral-900 shadow absolute top-0 right-0 w-full h-full transition-opacity duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Kategorien;
