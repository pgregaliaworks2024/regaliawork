import mongoose from "mongoose";

const promoSchema = new mongoose.Schema({
    promo: { type: String, required: true },
    discount: { type: Number, required: true },
    expire: { type: Date, required: true },
    used: { type: Number, default:0 },
});

const promoModel = mongoose.models.promo || mongoose.model("promos", promoSchema);

export default promoModel;
