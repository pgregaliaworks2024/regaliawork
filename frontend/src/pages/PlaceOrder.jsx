import React, { useContext, useState, useEffect } from 'react';
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const PlaceOrder = () => {
    const [method, setMethod] = useState('razorpay'); // Default to Razorpay
    const [promoCode, setPromoCode] = useState('');
    const [promoMessage, setPromoMessage] = useState('');
    const [promoValid, setPromoValid] = useState(false);
    const [discount, setDiscount] = useState(0); // State for discount percentage
    const [discountedPrice, setDiscountedPrice] = useState(null); // State for discounted price
    const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    });

    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await axios.get(`${backendUrl}/api/promocode/promos`, { headers: { Authorization: `Bearer ${token}` } });
                if (!response.data.success) {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.error(error);
                toast.error(error.message || 'Failed to fetch promo codes');
            }
        };

        fetchPromoCodes();
    }, [backendUrl, token]);

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setFormData(data => ({ ...data, [name]: value }));
    };

    const handlePromoCodeChange = (event) => {
        setPromoCode(event.target.value);
    };

    const applyPromoCode = async () => {
        try {
            // Fetch all promo codes from the backend
            const response = await axios.get(`${backendUrl}/api/promocode/promos`, { headers: { Authorization: `Bearer ${token}` } });
            const promoCodes = response.data.data;
    
            // Find if the entered promo code is valid
            const validPromo = promoCodes.find(promo => promo.promo === promoCode);
    
            if (validPromo) {
                // Assuming the discount is stored in validPromo.discount
                const discountValue = validPromo.discount; // Adjust according to your data structure
                setPromoMessage(`Discount of ${discountValue}% applied successfully!`);
                setPromoValid(true);
    
                // Calculate and update the discounted price
                const totalAmount = getCartAmount();
                const discountAmount = (totalAmount * discountValue) / 100;
                setDiscount(discountValue);
                setDiscountedPrice(totalAmount - discountAmount + delivery_fee + 5);
            } else {
                setPromoMessage('Invalid promo code');
                setPromoValid(false);
                setDiscountedPrice(null); // Reset discounted price if invalid
            }
        } catch (error) {
            console.error(error);
            setPromoMessage('Error applying promo code');
            setPromoValid(false);
            setDiscountedPrice(null); // Reset discounted price on error
        }
    };

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Order Payment',
            description: 'Order Payment',
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                response.address=order.address;
                response.items=order.items
                try {
                    const { data } = await axios.post(`${backendUrl}/api/order/verifyRazorpay`, response, { headers: { token } });
                    if (data.success) {
                        navigate('/orders');
                        setCartItems({});
                    }
                } catch (error) {
                    console.error(error);
                    toast.error(error.message || 'Payment verification failed');
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            let orderItems = [];

            for (const items in cartItems) {
                for (const item in cartItems[items]) {
                    if (cartItems[items][item] > 0) {
                        const itemInfo = structuredClone(products.find(product => product._id === items));
                        if (itemInfo) {
                            itemInfo.size = item;
                            itemInfo.quantity = cartItems[items][item];
                            orderItems.push(itemInfo);
                        }
                    }
                }
            }

            // Calculate final amount after discount
            const totalAmount = getCartAmount();
            const finalAmount = discountedPrice !== null ? discountedPrice : totalAmount + delivery_fee;
            let orderData = {
                address: formData,
                items: orderItems,
                amount: finalAmount
            };

            if (method === 'razorpay') {
                const responseRazorpay = await axios.post(`${backendUrl}/api/order/razorpay`, orderData, { headers: { token } });
                if (responseRazorpay.data.success) {
                    initPay(responseRazorpay.data.order);
                } else {
                    toast.error(responseRazorpay.data.message);
                }
            } else {
                toast.error('Invalid payment method selected');
            }
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'An error occurred while placing the order');
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t'>
            {/* ------------- Left Side ---------------- */}
            <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

                <div className='text-xl sm:text-2xl my-3'>
                    <Title text1={'DELIVERY'} text2={'INFORMATION'} />
                </div>
                <div className='flex gap-3'>
                    <input
                        required
                        onChange={onChangeHandler}
                        name='firstName'
                        value={formData.firstName}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='First name'
                        aria-label="First name"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name='lastName'
                        value={formData.lastName}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Last name'
                        aria-label="Last name"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name='email'
                    value={formData.email}
                    className='border border-gray-300  py-1.5 px-3.5 w-full'
                    type="email"
                    placeholder='Email address'
                    aria-label="Email address"
                />
                <input
                    required
                    onChange={onChangeHandler}
                    name='street'
                    value={formData.street}
                    className='border border-gray-300  py-1.5 px-3.5 w-full'
                    type="text"
                    placeholder='Street'
                    aria-label="Street"
                />
                <div className='flex gap-3'>
                    <input
                        required
                        onChange={onChangeHandler}
                        name='city'
                        value={formData.city}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='City'
                        aria-label="City"
                    />
                    <input
                        onChange={onChangeHandler}
                        name='state'
                        value={formData.state}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='State'
                        aria-label="State"
                    />
                </div>
                <div className='flex gap-3'>
                    <input
                        required
                        onChange={onChangeHandler}
                        name='zipcode'
                        value={formData.zipcode}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="number"
                        placeholder='Zipcode'
                        aria-label="Zipcode"
                    />
                    <input
                        required
                        onChange={onChangeHandler}
                        name='country'
                        value={formData.country}
                        className='border border-gray-300  py-1.5 px-3.5 w-full'
                        type="text"
                        placeholder='Country'
                        aria-label="Country"
                    />
                </div>
                <input
                    required
                    onChange={onChangeHandler}
                    name='phone'
                    value={formData.phone}
                    className='border border-gray-300  py-1.5 px-3.5 w-full'
                    type="number"
                    placeholder='Phone'
                    aria-label="Phone"
                />
                
            </div>

            {/* ------------- Right Side ------------------ */}
            <div className='mt-8'>

                <div className='mt-8 min-w-80'>
                    <CartTotal amount={discountedPrice !== null ? discountedPrice : getCartAmount() + delivery_fee} /> {/* Show discounted or original amount */}
                    
                    {/* Promo Code Section */}
                    <div className='mt-4'>
                        <input
                            onChange={handlePromoCodeChange}
                            value={promoCode}
                            className='border border-gray-300  py-1.5 px-3.5 w-full'
                            type="text"
                            placeholder='Enter promo code'
                            aria-label="Promo code"
                        />
                        {promoMessage && (
                            <span className={`block mt-2 ${promoValid ? 'text-green-600' : 'text-red-600'}`}>
                                {promoMessage}
                            </span>
                        )}
                        <button
                            type='button'
                            onClick={applyPromoCode}
                            className='mt-2 bg-black text-white px-4 py-2 text-sm '
                        >
                            Apply
                        </button>
                        
                        {discountedPrice !== null && (
                            <div className='mt-4 text-lg font-semibold'>
                                Discounted Price:₹{discountedPrice.toFixed(2)}
                            </div>
                        )}
                    </div>
                </div>

                <div className='mt-12'>
                    <Title text1={'PAYMENT'} text2={'METHOD'} />
                    {/* --------------- Payment Method Selection ------------- */}
                    <div className='flex gap-3 flex-col lg:flex-row'>
                        <div
                            onClick={() => setMethod('razorpay')}
                            className={`flex items-center gap-3 border p-2 px-3 cursor-pointer ${method === 'razorpay' ? 'bg-green-100' : ''}`}
                        >
                            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'razorpay' ? 'bg-green-400' : ''}`}></p>
                            <img className='h-5 mx-4' src={assets.razorpay_logo} alt="Razorpay" />
                        </div>
                    </div>

                    <div className='w-full text-end mt-8'>
                        <button type='submit' className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
