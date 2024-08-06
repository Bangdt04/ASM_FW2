import React, { useEffect, useRef, useState } from "react";
import { useParams } from 'react-router-dom';
import { FaMinus, FaPlus } from "react-icons/fa";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { MdOutlineShoppingCart } from "react-icons/md";
import { getProductById } from "../../../api/apiProduct";

const ProductDetailSlide: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<any>(null);
  const [mainImage, setMainImage] = useState<string>("");
  const [nav1, setNav1] = useState<Slider | undefined>(undefined);
  const [nav2, setNav2] = useState<Slider | undefined>(undefined);
  const [count, setCount] = useState(1);
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const productData = await getProductById(Number(id));
          setProduct(productData);
          setMainImage(productData.image);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    setNav1(sliderRef1.current ?? undefined);
    setNav2(sliderRef2.current ?? undefined);
  }, []);

  const settings1: Settings = {
    asNavFor: nav2,
    arrows: false,
    fade: true,
    swipeToSlide: true,
  };

  const settings2: Settings = {
    asNavFor: nav1,
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
  };

  const handleIncrease = () => {
    setCount((prevCount) => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount((prevCount) => (prevCount > 1 ? prevCount - 1 : 1));
  };

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const getTotalPrice = () => {
    return product ? (product.price * count).toFixed(2) : "0.00";
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex justify-between">
        <div className="flex flex-col w-[30%]">
          <div>
            <img
              src={mainImage}
              alt="Main product"
              className="w-full h-[400px] object-cover" // Fixed size for the main image
            />
            <div className="mt-2 px-8">
              <Slider {...settings2} ref={sliderRef2}>
                {product.images.map((imgSrc: string, index: number) => (
                  <div key={index} className="px-2">
                    <img
                      src={imgSrc}
                      alt={`Product thumbnail ${index + 1}`}
                      className="w-full h-[100px] object-cover cursor-pointer"
                      onClick={() => handleThumbnailClick(imgSrc)}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
        <div className="w-[60%] flex flex-col gap-4">
          <p className="text-lime-700 text-sm font-bold font-['Kumbh Sans'] uppercase tracking-wide">
            Plant
          </p>
          <p className="text-neutral-800 text-[44px] font-bold font-['Kumbh Sans'] leading-[48px]">
            {product.name}
          </p>
          <p className="text-gray-500 text-base font-medium font-['Kumbh Sans'] leading-relaxed">
            {product.desc}
          </p>
          <div className="flex gap-2">
            <p className="text-neutral-800 text-3xl font-bold font-['Kumbh Sans'] ">
              ${getTotalPrice()}
            </p>
            <div className="rounded-lg px-4 bg-[#FFEDE0] flex items-center justify-center">
              {product.discount}%
            </div>
          </div>
          <p className="line-through">${(product.price * (100 / (100 - product.discount))).toFixed(2)}</p>
          <div className="flex gap-4">
            <div className="flex px-4 w-[20%] justify-center rounded-xl bg-[#F7F8FD]">
              <button onClick={handleDecrease} className="text-[#505F4E] ">
                <FaMinus />
              </button>
              <input
                type="text"
                value={count}
                readOnly
                className="bg-[#F7F8FD] w-[60%] focus:outline-none focus:border-transparent text-center"
              />
              <button onClick={handleIncrease}>
                <FaPlus />
              </button>
            </div>
            <button className="py-[10px] gap-2 flex items-center text-white rounded-xl px-[77px] bg-[#4E7C32]">
              <MdOutlineShoppingCart />
              <p className="text-base font-bold font-['Kumbh Sans']">
                Add to cart
              </p>
            </button>
          </div>
        </div>
      </div>
      <div>
        <p className="text-lime-700 text-3xl font-normal font-['Inter']">
          Description
        </p>
        <p className="text-stone-600 text-xl font-light font-['Inter']">
          {product.desc}
        </p>
      </div>
    </div>
  );
};

export default ProductDetailSlide;
