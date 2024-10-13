import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

// Create a context for the shop
export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹'; // Currency used in the shop
    const delivery_fee = 100; // Fixed delivery fee
    const backendUrl = import.meta.env.VITE_BACKEND_URL; // Backend URL from environment variables
    const [search, setSearch] = useState(''); // State for search input
    const [showSearch, setShowSearch] = useState(false); // State to control search visibility
    const [cartItems, setCartItems] = useState({}); // State for cart items
    const [products, setProducts] = useState([]); // State for product list
    const [token, setToken] = useState(''); // State for user token
    const [username, setUsername] = useState(''); // State for username
    const navigate = useNavigate(); // Hook to navigate between routes

    // Function to add an item to the cart
    const addToCart = useCallback(async (itemId, size) => {
        // Check if a size is selected
        if (!size) {
            toast.error('Select Product Size'); // Notify user to select size
            return;
        }

        const updatedCart = { ...cartItems }; // Create a copy of the current cart

        // Update the cart with the new item or increment the quantity
        if (updatedCart[itemId]) {
            updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
        } else {
            updatedCart[itemId] = { [size]: 1 };
        }

        setCartItems(updatedCart); // Update the cart state

        // If user is authenticated, send the cart update to the backend
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/add`, { itemId, size }, { headers: { token } });
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message; // Handle error response
                console.error(error);
                toast.error(errorMessage); // Notify user of the error
            }
        }
    }, [cartItems, token, backendUrl]);

    // Function to get the total count of items in the cart
    const getCartCount = useCallback(() => {
        return Object.values(cartItems).reduce((total, itemSizes) => {
            return total + Object.values(itemSizes).reduce((subtotal, quantity) => subtotal + quantity, 0);
        }, 0);
    }, [cartItems]);

    // Function to update the quantity of an item in the cart
    const updateQuantity = useCallback(async (itemId, size, quantity) => {
        const updatedCart = { ...cartItems }; // Create a copy of the current cart

        // Update the quantity or remove the item if quantity is zero
        if (quantity === 0) {
            delete updatedCart[itemId][size];
            if (Object.keys(updatedCart[itemId]).length === 0) {
                delete updatedCart[itemId];
            }
        } else {
            updatedCart[itemId][size] = quantity;
        }

        setCartItems(updatedCart); // Update the cart state

        // If user is authenticated, send the quantity update to the backend
        if (token) {
            try {
                await axios.post(`${backendUrl}/api/cart/update`, { itemId, size, quantity }, { headers: { token } });
            } catch (error) {
                const errorMessage = error.response?.data?.message || error.message; // Handle error response
                console.error(error);
                toast.error(errorMessage); // Notify user of the error
            }
        }
    }, [cartItems, token, backendUrl]);

    // Function to calculate the total amount of the cart
    const getCartAmount = useCallback(() => {
        return Object.entries(cartItems).reduce((totalAmount, [itemId, itemSizes]) => {
            const itemInfo = products.find(product => product._id === itemId); // Find product info
            if (itemInfo) {
                totalAmount += Object.entries(itemSizes).reduce((subtotal, [size, quantity]) => {
                    return subtotal + (itemInfo.price * quantity); // Calculate subtotal for each item
                }, 0);
            }
            return totalAmount;
        }, 0);
    }, [cartItems, products]);

    // Function to fetch products data from the backend
    const getProductsData = useCallback(async () => {
        try {
            const response = await axios.get(`${backendUrl}/api/product/list`); // API call to get products
            if (response.data.success) {
                setProducts(response.data.products.reverse()); // Update products state
            } else {
                toast.error(response.data.message); // Notify user of the error
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message; // Handle error response
            console.error(error);
            toast.error(errorMessage); // Notify user of the error
        }
    }, [backendUrl]);

    // Function to fetch the user's cart from the backend
    const getUserCart = useCallback(async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/api/cart/get`, {}, { headers: { token } });
            if (response.data.success) {
                setCartItems(response.data.cartData); // Update cart items state
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message; // Handle error response
            console.error(error);
            toast.error(errorMessage); // Notify user of the error
        }
    }, [backendUrl]);

    // Function to fetch the username from the backend
    const fetchUsername = useCallback(async (token) => {
        try {
            const response = await axios.get(`${backendUrl}/api/user/profile`, { headers: { token } });
            if (response.data.success) {
                setUsername(response.data.user.name); // Update username state
            }
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message; // Handle error response
            console.error(error);
            toast.error(errorMessage); // Notify user of the error
        }
    }, [backendUrl]);

    // Fetch products when the component mounts
    useEffect(() => {
        getProductsData();
    }, [getProductsData]);

    // Check for token in localStorage and fetch user cart and profile if present
    useEffect(() => {
        const localToken = localStorage.getItem('token');
        if (localToken && !token) {
            setToken(localToken); // Set token if it exists in localStorage
        }
        if (token) {
            getUserCart(token); // Fetch user's cart
            fetchUsername(token); // Fetch username
        }
    }, [token, getUserCart, fetchUsername]);

    // Provide context values to components
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showSearch, setShowSearch,
        cartItems, addToCart, setCartItems,
        getCartCount, updateQuantity,
        getCartAmount, navigate, backendUrl,
        setToken, token, username
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children} {/* Render children components */}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider; // Export the provider component
