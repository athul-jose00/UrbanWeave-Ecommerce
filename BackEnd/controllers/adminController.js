import userModel from "../model/userModel.js";
import orderModel from "../model/orderModel.js";
import Product from "../model/product.js";

export const getAdminSummary = async (req, res) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalProducts = await Product.countDocuments();
    const totalOrders = await orderModel.countDocuments();
    const totalRevenueData = await orderModel.find({ payment: true });

    const totalRevenue = totalRevenueData.reduce((acc, order) => acc + order.amount, 0);

    const paid = await orderModel.countDocuments({ payment: true });
    const pending = await orderModel.countDocuments({ payment: false });

    res.json({
      success: true,
      data: {
        totalUsers,
        totalProducts,
        totalOrders,
        totalRevenue,
        paymentSummary: {
          paid,
          pending
        }
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to fetch summary" });
  }
};
