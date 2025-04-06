import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Appbar = () => {
  const [name, setName] = useState("User");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/me`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        const { firstName, lastName } = response.data;
        setName(`${firstName.toUpperCase()} ${lastName.toUpperCase()}`);
      } catch (error) {
        console.error("Error fetching user:", error);
        navigate("/signin");
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="shadow h-14 flex justify-between items-center px-4 bg-white">
      {/* Left section with App name */}
      <div className="text-2xl font-bold text-blue-700">PayMent</div>

      {/* Right section with user and dropdown */}
      <div className="flex items-center gap-4 relative" ref={dropdownRef}>
        <div className="text-md font-medium text-gray-800">
          Hello, {name.split(" ")[0]}
        </div>

        <div
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="rounded-full h-10 w-10 bg-blue-600 flex items-center justify-center cursor-pointer"
        >
          <span className="text-white text-lg font-bold">{name[0]}</span>
        </div>

        {dropdownOpen && (
          <div className="absolute right-0 top-14 mt-2 w-40 bg-white border rounded shadow-md z-10">
            <button
              onClick={handleHistory}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Payment History
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
