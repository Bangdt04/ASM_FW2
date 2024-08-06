import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { LuUser } from "react-icons/lu";
import { BsHandbag } from "react-icons/bs";
import { Divider } from "@mui/material";

const Header = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <div className="w-full h-auto bg-gradient-to-r py-4 from-lime-700 to-stone-600 shadow">
      <div className="w-[80%] flex flex-col gap-4 mx-auto">
        <div className="flex justify-between w-full mx-auto h-auto">
          <form onSubmit={handleSearch} className="flex justify-between items-center rounded-sm px-5 py-2 bg-white w-[50%]">
            <input
              className="w-[80%] focus:outline-none focus:border-transparent"
              type="text"
              placeholder="Suchen Sie nach Produkten, Marken und mehr"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">
              <FaSearch />
            </button>
          </form>
          <div className="flex items-center gap-24">
            <div className="flex items-center gap-2 text-white">
              <span>En</span>
              <IoIosArrowDown />
            </div>
            <Link to={'/register'}>
            <div className="flex items-center gap-2 text-white">
              <LuUser />
              Account
            </div>
            </Link>
            <div className="flex items-center gap-2 text-white">
              <BsHandbag />
              Cart
            </div>
          </div>
        </div>
        <Divider className="bg-white" />
        <div className="flex justify-between">
          <div className="flex items-center text-white gap-1">
            <span>Beleuchtung</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Growbox</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Dünger</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Erde & Substrate</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Töpfe & Behälter</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Bewässerung</span>
            <IoIosArrowDown />
          </div>
          <div className="flex items-center text-white gap-1">
            <span>Lüftung & Klimaanlage</span>
            <IoIosArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
