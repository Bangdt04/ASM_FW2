import { FaRegArrowAltCircleRight } from "react-icons/fa";

const ProductMenu = () => {
  return (
    <div className="w-full ">
      <div className="flex flex-col gap-5">
        <h1 className="text-neutral-600 text-3xl font-normal font-['Baloo'] leading-10">
          Kategorien
        </h1>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <p>Eckige Töpfe</p>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <p>Runde Töpfe</p>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <p>Untersetzer</p>
          </div>
          <div className="flex gap-2 items-center">
            <input type="checkbox" />
            <p>Pflanzschalen</p>
          </div>
        </div>
        <div>
          <div className="w-full flex relative">
            <img
              src="/public/images/product/bg.png"
              alt=""
              className="w-full object-cover"
            />
            <div className="bg-neutral-950 z-0 opacity-40 flex flex-col justify-between absolute w-full h-full p-10 text-white">
              <p className="text-[30px] flex z-10 font-bold leading-7">
                Grow your own <br /> favourite plant
              </p>
              <button className="flex items-center gap-3 text-[20px]">
                Shop Now <FaRegArrowAltCircleRight />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-zinc-800 text-[18.80px] font-bold  leading-relaxed">
            Filter By Price
          </p>
          <div className="flex flex-col gap-3">
            <div className="w-full h-[10px] bg-[#4E7C32] relative">
              <div className="w-[20px] h-[20px] rounded-full left-[-3px] top-[-5px] flex items-center justify-center bg-white absolute">
                <div className="bg-[#665345] w-[10px] h-[10px] rounded-full" />
              </div>
              <div className="w-[20px] h-[20px] rounded-full right-[-3px] top-[-5px] flex items-center justify-center bg-white absolute">
                <div className="bg-[#665345] w-[10px] h-[10px] rounded-full" />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <p>From $0 to $8000</p>
              <p>Filter</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-zinc-800 text-[18.80px] font-bold  leading-relaxed">
            Filter By Size
          </p>
          <div className="flex flex-col gap-3">
            <div className="w-full h-[10px] bg-[#4E7C32] relative">
              <div className="w-[20px] h-[20px] rounded-full left-[-3px] top-[-5px] flex items-center justify-center bg-white absolute">
                <div className="bg-[#665345] w-[10px] h-[10px] rounded-full" />
              </div>
              <div className="w-[20px] h-[20px] rounded-full right-[-3px] top-[-5px] flex items-center justify-center bg-white absolute">
                <div className="bg-[#665345] w-[10px] h-[10px] rounded-full" />
              </div>
            </div>
            <div className="w-full flex justify-between">
              <p>2 mm by 50</p>
              <p>Filter</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductMenu;
