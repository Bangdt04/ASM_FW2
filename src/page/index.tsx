import { Outlet } from "react-router-dom";
import Header from "./layout/Header";
import Footer from "./layout/Footer";

const Page = () => {
  return (
    <div className="bg-[#F8F4F0]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Page;
