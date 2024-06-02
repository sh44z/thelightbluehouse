import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "./UserContext.jsx";
import logo from "./assets/images/logo.png";

export default function Header() {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="relative flex flex-col md:flex-row md:justify-between items-center p-4 mt-0">
      <div className="flex justify-between w-full md:w-auto">
        <Link to="/" className="flex items-center gap-1 flex-shrink-0 mb-4 md:mb-0 order-2 md:order-2">
          <img src={logo} alt="Logo" className="w-44 h-30 mx-auto" />
        </Link>
        <button
          className="block md:hidden bg-cyan-300 rounded-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>

      <div className={`flex-col md:flex-row md:flex ${menuOpen ? 'flex' : 'hidden'} md:items-center`}>
        <ul className="flex flex-col md:flex-row md:gap-4">
          <li className="md:mb-0 mb-2">
            <Link to="/list-property" className="text-gray-700 hover:text-gray-900">List your Property</Link>
          </li>
          <li className="md:mb-0 mb-2">
            <Link to="/about-us" className="text-gray-700 hover:text-gray-900">About Us</Link>
          </li>
        </ul>
        
        <Link to={user ? '/account' : '/login'} className="md:ml-4">
          <div className="bg-cyan-300 text-white rounded-full p-2 overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && (
            <div className="text-gray-700 mt-1 md:mt-0">
              {user.name}
            </div>
          )}
        </Link>
      </div>
    </header>
  );
}
