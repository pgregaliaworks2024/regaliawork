// src/pages/NotFound.jsx
import React from 'react';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 mb-12 relative">
      {/* Background "404" */}
      <h1 className="text-9xl font-bold text-gray-300 absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        4<span className="relative inline-block align-middle">
          {/* <img 
            src="https://via.placeholder.com/100" // Replace with a ghost image URL
            alt="Ghost Icon"
            className="absolute inset-0 w-20 h-20 -translate-x-1/2 -translate-y-1/2"
          /> */}
        </span>04
      </h1>

      {/* Title Section */}
      <h2 className="text-4xl font-bold text-gray-800 mt-18">Page Not Found</h2>
      
      {/* Message Section */}
      <p className="mt-4 text-lg text-gray-600 text-center">Oops! The page you are looking for does not exist.</p>
      
      {/* Button Section */}
      <a
        href="/"
        className="mt-4 px-6 py-3 text-white bg-black  hover:bg-gray-500 transition"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFound;
