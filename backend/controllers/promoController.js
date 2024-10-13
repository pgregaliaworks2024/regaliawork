import promoModel from "../models/promoModel.js";

const createPromo = async (req, res) => {
    try {
        const { promo, discount, expire } = req.body;

        // Create promo data object
        const promoData = {
            promo,
            discount: Number(discount),
            expire: new Date(expire) // Use the provided expiration date
        };

        console.log(promoData);

        // Create and save the promo
        const newPromo = new promoModel(promoData);
        await newPromo.save();

        res.json({ success: true, message: "Promo Created" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Function to get all promo codes
const getAllPromos = async (req, res) => {
    try {
        // Fetch all promo codes from the database
        const promos = await promoModel.find();
        res.json({ success: true, data: promos });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deletePromo = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the promo code exists
        const promo = await promoModel.findById(id);
        if (!promo) {
            return res.status(404).json({ success: false, message: "Promo code not found" });
        }

        // Delete the promo code
        await promoModel.findByIdAndDelete(id);

        res.json({ success: true, message: "Promo code deleted successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
};

export { createPromo, getAllPromos, deletePromo };
