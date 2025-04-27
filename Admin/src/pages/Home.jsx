import React, { useEffect, useState } from "react";
import axios from "axios";
import { backEndUrl } from "../App";
import {
  FaUsers,
  FaBox,
  FaClipboardList,
  FaDollarSign,
  FaCheckCircle,
  FaHourglassHalf,
} from "react-icons/fa";
import { IndianRupee } from 'lucide-react';

const Home = ({ token }) => {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await axios.get(`${backEndUrl}/api/admin/summary`, {
          headers: { token },
        });
        if (res.data.success) {
          setSummary(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching summary:", err);
      }
    };

    fetchSummary();
  }, [token]);

  return (
    <div className="text-white">
      <h1 className="text-3xl font-bold mb-6">Dashboard Summary</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <SummaryCard
          icon={<FaUsers size={28} />}
          label="Users"
          value={summary?.totalUsers || 0}
        />
        <SummaryCard
          icon={<FaBox size={28} />}
          label="Products"
          value={summary?.totalProducts || 0}
        />
        <SummaryCard
          icon={<FaClipboardList size={28} />}
          label="Orders"
          value={summary?.totalOrders || 0}
        />
        <SummaryCard
          icon={<IndianRupee />}
          label="Revenue"
          value={`₹${summary?.totalRevenue || 0}`}
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Payment Status</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-17">
        <SummaryCard
          icon={<FaCheckCircle size={28} />}
          label="Paid Orders"
          value={summary?.paymentSummary?.paid || 0}
          color="bg-green-600"
        />
        <SummaryCard
          icon={<FaHourglassHalf size={28} />}
          label="Pending Orders"
          value={summary?.paymentSummary?.pending || 0}
          color="bg-yellow-500"
        />
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, label, value, color = "bg-indigo-600" }) => (
  <div className="bg-gray-800 p-5 rounded-2xl shadow-lg flex items-center justify-between">
    <div>
      <h2 className="text-lg font-semibold">{label}</h2>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className={`${color} p-3 rounded-full`}>{icon}</div>
  </div>
);

export default Home;
