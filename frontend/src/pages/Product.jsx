import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';
import { backendUrl } from '../../../admin/src/App';
import axios from 'axios';
import { PiUserCircleLight } from "react-icons/pi";
import { TbRulerMeasure } from "react-icons/tb";
import { MdClose } from "react-icons/md";


// StarRating Component for displaying and selecting stars
const StarRating = ({ rating, setRating, sizeClass = "w-5" }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <img
        key={i}
        src={i <= rating ? assets.star_icon : assets.star_dull_icon}
        alt={`${i} star`}
        className={`${sizeClass} cursor-pointer`}
        onClick={() => setRating(i)} // Allow rating selection via click
      />
    );
  }
  return <div className="flex items-center gap-1">{stars}</div>;
};

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, username } = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [activeTab, setActiveTab] = useState('description');
  const [rating, setRating] = useState(1);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);
  const [sizeGuideVisible, setSizeGuideVisible] = useState(false); // State for size guide pop-up

  const fetchProductData = async () => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
      setReviews(product.reviews || []);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    const currentDate = new Date().toLocaleDateString(); // Get the current date without time

    try {
      const response = await axios.post(`${backendUrl}/api/product/review`, {
        productId,
        username,
        rating,
        comment,
        date: currentDate, // Send the date only
      });

      if (response.data.success) {
        setReviews((prevReviews) => [
          ...prevReviews,
          { username, rating, comment, date: currentDate } // Adding only date
        ]);
        setRating(1); // Reset the rating
        setComment(''); // Clear the comment field
        alert('Review submitted successfully!');
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Failed to submit review. Please try again.');
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [productId, products]);

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* Product Images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer'
                alt=""
              />
            ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>

        {/* Product Info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <StarRating rating={reviews.length > 0 ? Math.round(reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length) : 0} />
            <p className='pl-2'>({reviews.length})</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <div className='flex justify-between items-center'>
              <p>Select Size</p>
              <button onClick={() => setSizeGuideVisible(true)} className='flex items-center text-gray-500 hover:text-black'>
                <p>Size Guide</p>
                <TbRulerMeasure className='mr-1 h-5 w-5' />
              </button>
            </div>
            <div className='flex gap-2'>
              {productData.sizes.map((item, index) => (
                <button onClick={() => setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-orange-500' : ''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size)} className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>220 GSM Fabric.</p>
            <p>Return policy within 7 days.</p>
          </div>
        </div>
      </div>

      {/* Description & Review Section */}
      <div className='mt-20'>
        <div className='flex'>
          <button
            onClick={() => setActiveTab('description')}
            className={`border px-5 py-3 text-sm ${activeTab === 'description' ? 'bg-gray-200' : ''}`}
          >
            Description
          </button>
          <button
            onClick={() => setActiveTab('reviews')}
            className={`border px-5 py-3 text-sm ${activeTab === 'reviews' ? 'bg-gray-200' : ''}`}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          {activeTab === 'description' ? (
            <>{productData.description}</>
          ) : (
            <>
              {/* Review Form */}
              <form onSubmit={handleReviewSubmit} className='mt-4'>
                <div className='flex flex-col mb-4'>
                  <strong>Write a Review -</strong>
                  <div>{username}</div>
                  <div>Rate the product-</div>
                  <StarRating rating={rating} setRating={setRating} />
                  <textarea
                    placeholder='Your Review'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    required
                    className='border p-2 mt-2'
                  />
                  <button type='submit' className='bg-black text-white px-2 py-2 mt-2 text-xs w-28'>Submit Review</button>
                </div>
              </form>
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div key={index} className='border-b pb-2 mb-2 flex flex-col items-start'>
                    <div className="flex flex-row mb-1">
                      <PiUserCircleLight className='w-10 h-10 rounded-full' />
                      <strong className='mt-1.5 ms-1'>{review.username}</strong>
                    </div>
                    <StarRating rating={review.rating} sizeClass="w-4" />
                    <p className='text-gray-400 text-xs ms-1 mt-1'>{new Date(review.date).toLocaleDateString()}</p>
                    <p className='ms-1'>{review.comment}</p>
                  </div>
                ))
              ) : (
                <p>No reviews yet.</p>
              )}
            </>
          )}
        </div>
      </div>

      {/* Size Guide Pop-up */}
      {sizeGuideVisible && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-5 shadow-lg relative'>
            <h2 className='text-lg font-bold'>Size Guide</h2>
            <img src={assets.sizeguide} alt="Size Guide" className='w-full h-auto' />
            <MdClose
              onClick={() => setSizeGuideVisible(false)}
              className='absolute top-3 right-3 cursor-pointer text-gray-600 hover:text-black'
              size={24}
            />
          </div>
        </div>
      )}

      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory} />
    </div>
  ) : <div className='opacity-0'></div>;
};

export default Product;
