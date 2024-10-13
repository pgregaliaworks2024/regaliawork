import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { MdReviews } from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";
import { FaWarehouse } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { IoAddCircle } from "react-icons/io5";
import { RiTeamFill } from "react-icons/ri";

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen border-r-2'>
        <div className='flex flex-col gap-4 pt-6 pl-[20%] text-[15px]'>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/add">
                <IoAddCircle className='w-5 h-5'/>
                <p className='hidden md:block'>Add Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/list">
                <FaList className='w-5 h-5'/>
                <p className='hidden md:block'>List Items</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/orders">
                <FaWarehouse  className='w-5 h-5'/>
                <p className='hidden md:block'>Orders</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/promo">
                <BiSolidDiscount className='w-5 h-5'/>
                <p className='hidden md:block'>Promocode</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/reviews">
                <MdReviews className='w-5 h-5'/>
                <p className='hidden md:block'>Reviews</p>
            </NavLink>

            <NavLink className='flex items-center gap-3 border border-gray-300 border-r-0 px-3 py-2 rounded-l' to="/jobs">
                <RiTeamFill className='w-5 h-5'/>
                <p className='hidden md:block'>Job</p>
            </NavLink>

        </div>

    </div>
  )
}

export default Sidebar