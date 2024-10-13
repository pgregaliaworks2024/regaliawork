import React from 'react';
import Slider from 'react-slick';
import { assets } from '../assets/assets';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Hero = () => {
  // Carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Hide arrows for a cleaner look
  };

  return (
    <div className="flex flex-col sm:flex-row overflow-hidden">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex flex-col items-center justify-center py-10 sm:py-0 px-5 bg-gray-50">
        <div className="text-[#414141] text-center">
          <div className="flex items-center gap-1 mb-4 justify-center">
            <p className="font-medium text-sm md:text-base">GET READY TO GO</p>
          </div>
          <h1 className="prata-regular text-4xl sm:text-5xl lg:text-6xl leading-relaxed animate-fall">
            MAD IN BHARAT
          </h1>
          <div className="flex items-center gap-2 mt-4 justify-center">
            <button className="font-semibold text-sm md:text-base bg-black text-white py-2 px-4 shadow-md transition duration-200 hover:bg-gray-800">
              SHOP NOW AND DIVE INTO EXCITEMENT!
            </button>
          </div>
        </div>
      </div>

      {/* Hero Right Side - Image Carousel */}
      <div className="w-full sm:w-1/2 h-30vh sm:h-50vh relative">
        <Slider {...settings}>
          <div className="h-full">
            <img className="w-full h-full object-cover" src={assets.hero_img} alt="Slide 1" />
          </div>
          <div className="h-full">
            <img className="w-full h-full object-cover" src={assets.hero_img1} alt="Slide 2" />
          </div>
          <div className="h-full">
            <img className="w-full h-full object-cover" src={assets.hero_img2} alt="Slide 3" />
          </div>
          {/* Add more slides as needed */}
        </Slider>
      </div>
    </div>

  );
};

export default Hero;
