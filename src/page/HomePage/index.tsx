import About from "./component/About";
import Banner from "./component/Banner";
import BestSellers from "./component/BestSellers";
import Kategorien from "./component/Kategorien";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 bg-[#F8F4F0] ">
      <Banner />
      <BestSellers />
      <About/>
      <Kategorien />
    </div>
  );
};

export default HomePage;
