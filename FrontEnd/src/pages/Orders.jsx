import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import axios from "axios";

const Orders = () => {
  const { backendURL, token } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        backendURL + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrderItems = [];
        console.log(response.data.orders);

        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["orderId"] = order._id;
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrderItems.push(item);
          });
        });

        // FILTER: only keep items that are NOT delivered
        const notDeliveredItems = allOrderItems.filter(
          (item) => item.status !== "Delivered"
        );

        setOrderData(notDeliveredItems.reverse());
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const getTextColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "text-yellow-600";
      case "Packing":
        return "text-blue-600";
      case "Shipped":
        return "text-indigo-600";
      case "Out for Delivery":
        return "text-orange-600";
      case "Delivered":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const getDotColor = (status) => {
    switch (status) {
      case "Order Placed":
        return "bg-yellow-500";
      case "Packing":
        return "bg-blue-500";
      case "Shipped":
        return "bg-indigo-500";
      case "Out For Delivery":
        return "bg-orange-500";
      case "Delivered":
        return "bg-green-500";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-white px-5 md:px-[10vw] pt-14 pb-20 group">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-8 text-center">
          My Orders
          <span className="block h-1 w-20 bg-gray-800 mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-150 rounded-full" />
        </h1>
      </div>

      <div className="space-y-6">
        {orderData.length > 0 ? (
          orderData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-5 border border-gray-200 shadow-sm rounded-2xl hover:shadow-md transition-all duration-300"
            >
              <div className="md:w-28">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="rounded-xl object-cover w-full h-28 border"
                />
              </div>

              <div className="flex-1 w-full">
                <h2 className="text-lg font-medium text-gray-900 mb-2">
                  {item.name}
                </h2>
                <div className="flex flex-wrap text-sm text-gray-600 leading-tight">
                  <p className="mr-4 py-1">
                    <span className="font-semibold text-gray-800">Price:</span> ₹
                    {item.price.toLocaleString()}
                  </p>
                  <p className="mr-40 py-1">
                    <span className="font-semibold text-gray-800">Size:</span>{" "}
                    {item.size}
                  </p>
                  <p className="mr-4 py-1 mt-1">
                    <span className="font-semibold text-gray-800">Quantity:</span>{" "}
                    {item.quantity}
                  </p>
                  <p className="py-1 mt-1">
                    <span className="font-semibold text-gray-800">Ordered on:</span>{" "}
                    {new Date(item.date).toDateString()}
                  </p>
                  <p className="py-2">
                    <span className="font-semibold text-gray-800">
                      Payment Method:
                    </span>{" "}
                    {item.paymentMethod}
                  </p>
                </div>
              </div>

              <div
                className={`flex flex-col items-center text-sm font-medium md:w-1/6 ${getTextColor(item.status)}`}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getDotColor(item.status)}`} />
                  {item.status}
                </div>
              </div>

              <div className="md:w-1/6 flex justify-end w-full">
                <Link
                  to={`/track-order/${item.orderId}`}
                  className="text-sm px-4 py-2 rounded-full border border-gray-300 text-gray-800 hover:bg-gray-100 transition duration-200"
                >
                  Track Order
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 text-lg">
            No pending orders 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
