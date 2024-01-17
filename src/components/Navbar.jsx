// src/components/Navbar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ loggedIn, onLogout, username }) => {
  const location = useLocation();

  const isCartPage = location.pathname === "/cart";
  const isOrderPage = location.pathname === "/order";

  const handleLogout = () => {
    if (isCartPage || isOrderPage) {
      window.location.href = "/login";
    } else {
      onLogout();
    }
  };

  return (
    <nav className="bg-blue-600  p-5">
      <div className="container mx-auto flex items-center justify-between">
        <Link
          to={loggedIn ? "/Home" : "/"}
          className="flex items-center text-white text-lg font-bold "
        >
          Gadget Shop
        </Link>

        <div className="flex space-x-4">
          <Link
            to={loggedIn ? "/Home" : "/"}
            className="flex items-center text-white  transition duration-300"
          >
            หน้าแรก
          </Link>

          {loggedIn ? (
            <div className="flex items-center">
              <Link
                to="/cart"
                className="flex items-center text-white  transition duration-300"
              >
                ตะกร้า 
              </Link>

             
              <button
                onClick={handleLogout}
                className="flex items-center text-white  ml-4 transition duration-300"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <Link
              to="/Login"
              className="flex items-center text-white  transition duration-300"
            >
              เข้าสู่ระบบ
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
