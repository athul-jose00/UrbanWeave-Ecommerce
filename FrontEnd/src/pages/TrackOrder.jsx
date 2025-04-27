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
          console.log(orderDetails);

        }
      } catch (error) {
        console.log("Error fetching order:", error);
      }
    };

    fetchOrder();
  }, [id, backendURL, token]);

  const currentStep = steps.indexOf(status);

  return (
    <div className="min-h-screen bg-white px-5 md:px-[10vw] pt-20 pb-12">
      <h1 className="text-2xl font-semibold text-center mb-8">Track Your Order</h1>

      <div className="flex justify-between items-center relative mt-10 mb-20">
        {steps.map((step, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center z-10
                ${index <= currentStep ? "bg-green-500 text-white" : "bg-gray-300 text-gray-600"}`}
            >
              {index <= currentStep ? <FaCheckCircle /> : index + 1}
            </div>
            <p className="text-m mt-2 text-center">{step}</p>
          </div>
        ))}

       
        <div className="absolute top-4 left-0 w-190 h-1 bg-gray-300 z-0">
          <div
            className="h-1 bg-green-500"
            style={{
              width: `${
                currentStep === 4
                  ? 100 
                  : currentStep === 2
                  ? 58 
                  : currentStep === 3
                  ? 85
                  : currentStep === 0
                  ? 10 
                  : (currentStep / (steps.length - 1)) * 129 
              }%`,
              transition: "width 0.5s ease",
            }}
          />
        </div>
      </div>

      {orderDetails && (
  <div className="text-gray-700 bg-gray-50 rounded-xl p-6 shadow space-y-6">
    <div>
      <h2 className="text-lg font-medium mb-2">Order Details</h2>
      <p><strong>Order ID:</strong> {orderDetails._id}</p>
      <p><strong>Amount:</strong> ₹{orderDetails.amount}</p>
      <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
      <p><strong>Status:</strong> {orderDetails.status}</p>
    </div>

    <div>
      <h2 className="text-lg font-medium mb-2">Items:</h2>
      <div className="space-y-4">
        {orderDetails.items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
            <img
              src={item.image[0]}  // <-- Corrected here!
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
              <p className="text-sm text-gray-600">Size: {item.size}</p>
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
