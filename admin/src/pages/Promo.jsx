import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import { assets } from '../assets/assets';

const Promo = ({ token }) => {
    const [promo, setPromo] = useState("");
    const [discount, setDiscount] = useState("");
    const [expire, setExpire] = useState("");
    const [promoCodes, setPromoCodes] = useState([]);

    // Fetch promo codes when the component mounts or token changes
    useEffect(() => {
        const fetchPromoCodes = async () => {
            try {
                const response = await axios.get(backendUrl + "/api/promocode/promos", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (response.data.success) {
                    setPromoCodes(response.data.data);
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        };

        fetchPromoCodes();
    }, [token]);

    const onSubmitHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                backendUrl + "/api/promocode/promos",
                {
                    promo,
                    discount,
                    expire
                },
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            if (response.data.success) {
                toast.success(response.data.message);
                setPromo('');
                setDiscount('');
                setExpire('');
                // Refresh the promo codes list
                const refreshedResponse = await axios.get(backendUrl + "/api/promocode/promos", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPromoCodes(refreshedResponse.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(backendUrl + `/api/promocode/promos/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (response.data.success) {
                toast.success(response.data.message);
                // Refresh the promo codes list
                const refreshedResponse = await axios.get(backendUrl + "/api/promocode/promos", {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setPromoCodes(refreshedResponse.data.data);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    return (
        <div className='flex flex-col w-full items-start gap-6'>
            <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
                <div className='w-full'>
                    <p className='mb-2'>Promo Code</p>
                    <input onChange={(e) => setPromo(e.target.value)} value={promo} className='w-full max-w-[500px] px-3 py-2' type="text" placeholder='Type here' required />
                </div>
                <div className='w-full'>
                    <p className='mb-2'>Promo Discount Value</p>
                    <input onChange={(e) => setDiscount(e.target.value)} value={discount} className='w-full max-w-[500px] px-3 py-2' type="number" placeholder='Type here' required />
                </div>
                <div className='w-full'>
                    <p className='mb-2'>Expiration Date</p>
                    <input onChange={(e) => setExpire(e.target.value)} value={expire} className='w-full max-w-[500px] px-3 py-2' type="date" placeholder='Type here' required />
                </div>
                <button type="submit" className='w-28 py-3 mt-4 bg-black text-white'>Generate</button>
            </form>

            {/* Promo Codes Table */}
            <div className='w-full mt-6 overflow-x-auto'>
                <h2 className='text-xl font-bold mb-4'>Existing Promo Codes</h2>
                <div className='relative overflow-x-auto'>
                    <table className='w-full border-collapse min-w-full'>
                        <thead>
                            <tr>
                                <th className='border px-4 py-2 text-center'>Promo Code</th>
                                <th className='border px-4 py-2 text-center'>Discount Value %</th>
                                <th className='border px-4 py-2 text-center'>Expiration Date</th>
                                <th className='border px-4 py-2 text-center'>Used</th>
                                <th className='border px-4 py-2 text-center'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {promoCodes.length > 0 ? (
                                promoCodes.map((code) => (
                                    <tr key={code._id}>
                                        <td className='border px-4 py-2 text-center'>{code.promo}</td>
                                        <td className='border px-4 py-2 text-center'>{code.discount}</td>
                                        <td className='border px-4 py-2 text-center'>{new Date(code.expire).toLocaleDateString()}</td>
                                        <td className='border px-4 py-2 text-center'>{code.used ? "Yes" : "No"}</td>
                                        <td className='border px-4 py-2 text-center'>
                                            <img
                                                src={assets.bin_icon} // Path to your delete icon image
                                                alt="Delete"
                                                onClick={() => handleDelete(code._id)}
                                                className='w-4 h-4 cursor-pointer hover:opacity-75'
                                                aria-label="Delete Promo Code"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className='border px-4 py-2 text-center'>No promo codes available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Promo;
