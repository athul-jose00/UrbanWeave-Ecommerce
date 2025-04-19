import React from 'react';
import Hero from '../components/Hero';
import LatestProducts from '../components/LatestProducts';
import BestSellers from '../components/BestSellers';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestProducts />
      <BestSellers/>
      
    </div>
  );
};

export default Home;
