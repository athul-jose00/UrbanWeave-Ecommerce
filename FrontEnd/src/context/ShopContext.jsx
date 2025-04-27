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
  const[token,setToken]=useState('');
  const backendURL=import.meta.env.VITE_BACKEND_URL;


  useEffect(()=>{
    
    const fetchProducts=async()=>{
      const res=await axios.get(backendURL+"/view");
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
    


    if (token) {
      try {
        axios.post(backendURL+'/api/cart/add',{itemId,size},{headers:{token}})
        toast.success("Added To Cart");
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
      }
      
    }

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
    if (token) {
      try {
        axios.post(backendURL+'/api/cart/update',{itemId,size,quantity},{headers:{token}})
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
        
      }
      
    } 

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



  const getUserCart=async(token)=>{
    try {
      const response=await axios.post(backendURL+'/api/cart/get',{},{headers:{token}})

      if(response.data.success){
          setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
    }

  }

const navigate=useNavigate();

useEffect(()=>{
  if (!token && localStorage.getItem("token")) {
    setToken(localStorage.getItem("token"))
    getUserCart(localStorage.getItem("token"));
    
  }
},[])




  const value={cartItems,addToCart,getCartCount,updateQty,getCartAmount,navigate,products,token,setToken,backendURL,setCartItems};


return(
<ShopContext.Provider value={value}>
  {props.children}
</ShopContext.Provider>

)

}
export default ShopContextProvider;