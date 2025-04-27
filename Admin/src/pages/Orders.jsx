import axios from "axios";
import React, { useEffect, useState } from "react";
import { backEndUrl } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets.js";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backEndUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backEndUrl + "/api/order/status",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  
  const filteredOrders = orders.filter(order =>
    statusFilter === "All" ? true : order.status === statusFilter
  );

  const sortedOrders = [...filteredOrders].sort((a, b) =>
    sortOrder === "latest"
      ? new Date(b.date) - new Date(a.date)
      : new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="p-6 md:p-10 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-4xl font-medium text-left text-white mb-8 underline underline-offset-8 decoration-purple-300">
        Orders
      </h1>

     
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div>
          <label className="text-white mr-2 font-medium">Filter by Status:</label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white"
          >
            <option value="All">All</option>
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>

        <div>
          <label className="text-white mr-2 font-medium">Sort by Date:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded-md bg-gray-700 text-white"
          >
            <option value="latest">Latest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Order Cards */}
      <div className="space-y-6">
        {sortedOrders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-4 items-start border border-purple-300 bg-[#1e293b] p-6 rounded-xl shadow-md"
          >
            <img
              src={assets.parcel_icon}
              alt="parcel"
              className="w-12 h-12 object-contain"
            />

            <div>
              <div className="text-sm space-y-1 text-gray-300">
                {order.items.map((item, idx) => (
                  <p key={idx}>
                    {item.name} x {item.quantity}{" "}
                    <span className="text-gray-400">({item.size})</span>
                    {idx !== order.items.length - 1 ? "," : ""}
                  </p>
                ))}
              </div>
              <p className="mt-4 font-semibold text-white">
                {order.address.name}
              </p>
              <div className="text-gray-400">
                <p>{order.address.address},</p>
                <p>{order.address.city}</p>
              </div>
              <p className="text-gray-400">{order.address.phone}</p>
            </div>

            <div className="text-sm text-gray-300 space-y-2">
              <p>Items: {order.items.length}</p>
              <p>Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={`${
                    order.payment ? "text-green-400" : "text-yellow-400"
                  }`}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            <div className="text-lg font-bold text-white">
              ₹{order.amount}
            </div>

            <select
              onChange={(e) => statusHandler(e, order._id)}
              value={order.status}
              className="p-2 rounded-lg bg-gray-700 text-white font-medium outline outline-purple-500"
            >
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out For Delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
