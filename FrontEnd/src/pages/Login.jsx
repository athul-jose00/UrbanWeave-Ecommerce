import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';





const Login = () => {
  const [currentState, setCurrentState] = useState("Login");
  
  const {token,setToken,backendURL,navigate}=useContext(ShopContext)
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')

  const onSubmitHandler=async(event)=>{
    event.preventDefault();
    try {
      if (currentState==="Sign Up") {
        const response=await axios.post(backendURL+'/api/user/register',{name,email,password})
        if(response.data.success){
          toast.success(`🎉 ${response.data.message}`);
          setTimeout(() => setCurrentState("Login"), 3000);

        }else{
          toast.error(response.data.message);
        }
        
        
        
      }else{
        const response=await axios.post(backendURL+'/api/user/login',{email,password})
        if(response.data.success){
          setToken(response.data.token);
          localStorage.setItem('token',response.data.token);
          

        }else{
          toast.error(response.data.message);
        }

      }
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(()=>{
    if (token) {
      navigate("/", { state: { loginSuccess: true } });

      
    }
  },[token])
  const location = useLocation();

useEffect(() => {
  const params = new URLSearchParams(location.search);
  const verified = params.get('verified');
  const message = params.get('message');

  if (verified && message) {
    toast.success(`🎉 ${message}`);
  }
}, [location]);




  return (
    <div className="min-h-screen  flex items-center justify-center px-4 mt-[-70px]">
      <form className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8 flex flex-col gap-6 group" onSubmit={onSubmitHandler}>
        <div className="text-center ">
          <h1 className="text-3xl font-medium text-gray-800">{currentState}</h1>
          <span className="block h-1 w-14 bg-black mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-140 rounded-full" />
        </div>

        {currentState !== 'Login' && (
          <input
            onChange={(e)=>setName(e.target.value)}
            value={name}
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Name"
            required
          />
        )}

        <input
        onChange={(e)=>setEmail(e.target.value)}
        value={email}
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          required
        />
        <input
        onChange={(e)=>setPassword(e.target.value)}
        value={password}
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
        />

        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black">Forgot your password?</p>
          <p
            className="cursor-pointer hover:text-black font-medium"
            onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
          >
            {currentState === "Login" ? "Create Account" : "Login"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-black rounded-md hover:opacity-90 transition cursor-pointer"
        >
          {currentState}
        </button>
      </form>
    </div>
  );
};

export default Login;
