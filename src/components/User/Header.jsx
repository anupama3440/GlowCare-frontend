import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { MdLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie'
import { userlogOut } from '../../redux/slice/userAuthSlice';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userAuth.isAuthenticated);
  // const cartItems = useSelector((state) => state.cart.items.length); 
  // const wishlistItems = useSelector((state) => state.wishlist.items.length); 

  const cartItems = 3; 
  const wishlistItems = 2; 

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseOver = () => {
    setOpen(true);
  };

  const handleMouseLeave = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(userlogOut());
    Cookies.remove('userAccessToken')
    Cookies.remove('userRefreshToken');
    navigate('/');
  };

  return (
    <>
      <nav className="bg-yellow-300 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center relative">

          {/* Logo */}
          <span
            onClick={() => navigate('/')}
            className="text-black text-2xl font-bold tracking-wide cursor-pointer hover:text-blue-600 transition duration-300"
          >
            GlowCare
          </span>

          {/* Center Links (Shop, About, Contact) */}
          <div className={`hidden md:flex space-x-8 items-center`}>
            <span
              onClick={() => navigate('/shop')}
              className="text-black text-lg cursor-pointer hover:underline transition duration-200"
            >
              Shop
            </span>
            <span
              onClick={() => navigate('/about')}
              className="text-black text-lg cursor-pointer hover:underline transition duration-200"
            >
              About
            </span>
            <span
              onClick={() => navigate('/contact')}
              className="text-black text-lg cursor-pointer hover:underline transition duration-200"
            >
              Contact Us
            </span>
          </div>

          {/* Right Icons (Cart, Wishlist) */}
          <div className="flex items-center space-x-4">
            {loggedIn && (
              <>
                {/* Cart Icon */}
                <div
                  onClick={() => navigate('/cart')}
                  className="relative text-black text-lg cursor-pointer hover:text-blue-300 transition duration-200"
                >
                  <FaShoppingCart size={24} />
                  {cartItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems}
                    </span>
                  )}
                </div>

                {/* Wishlist Icon */}
                <div
                  onClick={() => navigate('/wishlist')}
                  className="relative text-black text-lg cursor-pointer hover:text-blue-300 transition duration-200"
                >
                  <FaHeart size={24} />
                  {wishlistItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {wishlistItems}
                    </span>
                  )}
                </div>
              </>
            )}

            {/* Profile Icon */}
            <div
              className="relative"
              onMouseOver={handleMouseOver}
              onMouseLeave={handleMouseLeave}
            >
              <FaUserCircle className="text-white text-4xl cursor-pointer transition-all duration-200 ease-in-out transform hover:text-blue-300 hover:scale-105" />
              {open && (
                <div className="absolute right-0 bg-white shadow-xl rounded-lg p-2 w-48 z-20">
                  <div className="flex flex-col gap-2 justify-center items-center">
                    {loggedIn ? (
                      <>
                        {/* Profile link */}
                        <span className="flex gap-4 text-gray-800 hover:text-blue-600 transition duration-200 font-medium p-2 rounded-md hover:bg-blue-50 cursor-pointer">
                          <span
                            onClick={() => navigate('/profile')}
                            className="flex gap-2 items-center"
                          >
                            <CgProfile size={20} />
                            Profile
                          </span>
                        </span>
                        <hr className="border-t border-gray-300 w-full" />
                        {/* Logout option */}
                        <span
                          className="flex gap-2 text-gray-800 hover:text-red-600 transition duration-200 font-medium p-2 rounded-md hover:bg-blue-50 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <MdLogout size={20} />
                          LogOut
                        </span>
                      </>
                    ) : (
                      /* Login Button for non-authenticated users */
                      <span
                        className="flex gap-4 text-gray-800 hover:text-blue-600 transition duration-200 font-medium p-2 rounded-md hover:bg-blue-50 cursor-pointer"
                        onClick={() => navigate('/login')}
                      >
                        <FaUserCircle size={20} />
                        Login
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
          <div className="flex flex-col items-center space-y-4 mt-4">
            <div className="mb-4">
              <FaUserCircle className="text-white text-5xl" />
            </div>

            <span
              onClick={() => navigate('/shop')}
              className="text-white text-lg cursor-pointer hover:underline transition duration-200"
            >
              Shop
            </span>
            <span
              onClick={() => navigate('/about')}
              className="text-white text-lg cursor-pointer hover:underline transition duration-200"
            >
              About
            </span>
            <span
              onClick={() => navigate('/contact')}
              className="text-white text-lg cursor-pointer hover:underline transition duration-200"
            >
              Contact Us
            </span>
            {loggedIn && (
              <>
                <span
                  onClick={() => navigate('/cart')}
                  className="text-white text-lg cursor-pointer hover:underline transition duration-200"
                >
                  Cart ({cartItems})
                </span>
                <span
                  onClick={() => navigate('/wishlist')}
                  className="text-white text-lg cursor-pointer hover:underline transition duration-200"
                >
                  Wishlist ({wishlistItems})
                </span>
              </>
            )}
          </div>
        </div>

      </nav>
    </>
  );
};

export default Header;
