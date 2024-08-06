import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => (location.pathname === path ? "text-blue-500" : "");

  return (
    <div className="bg-white dark:bg-gray-900 border-solid border-2 rounded-xl border-gray-300 dark:border-gray-700 w-64 flex-shrink-0 shadow-lg">
      <div className="flex flex-col items-center p-6">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
          <img
            src="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.2.0/svgs/solid/user-shield.svg"
            className="h-10"
            alt="Admin Logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            ADMIN
          </span>
        </a>
        <ul className="flex flex-col font-medium w-full space-y-4">
          <li>
            <Link
              to="/admin"
              className={`block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ${isActive("/admin")}`}
            >
              Home
            </Link>
          </li>
          <li className="relative">
            <button
              id="dropdownNavbarLink"
              data-dropdown-toggle="dropdownNavbar"
              className="flex items-center justify-between w-full py-2 px-4 text-gray-900 rounded hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white transition duration-300"
            >
              Dropdown{" "}
              <svg
                className="w-3 h-3 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            {/* Dropdown menu */}
            <div
              id="dropdownNavbar"
              className="hidden absolute left-0 mt-2 w-44 bg-white dark:bg-gray-700 shadow-lg rounded-lg z-10"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownNavbarLink"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Earnings
                  </a>
                </li>
              </ul>
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </div>
            </div>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={`block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ${isActive("/admin/categories")}`}
            >
              Category
            </Link>
          </li>
          <li>
            <Link
              to="/register"
              className={`block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ${isActive("/register")}`}
            >
              Register
            </Link>
          </li>
          <li>
            <Link
              to="/login"
              className={`block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ${isActive("/login")}`}
            >
              Login
            </Link>
          </li>
          <li>
            <Link
              to="/"
              className={`block py-2 px-4 rounded hover:bg-gray-200 dark:hover:bg-gray-700 dark:hover:text-white transition duration-300 ${isActive("/")}`}
            >
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
