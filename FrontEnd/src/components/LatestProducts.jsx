import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      {
        const response = await axios.get("http://localhost:3000/view");
        const latestProds = response.data.slice(0, 6);
        setProducts(latestProds);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <section className="py-8 px-4 md:px-[7vw]">
  <div className="group ">
  <h2 className="text-4xl text-center font-semibold mb-3 ">
    Latest Arrivals
    <span className="block h-1 w-36 bg-gray-800 mt-2 mx-auto  transition-transform duration-500 group-hover:scale-x-140  rounded-full" />
  </h2>
  <p className="text-gray-600 mx-auto text-center mb-12 text-md">
    Freshly dropped pieces designed for movement, comfort, and bold everyday style.
  </p>



      <div className="grid gap-8 sm:grid-cols-1 lg:grid-cols-3 ">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:scale-105 group-hover:shadow-lg">
              <div className="overflow-hidden">
                <img
                  src={product.image[0]}
                  alt={product.name}
                  className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-5">
                <p className="text-lg font-medium">{product.name}</p>
                <p className="text-gray-600 mt-1 flex items-center gap-1">
                  <span>₹</span>
                  <span>{product.price.toLocaleString()}</span>
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
};

export default LatestProducts;
