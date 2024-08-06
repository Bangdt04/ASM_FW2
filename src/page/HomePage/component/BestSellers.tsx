import React, { useEffect, useState } from 'react';
import { Divider } from '@mui/material';
import { Product } from '../../../interface/Product';
import ProductItem from '../../../component/ProductItem';
import { getAllProducts } from '../../../api/apiProduct';
import { getAllCategories } from '../../../api/apiCategory';
import { Category } from '../../../interface/Category';

const BestSellers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [bestSellers, setBestSellers] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([getAllProducts(), getAllCategories()]);

        setProducts(productsData);
        setCategories(categoriesData);

        const filteredBestSellers = productsData.filter((product: Product) => product.isBestSeller);
        setBestSellers(filteredBestSellers);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getCategoryName = (categoryId: number) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  return (
    <div className="w-full flex flex-col gap-3">
      <h3 className="w-[80%] mx-auto text-neutral-600 text-3xl font-normal font-['Baloo'] capitalize tracking-wide">
        Best Sellers
      </h3>
      <Divider />
      <div className="bg-white">
        <div className="w-[80%] mx-auto grid grid-cols-4 gap-9 p-5">
          {bestSellers.map(product => (
            <ProductItem 
              key={product.id} 
              product={product} 
              categoryName={getCategoryName(product.categoryId)} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestSellers;
