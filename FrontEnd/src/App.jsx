import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Collection from "./pages/Collection";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ShopContextProvider from "./context/ShopContext";
import { ToastContainer, Bounce } from 'react-toastify';
import Verify from "./pages/Verify";
import TrackOrder from "./pages/TrackOrder";
import Profile from "./pages/Profile";
import Chatbot from "./components/Chatbot";

const App = () => {
  return (
    <div className="bg-gray-100 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[7vw]">
    <ToastContainer
position="top-right"
autoClose={1500}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
      
      <ShopContextProvider>
      <NavBar />
      <Chatbot/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/login" element={<Login />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/verify" element={<Verify />} />
          <Route path="/track-order/:id" element={<TrackOrder />} />
          <Route path="/profile" element={<Profile />} />

        </Routes>
      </ShopContextProvider>
      <Footer />
    </div>
  );
};

export default App;
