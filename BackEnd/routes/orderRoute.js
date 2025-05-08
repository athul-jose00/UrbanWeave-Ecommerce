import express from 'express';
import {placeOrder,placeOrderStripe, allOrders,userOrders,
  updateStatus,
  verifyStripe,getOrderById,deleteOrder } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/auth.js';

const orderRouter=express.Router();


//admin 
orderRouter.post('/list',adminAuth,allOrders);
orderRouter.post('/status',adminAuth,updateStatus);

//payment 
orderRouter.post('/place',authUser,placeOrder);
orderRouter.post('/stripe',authUser,placeOrderStripe);

//user
orderRouter.post('/userorders',authUser,userOrders);
orderRouter.post("/get-order", authUser, getOrderById);
orderRouter.delete('/delete/:orderId', authUser, deleteOrder); 



//verify payment 
orderRouter.post('/verifyStripe',authUser,verifyStripe)


export default orderRouter


