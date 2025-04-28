import React, { useContext,useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ShopContext } from "../context/ShopContext";


const NextArrow = (props) => (
  <div
    {...props}
    className={`${props.className} !flex items-center justify-center  !w-10 !h-10 !bg-black/80 hover:!bg-black rounded-full z-10 !right-0`}
  />
);

const PrevArrow = (props) => (
  <div
    {...props}
    className={`${props.className} !flex items-center justify-center !w-10 !h-10 !bg-black/80 hover:!bg-black rounded-full z-10 !left-0`}
  />
);


const BestSellers = () => {
  const { products } = useContext(ShopContext);

  useEffect(() => {
    const fetchBestSellers = async () => {
      
      const bestSellers = products.filter((product) => product.bestseller);
      
      
    };

    fetchBestSellers();
  }, [products]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 }
      }
    ]
  };

   return (
      <section className="py-8 px-4 md:px-[7vw]">
    <div className="group ">
    <h2 className="text-4xl text-center font-small mb-3 ">
      Best Sellers
      <span className="block h-1 w-30 bg-gray-800 mt-2 mx-auto  transition-transform duration-500 group-hover:scale-x-140  rounded-full" />
    </h2>
    <p className="text-gray-600 mb-12 text-md text-center">
    Discover the styles everyone's loving right now — our most sought-after picks that blend comfort, design, and everyday wearability.
    </p>
  
  
  
    <Slider {...settings}>
          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:scale-105 mx-2 group-hover:shadow-lg h-full">
                <div className="overflow-hidden">
                  <img
                    src={product.image[0]}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
  
                <div className="p-5">
                  <h3 className="text-lg font-medium">{product.name}</h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    <span>₹</span>
                    <span>{product.price.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </Slider>
        
        </div>
      </section>
    );
};

export default BestSellers;
