import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import Product from "../model/product.js";
import mongoose from "mongoose"; 


export const getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalRevenueData = await orderModel.find({ payment: true });

    const totalRevenue = totalRevenueData.reduce((acc, order) => acc + order.amount, 0);

    const paid = await orderModel.countDocuments({ payment: true });
    const pending = await orderModel.countDocuments({ payment: false });

    // 🆕 Find Top 3 Spenders
    const topSpendersData = await orderModel.aggregate([
      { $match: { payment: true } },
      {
        $group: {
          _id: "$userId",
          totalSpent: { $sum: "$amount" },
        },
      },
      { $sort: { totalSpent: -1 } },
      { $limit: 3 },
      {
        $addFields: {
          userObjectId: { $toObjectId: "$_id" } 
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "userObjectId",
          foreignField: "_id",
          as: "userInfo",
        },
      },
      { $unwind: "$userInfo" },
      {
        $project: {
          _id: 0,
          totalSpent: 1,
          name: "$userInfo.name",
          email: "$userInfo.email",
        },
      },
    ]);

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        paymentSummary: {
          paid,
          pending,
        },
        topSpenders: topSpendersData, 
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to fetch summary" });
  }
};
