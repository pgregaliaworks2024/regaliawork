import React, { useContext, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { ShopContext } from '../context/ShopContext';

const Verify = () => {
    const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext);
    const [searchParams] = useSearchParams();

    const success = searchParams.get('success');
    const orderId = searchParams.get('orderId');
    const razorpayOrderId = searchParams.get('razorpayOrderId'); // For Razorpay-specific use

    const verifyPayment = async () => {
        try {
            if (!token) {
                return null;
            }

            if (success === "true" && razorpayOrderId) {
                // Verify Razorpay payment
                const response = await axios.post(
                    backendUrl + '/api/order/verifyRazorpay',
                    { razorpay_order_id: razorpayOrderId, userId: 'someUserId' }, // Adjust the payload as needed
                    { headers: { token } }
                );

                if (response.data.success) {
                    setCartItems({});
                    navigate('/orders');
                } else {
                    navigate('/cart');
                }
            } else {
                // Handle failure or invalid verification scenario
                toast.error('Payment verification failed or invalid payment method');
                navigate('/cart');
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message || 'An error occurred during payment verification');
            navigate('/cart');
        }
    };

    useEffect(() => {
        verifyPayment();
    }, [token, razorpayOrderId, success]);

    return <div>Verifying your payment...</div>;
};

export default Verify;
