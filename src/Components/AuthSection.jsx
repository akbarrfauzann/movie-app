import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
import Loader from "./Loader";

const AuthSection = ({ user, error, handleLogout, isDropdownOpen, setIsDropdownOpen, loading }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <div className="w-20 h-10 flex items-center justify-center">
        <Loader />
      </div>
    );
  }
  if (user) {
    return (
      <div className="relative flex items-center space-x-4">
        <span className="text-sm font-semibold">{user.displayName}</span>
        <div className="relative cursor-pointer">
          <FaCircleUser className="text-white w-8 h-8" onClick={toggleDropdown} />
          {isDropdownOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-gray-800 text-white shadow-lg rounded-lg z-10 overflow-hidden" ref={dropdownRef}>
              <li className="px-4 py-2 hover:bg-red-600 transition-colors">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="px-4 py-2 hover:bg-red-600 transition-colors">
                <Link to="/settings">Settings</Link>
              </li>
              <li className="px-4 py-2 hover:bg-red-600 transition-colors" onClick={handleLogout}>
                <button>Logout</button>
              </li>
            </ul>
          )}
          {error && <div className="absolute right-0 mt-1 text-red-500 text-sm">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex items-center space-x-4">
      <Link to="/login" className="bg-red-600 text-white font-bold px-6 py-1 rounded-2xl hover:bg-red-700 transition-colors">
        LOGIN
      </Link>
      <Link to="/register" className="text-white font-bold px-6 py-1 hover:text-red-600 transition-colors whitespace-nowrap">
        SIGN UP
      </Link>
    </div>
  );
};

export default AuthSection;
