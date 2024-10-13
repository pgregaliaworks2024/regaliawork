import React from 'react';
import { assets } from '../assets/assets';
import { Link } from 'react-router-dom';
import { FaInstagram, FaYoutube, FaLinkedin } from 'react-icons/fa'; // Importing icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-white mt-8 py-6">
      <div className='container mx-auto flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-10 text-sm px-6'>
        <div>
          <img src={assets.logo} className='mb-4 w-32' alt="Regalia Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Regalia is a premium clothing brand that redefines urban streetwear with a luxurious touch. Known for its bold designs, high-quality fabrics, and unique prints, Regalia caters to those who are unafraid to make a statement with their style.
          </p>
        </div>

        <div>
          <p className='text-lg font-medium mb-4'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <Link to='/'><li className="hover:text-black transition">Home</li></Link>
            <Link to='/about'><li className="hover:text-black transition">About us</li></Link>
            <Link to='/orders'><li className="hover:text-black transition">Orders</li></Link>
            <Link to='/policy'><li className="hover:text-black transition">Privacy policy</li></Link>
            <Link to='/returnpolicy'><li className="hover:text-black transition">Cancel & Return policy</li></Link>

          </ul>
        </div>

        <div>
          <p className='text-lg font-medium mb-4'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+91 7055630479</li>
            <li>support@regaliastore.in</li>
          </ul>
          {/* Social Media Links */}
          <div className='flex space-x-4 mt-4'>
            <a href="https://www.instagram.com/regaliastore.in" target="_blank" rel="noopener noreferrer" className='hover:text-black transition'>
              <FaInstagram size={24} />
            </a>
            {/* <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className='hover:text-black transition'>
              <FaYoutube size={24} />
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className='hover:text-black transition'>
              <FaLinkedin size={24} />
            </a> */}
          </div>
        </div>
      </div>

      <div className='border-t mt-6 pt-3'>
        <p className='text-sm text-center text-gray-600'>Copyright 2024 © regalia.com - All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
