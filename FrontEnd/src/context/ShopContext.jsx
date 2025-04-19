/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";


export const ShopContext=createContext(null);

const ShopContextProvider=(props)=>{
  const [cartItems,setCartItems]=useState({});
  const [products, setProducts] = useState([]);

  useEffect(()=>{
    
    const fetchProducts=async()=>{
      const res=await axios.get("http://localhost:3000/view");
      setProducts(res.data);
      

    };
    fetchProducts();

  },[]);


  const addToCart=async (itemId,size) => {
    
    if(!size){
      toast.error('Please Select A Size', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        
        });
      return;
    }

    let cartData=structuredClone(cartItems);
    if(cartData[itemId]){
      if(cartData[itemId][size]){
        cartData[itemId][size]+=1;

      }else{
        cartData[itemId][size]=1
      }

    }else{
      cartData[itemId]={};
      cartData[itemId][size]=1
    }
    setCartItems(cartData);
    toast.success("Added to Cart");

  }
useEffect(()=>{
  console.log(cartItems)
},[cartItems])



  const getCartCount=()=>{
    let totalCount=0;
    for(const product in cartItems){
      for(const size in cartItems[product]){
        try{
        if(cartItems[product][size]>0){
          totalCount+=cartItems[product][size];
        }}catch(error){
          console.log(error);
        }

        
      }
    }
    return totalCount
  }

  const updateQty=async(itemId,size,quantity)=>{
    let cartData=structuredClone(cartItems);
    cartData[itemId][size]=quantity;
    setCartItems(cartData); 

  }


  const getCartAmount= ()=>{
    let totalamount=0;
    for (const items in cartItems){
      let itemInfo=products.find((product)=>product._id===items);
      for(const item in cartItems[items]){
        try {
          if (cartItems[items][item]>0){
            totalamount+=itemInfo.price*cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
          
        }
      }
    }
    
    return totalamount;

  }

const navigate=useNavigate();




  const value={cartItems,addToCart,getCartCount,updateQty,getCartAmount,navigate,products};


return(
<ShopContext.Provider value={value}>
  {props.children}
</ShopContext.Provider>

)

}
export default ShopContextProvider;