import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import razorpay from "razorpay";
import nodemailer from 'nodemailer';

// Global variables
const currency = "inr";

// Initialize Razorpay instance
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Set up Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Placing orders using Razorpay Method
const placeOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    // Create an order in Razorpay
    const options = {
      amount: amount * 100, // Amount in paise
      currency: currency.toUpperCase(),
      receipt: `${Date.now()}_${userId}`,
    };

    razorpayInstance.orders.create(options, async (error, order) => {
      if (error) {
        console.log(error);
        return res.json({ success: false, message: error.message });
      }

      // Send the order details to the client for payment
      res.json({
        success: true,
        order: {
          id: order.id,
          currency: order.currency,
          amount: order.amount,
          receipt: order.receipt,
          address: address,
          items: items,
        },
      });
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Verify Razorpay Payment
const verifyRazorpay = async (req, res) => {
  try {
    const { userId, razorpay_order_id, payment_id, signature, address, items } = req.body;

    // Fetch the order details from Razorpay
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

    if (orderInfo.status === "paid") {
      // Create the order record in the database
      const orderData = {
        userId,
        items: items, // Use actual items
        address: address, // Use actual address
        amount: orderInfo.amount / 100, // Convert paise to main currency unit
        paymentMethod: "Razorpay",
        payment: true,
        status: "Order Placed",
        date: Date.now(),
        razorpayOrderId: orderInfo.id,
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();

      // Clear the user's cart
      await userModel.findByIdAndUpdate(userId, { cartData: {} });

      // Fetch user details
      const user = await userModel.findById(userId);

      // Send confirmation email to the user
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Order Confirmation',
        text: `Dear ${user.name},\n\nYour order has been successfully placed.\n\nOrder ID: ${orderInfo.id}\nAmount: ₹${orderInfo.amount / 100}\n\nThank you for shopping with us!\n\nBest Regards,\nYour Company Name`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });

      res.json({
        success: true,
        message: "Payment Successful and Order Placed",
      });
    } else {
      res.json({ success: false, message: "Payment Failed" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// All Orders data for Admin Panel
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// User Order Data For Frontend
const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// Update order status from Admin Panel
const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await orderModel.findByIdAndUpdate(orderId, { status });
    res.json({ success: true, message: "Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export {
  verifyRazorpay,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
