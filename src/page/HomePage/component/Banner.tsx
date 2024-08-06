import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="slider-container w-full bg-gradient-to-r from-emerald-200 to-red-50">
      <Slider {...settings}>
        <div>
          <div className="  relative w-full flex justify-end ">
            <img
              src="/public/images/fwfqq 1.png"
              alt=""
              className="w-[90%] object-cover"
            />
          </div>
          <div className="flex flex-col gap-6  z-50 top-[20%] right-[89%] absolute">
            <h1 className="text-neutral-600 text-[40px] font-bold  leading-[70.90px]">
              Wir kümmern uns um Ihre <br /> schöner Garten und Haus
            </h1>
            <p className="text-stone-600 text-[15px] font-normal font-['Poppins'] leading-tight tracking-wider">
              Lorem Ipsum is simply dummy text of the printing and <br />
              typesetting industry. Lorem Ipsum has been the industry's <br />
              standard dummy text ever since the 1500s,
            </p>
            <div>
              <button className="text-black px-11  py-4 rounded-sm border-solid border-2 border-[#505F4E] ">
                <p className="text-neutral-600 text-xl font-normal font-['Poppins'] leading-relaxed tracking-widest">
                  Lern mehr
                </p>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default Banner;
