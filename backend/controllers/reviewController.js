import productModel from "../models/productModel.js"

const addReview = async (req, res) => {
    try {
        const { productId, username, rating, comment, date } = req.body;

        // Validate input
        if (!productId || !username || rating < 1 || rating > 5 || !comment) {
            return res.status(400).json({ success: false, message: "All fields are required and rating must be between 1-5." });
        }

        // Find the product by ID
        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        // Add the review to the product's reviews array
        product.reviews.push({ username, rating, comment, date: date || Date.now() }); // Use provided date or current date
        await product.save();

        res.json({ success: true, message: "Review added successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to get all reviews for a specific product
const getReviews = async (req, res) => {
    try {
        const { productId } = req.params; // Use params to get the product ID from the URL
        const product = await productModel.findById(productId);

        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        res.json({ success: true, reviews: product.reviews });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to delete a review
const deleteReview = async (req, res) => {
    try {
        const { productId, reviewId } = req.body; // Get productId and reviewId from request body

        const product = await productModel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found." });
        }

        product.reviews = product.reviews.filter(review => review._id.toString() !== reviewId);
        await product.save();

        res.json({ success: true, message: "Review deleted successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export{getReviews, deleteReview, addReview}