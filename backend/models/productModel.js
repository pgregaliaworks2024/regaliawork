import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    username: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 }, // Rating between 1 and 5
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now } // Default to current date
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: { type: String, required: true },
    sizes: { type: Array, required: true },
    bestseller: { type: Boolean },
    date: { type: Number, required: true },
    reviews: [reviewSchema]
});

const productModel = mongoose.models.product || mongoose.model('product', productSchema);

export default productModel;