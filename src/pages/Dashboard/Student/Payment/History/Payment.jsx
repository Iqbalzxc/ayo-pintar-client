import React from 'react'
import { loadStripe } from '@stripe/stripe-js';
import { useLocation } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE);
const Payment = () => {
  const location = useLocation();
  console.log(location);
  const price = location?.state.itemId;


  return (
    <div>Payment</div>
  )
}

export default Payment