import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Add from "./pages/Add";
import Home from "./pages/Home";
import List from "./pages/List";
import Orders from "./pages/Orders";
import Login from "./components/Login";
 

import { ToastContainer } from 'react-toastify';
import UserList from "./pages/UserList";
import EditUser from "./pages/EditUser";

export const backEndUrl=import.meta.env.VITE_BACKEND_URL



const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):'');

  useEffect(()=>{
    localStorage.setItem('token',token)

  },[token])


  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-700 to-gray-600 text-white">
      <ToastContainer/>
       {token===''? <Login setToken={setToken} />:
       <div>
       <div className="fixed top-0 left-0 right-0 h-16 z-50 bg-gray-900">
        <NavBar setToken={setToken}/>
      </div>

      <div className="flex flex-1 pt-16">
        <div className="fixed top-0 left-0 bottom-0 z-40">
          <Sidebar />
        </div>

        <div className="flex-1 ml-55 p-6">
          <Routes>
            <Route path="/" element={<Home token={token} />} />
            <Route path="/add" element={<Add token={token} />} />
            <Route path="/list" element={<List token={token} />} />
            <Route path="/orders" element={<Orders token={token} />} />
            <Route path="/edit_user" element={<UserList token={token} />} />
            <Route path="/admin/users/edit/:id" element={<EditUser token={token}/>} />
            <Route path="/add/:id" element={<Add token={token} />} />

          </Routes>
        </div>
      </div>
      </div>
      }
      
    </div>
  );
};

export default App;
