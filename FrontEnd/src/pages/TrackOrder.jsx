import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaCheckCircle } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";

const steps = [
  "Order Placed",
  "Packing",
  "Shipped",
  "Out For Delivery",
  "Delivered",
];

const TrackOrder = () => {
  const { id } = useParams(); 
  const { backendURL, token } = useContext(ShopContext);
  const [status, setStatus] = useState("");
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.post(
          `${backendURL}/api/order/get-order`,
          { id },
          { headers: { token } }
        );

        if (res.data.success) {
          setStatus(res.data.order.status);
          setOrderDetails(res.data.order);
        }
      } catch (error) {
        console.log("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id, backendURL, token]);

  const currentStep = steps.indexOf(status);

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-[10vw] pt-16 pb-10">
      <h1 className="text-xl sm:text-2xl font-semibold text-center mb-6">Track Your Order</h1>

      {/* Progress Bar - Mobile Optimized */}
      <div className="relative mt-8 mb-12 sm:mt-10 sm:mb-20">
        {/* Progress Steps - Horizontal for larger screens */}
        <div className="hidden sm:flex justify-between items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center z-10
                  ${index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
              >
                {index <= currentStep ? <FaCheckCircle /> : index + 1}
              </div>
              <p className="text-sm sm:text-base mt-2 text-center">{step}</p>
            </div>
          ))}
          
          <div className="absolute top-4 left-0 w-full h-1 bg-gray-300 z-0">
            <div
              className="h-1 bg-green-500"
              style={{
                width: `${currentStep === 4 ? 100 : currentStep === 2 ? 58 : currentStep === 3 ? 85 : currentStep === 0 ? 10 : (currentStep / (steps.length - 1)) * 129}%`,
                transition: "width 0.5s ease",
              }}
            />
          </div>
        </div>

        {/* Progress Steps - Vertical for mobile */}
        <div className="sm:hidden relative pl-8">
          {/* Full grey line (background) */}
          <div className="absolute left-[19px] top-0 h-full w-0.5 bg-gray-300 z-0"></div>
          
          {/* Green progress line */}
          <div 
            className="absolute left-[19px] top-0 w-0.5 bg-green-500 z-0"
            style={{
              height: `${(currentStep / (steps.length - 1)) * 100}%`,
              transition: "height 0.5s ease",
            }}
          ></div>
          
          {steps.map((step, index) => (
            <div key={index} className="flex items-start gap-4 relative mb-8 last:mb-0">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center z-10 flex-shrink-0
                  ${index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
              >
                {index <= currentStep ? <FaCheckCircle size={14} /> : index + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{step}</p>
                {index === currentStep && status !== "Delivered" && (
                  <p className="text-xs text-gray-500 mt-1">Current status</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    

      {orderDetails && (
        <div className="bg-gray-50 rounded-lg p-4 sm:p-6 shadow space-y-4 sm:space-y-6">
          <div>
            <h2 className="text-lg font-medium mb-3">Order Details</h2>
            <div className="grid grid-cols-2 gap-2 text-sm sm:text-base">
              <div>
                <p className="text-gray-600">Order ID:</p>
                <p className="truncate">{orderDetails._id}</p>
              </div>
              <div>
                <p className="text-gray-600">Amount:</p>
                <p>₹{orderDetails.amount}</p>
              </div>
              <div>
                <p className="text-gray-600">Payment:</p>
                <p>{orderDetails.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-600">Status:</p>
                <p className={`${orderDetails.status === "Delivered" ? "text-green-600" : ""}`}>
                  {orderDetails.status}
                </p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-medium mb-3">Items</h2>
            <div className="space-y-3">
              {orderDetails.items.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm">
                  <img
                    src={item.image[0]}
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm sm:text-base">{item.name}</p>
                    <div className="flex gap-4 mt-1 text-xs sm:text-sm">
                      <p className="text-gray-600">Qty: {item.quantity}</p>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrackOrder;