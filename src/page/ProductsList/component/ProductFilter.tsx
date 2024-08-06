import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import ProductMenu from "./ProductMenu";
import { BiSync } from "react-icons/bi";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { FaRegHeart } from "react-icons/fa";
import { getAllProducts, getProductsByCategory } from "../../../api/apiProduct";
import { getAllCategories } from "../../../api/apiCategory";
import { Category } from "../../../interface/Category";  // Import interface Category
import ProductItem from "../../../component/ProductItem";

const ProductFilter = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          getAllProducts(),
          getAllCategories()
        ]);
        setProducts(productsData);
        setCategories(categoriesData.map((cat: Category) => ({ id: cat.id, name: cat.name })));
      } catch (error) {
        console.error("Failed to fetch initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let productsData;
        if (category) {
          productsData = await getProductsByCategory(category);
        } else {
          productsData = await getAllProducts();
        }
        setProducts(productsData);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="w-full py-28">
      <div className="w-[80%] mx-auto gap-10 flex flex-col">
        <div className="flex gap-10">
          <div className="flex items-center gap-4">
            <p>Category :</p>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-category"
              options={categories.map(cat => ({ label: cat.name, id: cat.id }))}
              sx={{ width: 250 }}
              onChange={(event, newValue) => setCategory(newValue?.label || null)}
              renderInput={(params) => <TextField {...params} label="Select Category" />}
            />
          </div>
        </div>
        <div className="w-full flex gap-12">
          <div className="grid grid-cols-3 gap-20 w-3/4">
            {products.map((item, index) => (
              <ProductItem key={index} product={item} categoryName={category || "Uncategorized"} />
            ))}
          </div>
          <div className="w-1/4">
            <ProductMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
