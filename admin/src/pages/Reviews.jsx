import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';

const Reviews = ({ productId }) => { 
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!productId) {
      setError('No product ID provided.');
      setLoading(false);
      return;
    }

    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/reviews/${productId}`);
        setReviews(response.data.reviews);
      } catch (err) {
        setError('Failed to load reviews.');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>User Reviews</h2>
      <div className='border-t'>
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review) => (
            <div key={review._id} className='border p-4 mb-2'>
              <div className='flex justify-between items-center'>
                <div>
                  <strong>{review.username}</strong> - {new Date(review.date).toLocaleDateString()}
                </div>
                <button onClick={() => handleDelete(review._id)} className='text-red-500'>Delete</button>
              </div>
              <p>Rating: {review.rating} ⭐</p>
              <p>{review.comment}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reviews;
