const ProductTop = () => {
  const ListData = [
    { image: "/public/images/product/p5.png", name: "Eckige Töpfe" },
    { image: "/public/images/product/p2.png", name: "Runde Töpfe" },
    { image: "/public/images/product/p3.png", name: "Untersetzer" },
    { image: "/public/images/product/p4.png", name: "Pflanzschalen" },
  ];
  return (
    <div className="w-[80%] mx-auto mt-7">
      <div className="flex justify-between">
        {ListData.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 items-center px-5 py-3 rounded-xl  bg-[#D2E8CD]"
          >
            <img src={item.image} alt="" className="" />
            <p className="text-stone-600 text-[15px] font-semibold font-['Open Sans'] capitalize">
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTop;
