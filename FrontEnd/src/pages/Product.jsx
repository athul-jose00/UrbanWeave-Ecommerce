import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Product = () => {
  const { productId } = useParams();
  
  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState('');
  const [selectedSize,setSelectedSize]=useState('');
  const{addToCart,products}=useContext(ShopContext);

  

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
      <div className="grid grid-cols-2 md:grid-cols-2 gap-10">
        {/* Image Preview */}
        <div className="flex flex-col gap-4">
          <div className="w-full h-[450px] overflow-hidden rounded-xl">
            <img
              src={image}
              alt={productData.name}
              className="w-full h-full object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
          </div>

          <div className="flex gap-3">
            {productData.image.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`Preview ${idx}`}
                onClick={() => setImage(img)}
                className={`w-20 h-20 object-cover rounded-xl cursor-pointer border ${
                  image === img ? "border-black" : "border-transparent"
                } transition`}
              />
            ))}
          </div>
        </div>

       
        <div className="flex flex-col justify-end h-full">
  <h1 className="text-3xl font-semibold mb-6 text-black">
    {productData.name}
  </h1>
  <p className="text-gray-600 mb-6 ml-1">
    {productData.description || "This product is a blend of modern style and comfort, tailored for everyday wear."}
  </p>

  {productData.sizes?.length > 0 && (
          <div className="mb-6 ml-1">
            <h4 className="text-lg font-semibold mb-2 text-black">Select Size</h4>
            <div className="flex gap-3 flex-wrap">
              {productData.sizes.map((size, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSize(size)}
                  className={`border px-4 py-2 rounded-full text-sm transition-all ease duration-300 ${
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
  <p className="text-xl text-gray-800 font-small mb-6 ml-2">
  <span>₹</span>
  <span className='ml-1'>{productData.price.toLocaleString()}</span>
  </p>
  

  

  <div className="mt-3 mb-7">
    <button onClick={()=>addToCart(productData._id,selectedSize)} className="bg-black text-white px-6 py-3 rounded-full font-semibold hover:bg-gray-800 transition">
      Add to Cart
    </button>
  </div>
</div>

      </div>
    </section>
  );
};

export default Product;
<span className='text-2xl text-grey-900 mr-1'>₹</span>