// LayOut.js
import { Outlet } from "react-router-dom";
import Header from "./component/Header";

const LayOut = () => {
  return (
    <div className="flex w-full h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex-grow p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayOut;
