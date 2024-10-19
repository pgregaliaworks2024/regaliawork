import express from 'express';
import { addReview, getReviews, deleteReview } from '../controllers/productController.js';
import adminAuth from '../middleware/adminAuth.js';

reviewRouter.post('/review', addReview);
reviewRouter.get('/reviews/:productId', getReviews); // Route to get all reviews for a product
reviewRouter.delete('/review', deleteReview); // Route to delete a review