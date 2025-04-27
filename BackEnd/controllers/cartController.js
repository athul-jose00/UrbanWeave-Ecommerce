import userModel from "../model/userModel.js";

//add products to user cart
const addCart=async (req,res) => {
  try {
    const{userId,itemId,size}=req.body;
    const userData=await userModel.findById(userId);
    let cartData=await userData.cartData;
    if(cartData[itemId]){
      if (cartData[itemId][size]) {
        cartData[itemId][size]+=1;
      }
      else{
        cartData[itemId][size]=1;
      }
    }else{
      cartData[itemId]={};
      cartData[itemId][size]=1;
    }

    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({
      success:true,
      message:"Added to Cart"
    })
    
  } catch (error) {
    console.log(error);
    res.json({
      success:false,
      message:error.message
    })
  }
  
}

//update user cart
const updateCart=async (req,res) => {
  try {
    const{userId,itemId,size,quantity}=req.body;
    const userData=await userModel.findById(userId)
    let cartData=userData.cartData;
    cartData[itemId][size]=quantity;
    await userModel.findByIdAndUpdate(userId,{cartData})
    res.json({
      success:true,
      message:"Cart Updated"
    })
    
  } catch (error) {
    console.log(error);
    
    res.json({
      success:false,
      message:error.message
    })
    
    
  }
  
}

//get user cart data
const getUserCart=async (req,res) => {

  try {
    const {userId}=req.body;
    const userData=await userModel.findById(userId)
    let cartData=userData.cartData;
    res.json({
      success:true,
      cartData
    })

  } catch (error) {
    console.log(error);
    
    res.json({
      success:false,
      message:error.message
    })
    
  }
  
}

export {addCart,updateCart,getUserCart}