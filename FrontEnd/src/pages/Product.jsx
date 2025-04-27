import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const { addToCart, products } = useContext(ShopContext);

  useEffect(() => {
    const product = products.find((item) => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  if (!productData) {
    return (
      <div className="text-center py-24 text-gray-600 text-lg">
        Loading product details...
      </div>
    );
  }

  return (
    <section className="px-6 md:px-[7vw] py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Image Preview */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[350px] md:h-[450px] overflow-hidden rounded-xl">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex gap-3 overflow-x-auto">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx}`}
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border ${
                  image === img ? "border-black" : "border-transparent"
                } transition shrink-0`}
              />
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col justify-start h-full">
          <h1 className="text-2xl md:text-3xl font-semibold mb-4 md:mb-6 text-black">
            {productData.name}
          </h1>

          <p className="text-gray-600 mb-4 md:mb-6">
            {productData.description || "This product is a blend of modern style and comfort, tailored for everyday wear."}
          </p>

          {productData.sizes?.length > 0 && (
            <div className="mb-6">
              <h4 className="text-lg font-semibold mb-2 text-black">Select Size</h4>
              <div className="flex gap-2 flex-wrap">
                {productData.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedSize(size)}
                    className={`border px-4 py-2 rounded-full text-sm transition-all ${
                      selectedSize === size
                        ? "border-black bg-black text-white"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <p className="text-xl text-gray-800 font-semibold mb-6">
            <span className="text-2xl mr-1">₹</span>
            {productData.price.toLocaleString()}
          </p>

          <button
            onClick={() => addToCart(productData._id, selectedSize)}
            className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition w-full md:w-auto"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default Product;
