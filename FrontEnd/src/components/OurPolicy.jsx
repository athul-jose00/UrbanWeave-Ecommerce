import React from 'react';
import { assets } from '../assets/assets';

const OurPolicy = () => {
  return (
    <div className="flex flex-col md:flex-row justify-around items-center gap-16 md:gap-10 mt-20 text-gray-800">
      
      {/* Quality */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img 
          src={assets.quality_icon} 
          alt="Quality Assurance" 
          className="w-20 h-20 mb-6"
        />
        <h3 className="text-xl font-semibold mb-3">Premium Quality Guaranteed</h3>
        <p className="text-gray-500 text-base">
          Every product is carefully crafted and inspected to meet our high standards of excellence.
        </p>
      </div>

      {/* Easy Return */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img 
          src={assets.fast} 
          alt="Easy Returns" 
          className="w-20 h-20 mb-6"
        />
        <h3 className="text-xl font-semibold mb-3">7-Day Easy Returns</h3>
        <p className="text-gray-500 text-base">
          Hassle-free returns within 7 days to ensure you are completely satisfied with your purchase.
        </p>
      </div>

      {/* Customer Support */}
      <div className="flex flex-col items-center text-center max-w-xs">
        <img 
          src={assets.support_img} 
          alt="Customer Support" 
          className="w-20 h-20 mb-6"
        />
        <h3 className="text-xl font-semibold mb-3">24/7 Customer Support</h3>
        <p className="text-gray-500 text-base">
          Our team is always here to help you with any queries or support you may need.
        </p>
      </div>

    </div>
  );
};

export default OurPolicy;
  