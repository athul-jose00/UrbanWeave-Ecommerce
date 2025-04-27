import React, { useContext } from 'react';
import Hero from '../components/Hero';
import LatestProducts from '../components/LatestProducts';
import BestSellers from '../components/BestSellers';
import { ShopContext } from '../context/ShopContext';
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const Home = () => {
  const {navigate}=useContext(ShopContext);
  const location = useLocation();
  useEffect(() => {
    if (location.state?.loginSuccess) {
      toast.success("Logged in successfully");
      
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div>
      <Hero />
      <LatestProducts />
      <BestSellers/>
      
    </div>
  );
};

export default Home;
