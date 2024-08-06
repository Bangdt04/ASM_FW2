import About from "./component/About";
import ProductDetailSlide from "./component/ProductDetailSlide";

const ProductDetail = () => {
  return (
    <div className="bg-white">
      <div className="w-[80%] mx-auto py-20 flex flex-col gap-10">
        <ProductDetailSlide />
        <About />
      </div>
    </div>
  );
};

export default ProductDetail;
