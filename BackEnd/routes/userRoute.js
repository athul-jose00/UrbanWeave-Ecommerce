import express from 'express';
import {loginUser,registerUser,adminLogin,verifyEmail} from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.post('/admin',adminLogin)
userRouter.get('/verify-email', verifyEmail);

export default userRouter;
