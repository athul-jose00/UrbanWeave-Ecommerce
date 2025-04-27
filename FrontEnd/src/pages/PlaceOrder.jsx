import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Button, TextField } from "@mui/material";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const {
    getCartAmount,
    backendURL,
    navigate,
    token,
    cartItems,
    setCartItems,
    products,
  } = useContext(ShopContext);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const subtotal = getCartAmount?.();
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value })); // <- fixed (was adding [] around value)
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === items)
            );
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount(),
      };

      if (method === "COD") {
        const response = await axios.post(
          backendURL + "/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({});
          toast.success("🎉 Order Placed Successfully");
          setTimeout(() => navigate("/orders"), 1000); // <- fixed navigate timeout
        } else {
          toast.error(response.data.message);
        }
      } else if (method === "Stripe") {
        const responseStripe = await axios.post(
          backendURL + "/api/order/stripe",
          orderData,
          { headers: { token } }
        );
        if (responseStripe.data.success) {
          const { session_url } = responseStripe.data;
          window.location.replace(session_url);
        } else {
          toast.error(responseStripe.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="px-5 md:px-[7vw] py-10 text-black group"
    >
      <div className="mb-10 text-center md:text-left">
        <h2 className="text-4xl font-semibold mb-2 relative">
          Place Your Order
          <span className="block h-1 w-32 md:w-44 bg-black mt-2 mx-auto md:ml-0 rounded-full transition-transform duration-300 group-hover:scale-x-110" />
        </h2>
      </div>

      {/* Delivery Info */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-medium underline underline-offset-4 decoration-2 mb-5">
          Delivery Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            name="name"
            value={formData.name}
            onChange={onChangeHandler}
            required
          />
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            name="phone"
            value={formData.phone}
            onChange={onChangeHandler}
            required
          />
          <TextField
            label="Full Address"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            name="address"
            value={formData.address}
            onChange={onChangeHandler}
            required
            className="md:col-span-2"
          />
          <TextField
            label="City"
            fullWidth
            variant="outlined"
            name="city"
            value={formData.city}
            onChange={onChangeHandler}
            required
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-medium mb-4 underline underline-offset-4 decoration-2">
          Payment Method
        </h3>
        <div className="flex flex-col sm:flex-row gap-4">
          <div
            onClick={() => setMethod("Stripe")}
            className="flex items-center gap-3 border p-2 px-4 cursor-pointer rounded-xl hover:shadow-md"
          >
            <div
              className={`min-w-4 h-4 border rounded-full ${
                method === "Stripe" ? "bg-green-500 border-green-500" : ""
              }`}
            ></div>
            <img className="h-5 mx-4" src={assets.stripe_logo} alt="Stripe" />
          </div>
          <div
            onClick={() => setMethod("COD")}
            className="flex items-center gap-3 border p-2 px-4 cursor-pointer rounded-xl hover:shadow-md"
          >
            <div
              className={`min-w-4 h-4 border rounded-full ${
                method === "COD" ? "bg-green-500" : ""
              }`}
            ></div>
            <p className="text-gray-800 text-sm font-medium mx-4">
              Cash On Delivery
            </p>
          </div>
        </div>
      </div>

      {/* Billing Summary */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-8">
        <h3 className="text-2xl font-medium mb-6 underline underline-offset-4 decoration-2">
          Billing Summary
        </h3>
        <div className="space-y-4 text-gray-800 text-base">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges:</span>
            <span>{deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}</span>
          </div>
          <div className="flex justify-between font-semibold text-black text-lg mt-3 pt-2 border-t">
            <span>Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center md:justify-end">
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "capitalize",
            borderRadius: "200px",
            width: "16em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1em",
          }}
        >
          <span className="flex text-lg items-center gap-2 transition-transform duration-300 group-hover:scale-110">
            Place Order
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-2xl">
              <ArrowForwardIcon fontSize="inherit" />
            </span>
          </span>
        </Button>
      </div>
    </form>
  );
};

export default PlaceOrder;
