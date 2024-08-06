import ProductFilter from "./component/ProductFilter";
import ProductTop from "./component/ProductTop";

const ProductsList = () => {
  return (
    <div className="w-full  flex flex-col bg-white">
      <div className="bg-[#D2E8CD]">
        <h1 className="text-[#505F4E] py-14 w-[80%]  mx-auto text-3xl font-normal font-['Baloo'] leading-tight">
          Töpfe & Behälter
        </h1>
      </div>
      <ProductTop />
      <ProductFilter />
    </div>
  );
};

export default ProductsList;
