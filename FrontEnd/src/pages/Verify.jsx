import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaCheckCircle } from 'react-icons/fa';
import { ClipLoader } from 'react-spinners';
import styled, { keyframes } from 'styled-components';

// Animation for checkmark
const checkmarkAnimation = keyframes`
  0% {
    transform: scale(0.8);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const AnimatedCheckmark = styled(FaCheckCircle)`
  animation: ${checkmarkAnimation} 0.6s ease-in-out;
  color: #10b981;
`;

const Verify = () => {
  const { token, setCartItems, backendURL } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState('verifying'); 
  const [initialLoad, setInitialLoad] = useState(true);

  const success = searchParams.get('success');
  const orderId = searchParams.get('orderId');

  const verifyPayment = async () => {
    try {
      if (!token) {
        setStatus('error');
        return;
      }

      const response = await axios.post(
        `${backendURL}/api/order/verifyStripe`,
        { success, orderId },
        { headers: { token } }
      );

      if (response.data.success) {
        setCartItems({});
        setStatus('success');
        toast.success('Payment Successful');
        setTimeout(() => navigate('/orders'), 3000);
      } else {
        setStatus('error');
        toast.error('Payment verification failed');
        setTimeout(() => navigate('/cart'), 3000);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setStatus('error');
      toast.error('An error occurred during verification');
      setTimeout(() => navigate('/cart'), 3000);
    } finally {
      setInitialLoad(false);
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  // Prevent flash of content by showing nothing during initial load
  if (initialLoad) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <ClipLoader size={50} color="#6C63FF" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      {status === 'verifying' ? (
        <>
          <ClipLoader size={50} color="#6C63FF" />
          <p className="mt-4 text-gray-600">Verifying your payment...</p>
        </>
      ) : status === 'success' ? (
        <>
          <AnimatedCheckmark className="text-6xl mb-4" />
          <h2 className="text-2xl font-semibold text-green-600">
            Payment Successful!
          </h2>
          <p className="text-gray-500 mt-2">
            Thank you for your purchase. Redirecting to your orders...
          </p>
        </>
      ) : (
        <>
          <div className="text-red-500 text-6xl mb-4">✕</div>
          <h2 className="text-2xl font-semibold text-red-600">
            Payment Verification Failed
          </h2>
          <p className="text-gray-500 mt-2">
            We couldn't verify your payment. Redirecting you back to cart...
          </p>
        </>
      )}
    </div>
  );
};

export default Verify;