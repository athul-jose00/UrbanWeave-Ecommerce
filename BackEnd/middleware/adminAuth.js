import jwt from "jsonwebtoken";
import { log } from "node:console";
const adminAuth=async(req,res,next)=>{
  try {
    const {token}=req.headers;
    if (!token) {
      return res.json({success:false,message:"Not Authorized Login"})
      
    }
    const token_decode=jwt.verify(token,process.env.JWT_SECRET);
    if (token_decode!== process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD) {
      return res.json({success:false,message:"Not Authorized Login"}) 
    }
    next()
    
  } catch (error) {
    console.log(error);
    res.json({success:false,error});
    
    
    
  }

}

export default adminAuth;