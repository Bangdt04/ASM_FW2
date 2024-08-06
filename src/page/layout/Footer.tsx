import { AiOutlineYoutube } from "react-icons/ai";
import { BsEnvelope } from "react-icons/bs";
import {
  FaArrowUp,
  FaAsterisk,
  FaFacebook,
  FaInstagram,
  FaTwitter,
} from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa6";
const Footer = () => {
  const Icon = [
    { icon: <FaFacebook /> },
    { icon: <FaTwitter /> },
    { icon: <FaLinkedinIn /> },
    { icon: <AiOutlineYoutube /> },
    { icon: <FaInstagram /> },
  ];
  const menuData = [
    {
      category: "Um",
      items: [
        "Kontaktiere Uns",
        "Über Uns",
        "Karriere",
        "Unternehmensinformationen",
      ],
    },
    {
      category: "Hilfe",
      items: [
        "Unsere Produzenten",
        "Zahlung",
        "Versand",
        "Stornierung & Rückgabe",
        "Verstoß Melden",
      ],
    },
    {
      category: "politik",
      items: [
        "Rücknahmegarantie",
        "Nutzungsbedingungen",
        "Sicherheit",
        "Privatsphäre",
        "Seitenverzeichnis",
      ],
    },
  ];
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <div className="w-full h-auto">
      <div className="w-[70%]  mx-auto py-24 flex flex-col gap-10">
        <div className="flex flex-col ">
          <div className="flex gap-3">
            <p className="text-neutral-600 text-[40px] font-normal font-['Baloo'] leading-[46px] tracking-tight">
              Etwas abonnieren
            </p>
            <FaAsterisk className="text-[25px]" />
          </div>
          <div className="flex gap-3">
            <p className="text-neutral-600 text-[40px] font-normal font-['Baloo'] leading-[46px] tracking-tight">
              _ Unser Newsletter
            </p>
          </div>
        </div>
        <div className=" flex justify-between w-[90%] mx-auto">
          <p className="text-[14.04px]">
            Get weekly update about our <br /> product on your email, no spam
            <br />
            guaranteed we promise ✌️
          </p>
          <div>
            <div className="flex relative bg-white items-center gap-3  p-3 w-[500px] rounded-lg">
              <div className="bg-[#F8F8F8] p-3">
                <BsEnvelope />
              </div>
              <input
                type="text"
                placeholder="youremail123@gmail.com"
                className="w-full focus:outline-none focus:border-transparent"
              />
              <button className="bg-[#656C66] rounded-lg right-0 top-10 py-4 px-6 text-white absolute">
                ABONNIEREN
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full bg-[#053D29]">
        <div className="w-[80%] flex justify-between mx-auto text-white p-7 ">
          <div className="flex flex-col gap-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing <br />
              elit, sed do eiusmod tempor incididunt ut labore et <br />
              dolore magna aliqua
            </p>
            <div className="flex gap-6">
              {Icon.map((item, index) => (
                <div key={index}>{item.icon}</div>
              ))}
            </div>
          </div>
          {menuData.map((category, index) => (
            <div key={index} className="flex flex-col gap-5">
              <h3>{category.category}</h3>
              <ul className="flex flex-col gap-2">
                {category.items.map((item, itemIndex) => (
                  <li key={itemIndex}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full bg-[#062F21]">
        <div className="w-[80%] mx-auto flex justify-between py-3 text-white">
          <p> 2023 hood.de , Inc.</p>
          <img src="/public/images/thanhtoan.png" alt="" />
          <button className="flex gap-2 items-center" onClick={handleClick}>
            Scroll to top <FaArrowUp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
