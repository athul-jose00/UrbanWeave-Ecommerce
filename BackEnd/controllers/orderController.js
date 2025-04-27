import { response } from "express";
import orderModel from "../model/orderModel.js";
import userModel from "../model/userModel.js";
import Stripe from "stripe";


//gateway initailize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)

//Placing orders using COD Method

const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { cartData: {} });
    res.json({
      success: true,
      message: "Order Placed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//Placing orders using Razorpay Method

const placeOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const {origin}=req.headers; 
    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items=items.map((item)=>({
      price_data:{
        currency:"INR",
        product_data:{
          name:item.name
        },
        unit_amount:item.price*100
      },
      quantity:item.quantity
    }))

    const session=await stripe.checkout.sessions.create({
      success_url:`${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url:`${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: 'payment',
    })
    res.json({
      success:true,
      session_url:session.url
    })



  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    
  })
};
}

//verify stripe
const verifyStripe=async (req,res) => {
  const {orderId,success,userId}=req.body;
  try {
    if (success==='true') {
      await orderModel.findByIdAndUpdate(orderId,{payment:true});
      await userModel.findByIdAndUpdate(userId,{cartData:{}});
      res.json({
        success:true

      });

    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.json({
        success:false
      })
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
    
  }
  
}



//all orders for admin panel

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({
      success: true,
      orders
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//user order data

const userOrders = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};


const updateStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    const order = await orderModel.findById(orderId);

    const updateData = {
      status,
      payment: status === "Delivered" && order.paymentMethod === "COD" ? true : undefined,
    };

    if (updateData.Payment === undefined) delete updateData.Payment;

    await orderModel.findByIdAndUpdate(orderId, updateData);

    res.json({ success: true, message: "Delivery Status Updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, error: "Failed to update status" });
  }
};


const getOrderById = async (req, res) => {
  const { id } = req.body;

  try {
    const order = await orderModel.findById(id);

    if (!order) {
      return res.json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};



export { placeOrder, placeOrderStripe, allOrders, userOrders, updateStatus,verifyStripe,getOrderById}
