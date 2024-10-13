import React, { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import { CiSearch } from "react-icons/ci";
import { PiUserLight } from "react-icons/pi";
import { PiHandbagThin } from "react-icons/pi";
import { HiOutlineBars3CenterLeft } from "react-icons/hi2";
import { IoChevronBackCircleOutline } from "react-icons/io5";


const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  return (
    <div className='relative flex items-center justify-between py-5 font-medium'>


      <Link to='/' className='relative z-10'>
        <img src={assets.logo} className='w-20' alt="logo@regalia" />
      </Link>

      <ul className='hidden sm:flex gap-6 text-sm text-gray-700'>
        <NavLink to='/' className='flex flex-col items-center gap-1'>
          <p>HOME</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/collection' className='flex flex-col items-center gap-1'>
          <p>WARDROBE</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
        <NavLink to='/about' className='flex flex-col items-center gap-1'>
          <p>ABOUT US</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>{/* REGALIA Heading */}
        <div className='absolute inset-0 flex items-center justify-center z-[-1]'>
          {/* This text will only be visible on medium screens and above */}
          <span className='text-gray-300 text-9xl font-bold opacity-50 hidden md:block'>
            REGALIA
          </span>
          {/* This text will be visible on small screens and hidden on medium screens and above */}
          <span className='text-gray-300 text-6xl font-bold opacity-50 block md:hidden'>
            REGALIA
          </span>
        </div>

        <NavLink to='/career' className='flex flex-col items-center gap-1'>
          <p>CAREERS</p>
          <hr className='w-2/4 border-none h-[1.5px] bg-gray-700 hidden' />
        </NavLink>
      </ul>

      <div className='flex items-center gap-6'>
        <CiSearch onClick={() => { setShowSearch(true); navigate('/collection'); }}
          className='w-7 h-7 cursor-pointer' // Increased size
        />

        <div className='group relative'>
          <PiUserLight onClick={() => token ? null : navigate('/login')}
            className='w-7 h-7 cursor-pointer' // Increased size
          />
          {/* Dropdown Menu */}
          {token &&
            <div className='absolute right-0 pt-4 z-20 group-hover:block hidden'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 shadow-lg'>
                <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div>}
        </div>

        <Link to='/cart' className='relative'>
          <PiHandbagThin className='w-7 h-7 min-w-7' /> {/* Increased size */}
          <p
            className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        <HiOutlineBars3CenterLeft onClick={() => setVisible(true)}
          className='w-7 h-7 cursor-pointer sm:hidden' // Increased size
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div className={`fixed top-0 right-0 bottom-0 z-30 bg-white shadow-lg transition-transform duration-300 ease-in-out ${visible ? 'translate-x-0' : 'translate-x-full'} w-full sm:w-2/3`}>
        <div className='flex flex-col text-gray-600 h-full p-5'>
          <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-100 rounded-md transition'>
            <IoChevronBackCircleOutline className='w-7 h-7 cursor-pointer' />
            <p className='text-lg font-semibold'>Go Back</p>
          </div>

          {/* Navigation Links */}
          <nav className='flex flex-col mt-5'>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-gray-300 hover:bg-gray-100 transition' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-gray-300 hover:bg-gray-100 transition' to='/collection'>WARDROBE</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-gray-300 hover:bg-gray-100 transition' to='/about'>ABOUT US</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-2 pl-6 border-b border-gray-300 hover:bg-gray-100 transition' to='/career'>CAREERS</NavLink>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;