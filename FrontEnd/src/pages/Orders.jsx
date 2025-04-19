import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';

const Orders = () => {
  const { products } = useContext(ShopContext);

  return (
    <div className="min-h-screen bg-white px-5 md:px-[10vw] pt-14 pb-20 border-t">
      {/* Heading */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">My Orders</h1>
        <div className="h-[2px] w-24 bg-gray-800 mt-2 rounded" />
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {products.slice(0, 3).map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 border border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300"
          >
            {/* Image */}
            <div className="md:w-28">
              <img
                src={item.image[0]}
                alt={item.name}
                className="rounded-xl object-cover w-full h-28 border"
              />
            </div>

            {/* Details */}
            <div className="flex-1 w-full">
              <h2 className="text-lg font-medium text-gray-900 mb-2">
                {item.name}
              </h2>
              <div className="flex flex-wrap text-sm text-gray-600 leading-tight ">
  <p className="mr-4 py-1"   >
    <span className="font-semibold text-gray-800">Price:</span> ₹{item.price.toLocaleString()}
  </p>
  <p className="mr-40 py-1" >
    <span className="font-semibold text-gray-800">Size:</span> M
  </p>
  <p className="mr-4 py-1" >
    <span className="font-semibold text-gray-800">Quantity:</span> 1
  </p>
  <p className='py-1'>
    <span className="font-semibold text-gray-800 " >Ordered on:</span> 25 Mar, 2025
  </p>
</div>

            </div>

            
            <div className="flex flex-col items-center text-sm text-green-600 font-medium md:w-1/6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                Ready to Ship
              </div>
            </div>

          
            <div className="md:w-1/6 flex justify-end w-full">
              <Link
                to="/track-order"
                className="text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100 transition duration-200"
              >
                Track Order
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
