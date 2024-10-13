import React, { useState } from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets'; // Ensure you have your assets properly imported

const Career = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleExploreJobs = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="text-center text-2xl pt-10 border-t mb-6">
        <Title text1={'JOIN'} text2={'US'} />
      </div>

      <div className="my-10 flex flex-col md:flex-row justify-between items-start gap-10 mb-28">
        <div className="flex flex-col justify-center items-start gap-6 md:w-1/2">
          <p className="font-semibold text-xl text-gray-600">Our Location</p>
          <p className="text-gray-500">Jaipur, Rajasthan, IN</p>
          <p className="text-gray-500">Tel: 91 705 563 0479 <br /> Email: hr@regalia.com</p>
          <p className="font-semibold text-xl text-gray-600">Careers at Regalia</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>
          <button 
            className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500"
            onClick={handleExploreJobs}
          >
            Explore Jobs
          </button>
        </div>

        {/* Image on the Right Side */}
        <div className="md:w-1/2">
          <img className="w-full h-auto rounded-md shadow-md" src={assets.contact_img} alt="Careers" />
        </div>
      </div>

      {/* Modal for No Openings */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <h2 className="text-xl font-semibold">No Openings at This Moment</h2>
            <p className="mt-2 text-gray-500">Thank you for your interest. Please check back later.</p>
            <button 
              className="mt-4 border border-black px-4 py-2 hover:bg-black hover:text-white transition-all duration-500"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Career;
