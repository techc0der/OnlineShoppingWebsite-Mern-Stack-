import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../context/context';
import Cookies from 'js-cookie';
const Navbar = ({ cartproduct, setcartproduct }) => {
  const navigate = useNavigate();
  const { setloginbtn, loginbtn, setproduct } = useContext(products)

  const openSellerPage = () => {
    const sellerWindow = window.open('http://localhost:5174/', '_blank');
    if (sellerWindow) {
      sellerWindow.focus();
    }
  };
  const logout = (e) => {
    e.preventDefault();
    Cookies.remove('token');
    navigate('/');
    setloginbtn(true);
  }

  return (
    <nav className="flex justify-center w-100vw h-20 bg-[#3b5d50]">
      <div className="w-[100rem] p-10 px-28 flex justify-between items-center">
        <div>
          <Link
            className='text-4xl font-bold text-white after:content-["."] after:text-slate-400'
            to="/"
          >
            E<span className="text-slate-400">-</span>com
          </Link>
        </div>
        <div className="flex gap-10">
          <div>
            <Link to="/" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link">
              Home
            </Link>
          </div>
          <div>
            <Link to="/shop" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link" >
              Product
            </Link>
          </div>
          <div>
            <button
              className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"
              id="link"
              onClick={openSellerPage}
            >
              Seller
            </button>
          </div>
          {loginbtn ?
            <div>
              <Link
                to="/login"
                id="link"
                className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"

              >
                Login
              </Link>
            </div> :
            <div className='flex gap-10'>
              <div>
                <Link
                  to="/profile"
                  id="link"
                  className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"
                >
                  Profile
                </Link>
              </div>
              <div>
                <Link
                  to="/profile"
                  id="link"
                  className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white"
                  onClick={logout}
                >
                  Logout
                </Link>
              </div>
              <div>
                <Link to="/cart" className="text-gray-400 text-[19px] font-semibold hover:text-white focus:text-white" id="link">
                  <img src="./public/images'/cart.svg" className="h-5" alt="Cart" />
                </Link>
              </div>
            </div>

          }
        </div>
      </div>
    </nav>
  );
};

export default Navbar;