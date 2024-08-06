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
  const images = [
    {
      src: "/public/images/b1.png",
      alt: "garten spaten",
      label: "garten spaten",
    },
    { src: "/public/images/b2.png", alt: "sand", label: "sand" },
    { src: "/public/images/b3.png", alt: "pflanzer", label: "pflanzer" },
    {
      src: "/public/images/b4.png",
      alt: "schlammkuchen",
      label: "schlammkuchen",
    },
    { src: "/public/images/b5.png", alt: "klemmen", label: "klemmen" },
  ];

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="container w-[70%] mx-auto p-4">
        <div className="grid  grid-cols-5 gap-4">
          <div className="col-span-2 bg-red-500 relative">
            <img
              src={images[0].src}
              alt={images[0].alt}
              className="w-full h-full object-fill"
            />
            <div className="absolute top-6 p-4 w-full left-0 bg-white bg-opacity-70 font-semibold text-[25px] text-black ">
              {images[0].label}
            </div>
          </div>

          <div className="col-span-3 grid grid-cols-2 gap-4">{images.slice(1).map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-auto object-cover"
                />
                <div className="absolute top-3 p-4 w-full left-0 bg-white bg-opacity-70 font-semibold text-[25px] text-black">
                  {image.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;