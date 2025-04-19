import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  
} from "@mui/material";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const PlaceOrder = () => {
  const [method, setMethod] = useState("COD");
  const { getCartAmount } = useContext(ShopContext);
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: "",
    address: "",
    city: "",
    phone: "",
  });

  const navigate = useNavigate();
  const subtotal = getCartAmount();
  const deliveryCharge = 0;
  const total = subtotal + deliveryCharge;

  const handleOrder = () => {
    const { name, address, city, phone } = deliveryInfo;
    if (!name || !address || !city || !phone) {
      toast.error("Please fill all delivery fields");
      return;
    }

    toast.success("Order Placed Successfully 🎉");
    setTimeout(() => navigate("/orders"), 2000);
  };

  return (
    
    <div className="px-6 md:px-[7vw] py-10 text-black group">
      <div className=" mb-10">
        <h2 className="text-4xl font-semibold mb-2 relative ">
          Place Your Order
          <span className="block h-1 w-44 bg-black mt-2 ml-12 rounded-full transition-transform duration-300 group-hover:scale-x-145" />
        </h2>
      </div>

      {/* Delivery Info */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-7 mb-8">
        <h3 className="text-2xl font-medium  underline underline-offset-5 decoration-2 mb-5">
          Delivery Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextField
            label="Full Name"
            fullWidth
            variant="outlined"
            value={deliveryInfo.name}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, name: e.target.value })
            }
          />
          <TextField
            label="Phone Number"
            fullWidth
            variant="outlined"
            value={deliveryInfo.phone}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, phone: e.target.value })
            }
          />
          <TextField
            label="Full Address"
            fullWidth
            multiline
            rows={3}
            className="m-0"
            variant="outlined"
            value={deliveryInfo.address}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, address: e.target.value })
            }
          />
          <TextField
            label="City"
            fullWidth
            variant="outlined"
            value={deliveryInfo.city}
            onChange={(e) =>
              setDeliveryInfo({ ...deliveryInfo, city: e.target.value })
            }
          />
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6 mb-8">
        <h3 className="text-2xl font-medium mb-4 underline underline-offset-4 decoration-2">
          Payment Method
        </h3>
        <div className="flex gap-3">
          <div
            onClick={() => setMethod("RazorPay")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <div
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "RazorPay" ? "bg-green-500 border-green-500" : ""
              }`}
            ></div>
            <img
              className="h-5 mx-4"
              src={assets.razorpay_logo}
              alt="RazorPay"
            />
          </div>
          <div
            onClick={() => setMethod("COD")}
            className="flex items-center gap-3 border p-2 px-3 cursor-pointer"
          >
            <div
              className={`min-w-3.5 h-3.5 border rounded-full ${
                method === "COD" ? "bg-green-500 " : ""
              }`}
            ></div>
            <p className="text-gray-800 text-sm font-medium mx-4">
              CASH ON DELIVERY
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-8 mb-8">
        <h3 className="text-2xl font-medium mb-7 underline underline-offset-4 decoration-2">
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
          <div className="flex justify-between font-semibold text-black text-lg mt-2 border-t pt-2">
            <span>Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

     
      <div className="text-right  ">
        <Button
          variant="contained"
          
          onClick={handleOrder}
          sx={{
            backgroundColor: "black",
            color: "white",
            px: 4,
            py: 1.5,
            fontWeight: 600,
            fontSize: "1rem",
            textTransform: "capitalize",
            borderRadius: "200px",
            width: "20em",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            marginTop: "1em",
            marginLeft:"auto"
          }}
        >
          <span className="flex text-lg items-center gap-2 transition-transform duration-300 group-hover:scale-110">
          Place Order
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-4 text-2xl">
              <ArrowForwardIcon fontSize="inherit" />
            </span>
          </span>
        </Button>
      </div>
    </div>
  );
};

export default PlaceOrder;
