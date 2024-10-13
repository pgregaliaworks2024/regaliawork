import validator from "validator";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import userModel from "../models/userModel.js";
import nodemailer from 'nodemailer';
import crypto from 'crypto';

let otpStorage = {}; 

// Create JWT token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET);
}

// Configure Nodemailer transport
const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email service
    auth: {
        user: process.env.EMAIL_USER, // your email address
        pass: process.env.EMAIL_PASS  // your email password
    }
});

// Send email with a logo and consistent formatting
const sendEmail = async (to, subject, name, bodyContent) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: `
            <div style="font-family: Arial, sans-serif; text-align: left;">
                <p>Dear ${name},</p>
                <p>${bodyContent}</p>
                <p>Thanks & Regards,<br>Team Regalia</p>
                <div style="margin-top: 20px;">
                    <img src="https://res-console.cloudinary.com/dctdggqv0/thumbnails/v1/image/upload/v1728801751/bG9nb196ejl0d2E=/preview" alt="Logo" style="width: 95px; height: 95px;"/>
                </div>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`${subject} sent successfully.`);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Send welcome email
const sendWelcomeEmail = async (to, name) => {
    const subject = 'Welcome to Our Service!';
    const bodyContent = `Thank you for creating an account with us. We are thrilled to have you on board! If you have any questions or need assistance, feel free to reach out.`;
    await sendEmail(to, subject, name, bodyContent);
}

// Route for user registration
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Checking if user already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        // Validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" });
        }

        // Hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });

        const user = await newUser.save();
        const token = createToken(user._id);

        // Sending welcome email
        await sendWelcomeEmail(user.email, user.name);

        res.json({ success: true, token });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for user login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = createToken(user._id);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Route for admin login
const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Generate and send OTP
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        // Check if user exists
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User does not exist" });
        }

        // Generate OTP and expiry
        const otp = crypto.randomInt(100000, 999999).toString();
        const expiry = Date.now() + 3 * 60 * 1000; // 3 minutes

        // Store OTP and expiry
        otpStorage[email] = { otp, expiry };

        // Send OTP email
        const subject = 'Password Reset OTP';
        const bodyContent = `Your OTP for password reset is ${otp}. It will expire in 3 minutes.`;
        await sendEmail(email, subject, user.name, bodyContent);

        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Verify OTP and reset password
const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const storedOtp = otpStorage[email];

        if (!storedOtp || storedOtp.otp !== otp || Date.now() > storedOtp.expiry) {
            return res.json({ success: false, message: "Invalid or expired OTP" });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user's password
        await userModel.updateOne({ email }, { password: hashedPassword });

        // Send confirmation email
        const subject = 'Password Reset Successful';
        const bodyContent = 'Your password has been successfully reset.';
        await sendEmail(email, subject, user.name, bodyContent);

        res.json({ success: true });

        // Remove OTP after successful reset
        delete otpStorage[email];
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const getUserProfile = async (req, res) => {
    try {
        const userId = req.body.userId; // Or use req.user.id if you're setting it in middleware
        const user = await userModel.findById(userId).select('name'); // Fetch name

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.json({ success: true, user: { name: user.name } });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
};


export { loginUser, registerUser, adminLogin, requestPasswordReset, resetPassword, getUserProfile };
