import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
  const { getCartAmount,getCartCount } = useContext(ShopContext);

  return (
    <div className="w-full p-6 border rounded-xl shadow-md bg-white text-gray-800">
      <h3 className="text-2xl font-semibold mb-4 border-b pb-2">Cart Summary</h3>

      <div className="flex flex-col gap-3 text-base">
      <div className="flex justify-between">
          <span>Cart Quantity</span>
          <span className="text-lg font-medium mr-1">{getCartCount()}</span>
        </div>
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>
            <span className="text-lg font-medium mr-1">₹</span>
            {getCartAmount()}.00
          </span>
        </div>
        
        <div className="flex justify-between">
          <span>Shipping Fee</span>
          <span className="text-green-600 font-medium">Free</span>
        </div>

        <hr className="my-2" />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>
            <span className="text-xl text-black mr-1">₹</span>
            {getCartAmount()}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
