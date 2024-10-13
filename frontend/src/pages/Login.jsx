import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const [forgotPassword, setForgotPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(180); // 3 minutes
  const [resetPasswordSuccess, setResetPasswordSuccess] = useState(false);

  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  useEffect(() => {
    let interval;
    if (otpSent && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, otpTimer]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (forgotPassword) {
      if (resetPassword) {
        try {
          const response = await axios.post(`${backendUrl}/api/user/reset-password`, { email, otp, newPassword: password });
          if (response.data.success) {
            toast.success('Password has been reset successfully');
            setResetPasswordSuccess(true);
            setForgotPassword(false);
            setResetPassword(false);
            setEmail('');
            setPassword('');
            setOtp('');
            setOtpSent(false);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      } else {
        try {
          const response = await axios.post(`${backendUrl}/api/user/request-password-reset`, { email });
          if (response.data.success) {
            toast.success('OTP sent to your email');
            setOtpSent(true);
            setResetPassword(true); // Show the form to enter OTP and new password
            setOtpTimer(180); // Reset timer
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          toast.error(error.message);
        }
      }
      return;
    }

    try {
      if (currentState === 'Sign Up') {
        const response = await axios.post(`${backendUrl}/api/user/register`, { name, email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(`${backendUrl}/api/user/login`, { email, password });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800'>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl'>{forgotPassword ? (resetPassword ? 'Reset Password' : 'Request Password Reset') : currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {!forgotPassword && currentState === 'Sign Up' && (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Name'
          required
        />
      )}

      {!forgotPassword && (
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          required
        />
      )}

      {!forgotPassword && (
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          type="password"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Password'
          required
        />
      )}

      {forgotPassword && !resetPassword && (
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          className='w-full px-3 py-2 border border-gray-800'
          placeholder='Email'
          required
        />
      )}

      {forgotPassword && resetPassword && (
        <>
          <input
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            type="text"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='Enter OTP'
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            className='w-full px-3 py-2 border border-gray-800'
            placeholder='New Password'
            required
          />
          <div className='text-red-600 text-sm'>{otpTimer > 0 ? `OTP expires in ${Math.floor(otpTimer / 60)}:${otpTimer % 60}` : 'OTP expired'}</div>
          {otpTimer <= 0 && (
            <button
              type="button"
              onClick={async () => {
                try {
                  const response = await axios.post(`${backendUrl}/api/user/request-password-reset`, { email });
                  if (response.data.success) {
                    toast.success('OTP resent to your email');
                    setOtpTimer(180); // Reset timer
                  } else {
                    toast.error(response.data.message);
                  }
                } catch (error) {
                  toast.error(error.message);
                }
              }}
              className='text-blue-600 underline'
            >
              Resend OTP
            </button>
          )}
        </>
      )}

      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p onClick={() => {
          if (forgotPassword) {
            if (resetPassword) {
              setForgotPassword(false);
              setResetPassword(false);
              setOtpSent(false);
              setOtpTimer(180);
            } else {
              setForgotPassword(false);
            }
          } else {
            setForgotPassword(true);
          }
        }} className='cursor-pointer'>
          {forgotPassword ? (resetPassword ? 'Back to Login' : 'Back to Login') : 'Forgot your password?'}
        </p>
        {!forgotPassword && (
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        )}
      </div>

      <button className='bg-black text-white font-light px-8 py-2 mt-4'>
        {forgotPassword ? (resetPassword ? 'Reset Password' : 'Send OTP') : currentState === 'Login' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  );
};

export default Login;
