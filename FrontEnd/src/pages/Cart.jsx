import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import CartTotal from "../components/CartTotal";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Cart = () => {
  const { cartItems, updateQty, navigate } = useContext(ShopContext);
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const isCartEmpty = cartData.length === 0;

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get("http://localhost:3000/view");
      setProducts(res.data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const product in cartItems) {
        for (const size in cartItems[product]) {
          if (cartItems[product][size]) {
            tempData.push({
              _id: product,
              size: size,
              quantity: cartItems[product][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  if (isLoading) {
    return (
      <div className="text-center py-24 text-gray-600 text-lg">
        Loading Cart details...
      </div>
    );
  }

  return (
    <div className="pt-8 px-6 md:px-[7vw]">
      <div className="group relative">
        <h2 className="text-4xl font-semibold mb-10 text-black relative z-10">
          Your Cart
          <span
            className="block h-1 w-22 bg-black mt-2 ml-9 rounded-full transition-transform duration-300 
              group-hover: scale-x-140" 
          />
        </h2>
      </div>

      {isCartEmpty && (
        <div className="text-center py-24 text-gray-800">
          <h3 className="text-2xl font-medium mb-4">Your cart is empty.</h3>
          <p className="text-gray-700 mb-6">Looks like you haven't added anything yet.</p>
          <Button
            component={Link}
            to="/collection"
            variant="contained"
            sx={{
              backgroundColor: "black",
              color: "white",
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              textTransform: "capitalize",
              borderRadius: "200px",
            }}
          >
            Continue Shopping
          </Button>
        </div>
      )}

      {!isCartEmpty && (
        <div>
          <div className="space-y-8">
            {cartData.map((item, index) => {
              const productData = products.find(
                (product) => product._id === item._id
              );
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row justify-between items-center border p-4 rounded-xl shadow-sm hover:shadow-md transition relative"
                >
                  <div className="flex items-center gap-4 w-full sm:w-[60%]">
                    <img
                      className="w-20 h-20 object-cover rounded-xl border"
                      src={productData.image[0]}
                      alt={productData.name}
                    />
                    <div>
                      <p className="text-lg font-medium text-black mb-1">
                        {productData.name}
                      </p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span className="text-black">
                          ₹{productData.price.toLocaleString()}
                        </span>
                        <span className="border px-3 py-1 rounded-full bg-gray-100 text-black">
                          Size: {item.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 mt-4 sm:mt-0">
                    <input
                      className="w-16 px-2 py-1 border rounded-md text-center bg-gray-100"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        e.target.value === "" || e.target.value === "0"
                          ? null
                          : updateQty(item._id, item.size, Number(e.target.value));
                      }}
                    />

                    <DeleteOutlineTwoToneIcon
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                      fontSize="medium"
                      onClick={() => updateQty(item._id, item.size, 0)}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex flex-col items-end mt-12">
            <div className="w-full max-w-md">
              <CartTotal />
              <Button
                variant="contained"
                onClick={() => navigate("/place-order")}
                className="group"
                sx={{
                  backgroundColor: "black",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontWeight: 600,
                  fontSize: "1rem",
                  textTransform: "capitalize",
                  borderRadius: "200px",
                  width: "100%", 
                  maxWidth: "28em", 
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  marginTop: "1em",
                }}
              >
                <span className="flex text-lg items-center gap-2 transition-transform duration-300 group-hover:scale-110">
                  Proceed To Checkout
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-4 text-2xl">
                    <ArrowForwardIcon fontSize="inherit" />
                  </span>
                </span>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
