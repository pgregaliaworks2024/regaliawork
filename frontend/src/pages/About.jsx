import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

const About = () => {
return (
<div>

  <div className='text-2xl text-center pt-8 border-t'>
    <Title text1={'ABOUT'} text2={'US'} />
  </div>

  <div className='my-6 flex flex-col md:flex-row gap-16 mt-8'>
    {/* <img className='w-full md:max-w-[450px]' src={assets.about} alt="" /> */}
    <video className='w-full md:max-w-[450px] border' controls autoPlay>
      <source src={assets.about} type="video/mp4" />
      Your browser does not support the video tag.
    </video>

    <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
      <p>Welcome to Regalia, your ultimate destination for Gen Z streetwear and trendy t-shirts. Based in the heart of
        Jaipur, Regalia goes beyond being just a clothing brand—it's a lifestyle, a movement, and a community for those
        who dare to be different. We specialize in unique, high-quality streetwear, from statement-making t-shirts to
        bold outfits that embody the vibrant spirit of youth today. Whether you're looking for the perfect graphic tee
        or the latest street style trends.</p>
      <p>
        Regalia has you covered. Our collection is crafted to empower you to express your individuality and make a
        statement with every piece. Join us in redefining streetwear and discover the t-shirts and clothing that speak
        your language, one outfit at a time.
      </p>
      <b className='text-gray-800'>Our Mission</b>
      <p>At Regalia, our mission is to build a vibrant community for graphic designers and bold thinkers, where
        creativity meets cutting-edge streetwear. We empower visionaries to express their ideas through unique designs
        and innovative fashion.</p>
    </div>
  </div>

  <div className=' text-xl py-4'>
    <Title text1={'WHY'} text2={'CHOOSE US'} />
  </div>

  <div className='flex flex-col md:flex-row text-sm mb-20'>
    <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Quality Assurance:</b>
      <p className=' text-gray-600'>At Regalia, we are committed to delivering premium-quality streetwear and graphic
        t-shirts that stand out in style and durability. Every piece is crafted with meticulous attention to detail,
        ensuring top-notch fabrics, perfect fits, and lasting wear for the trendsetters of Gen Z.</p>
    </div>
    <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Convenience:</b>
      <p className=' text-gray-600'>Regalia makes shopping for trendy streetwear and graphic t-shirts effortless with a
        seamless online experience and fast delivery options. Enjoy the convenience of browsing the latest styles,
        placing orders, and receiving your favorite pieces right at your doorstep.</p>
    </div>
    <div className='px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
      <b>Exceptional Customer Service:</b>
      <p className=' text-gray-600'>At Regalia, we prioritize exceptional customer service, ensuring a smooth shopping
        experience for every streetwear enthusiast. Our dedicated support team is always ready to assist with your
        orders, inquiries, and style needs, providing a personalized touch to your fashion journey.</p>
    </div>
  </div>
</div>
)
}

export default About