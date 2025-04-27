import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Footer = () => {
  const onSubmitHandler=(event)=>{
    event.preventDefault();
    toast.success("Successfully Subscribed!!!")
  }


  return (
    <footer className="bg-white text-gray-800 pt-12 pb-6 px-6 md:px-[7vw]  border-t border-gray-200 mt-30">
  <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
    
    <div>
      <h3 className="text-2xl font-semibold text-black mb-4">UrbanWeave</h3>
      <p className="text-sm text-gray-600">
        Timeless fashion for modern lifestyles. Comfort, movement, and minimalism in every thread.
      </p>
    </div>

   
    <div className="ml-15">
      <h4 className="text-lg font-semibold mb-3 text-black">Company</h4>
      <ul className="space-y-2 text-sm">
        <li><Link to="/about" className="hover:text-black transition">About Us</Link></li>
        <li><Link to="/contact" className="hover:text-black transition">Contact</Link></li>
        <li><Link to="/about" className="hover:text-black transition">Privacy Policy</Link></li>
        
      </ul>
    </div>

   
    <div>
      <h4 className="text-lg font-semibold mb-3 text-black">Join Our Newsletter</h4>
      <p className="text-sm text-gray-600 mb-3">
        Get updates on new drops and exclusive offers.
      </p>
      <form className="flex flex-col sm:flex-row gap-2" onSubmit={onSubmitHandler}>
        <input
          type="email"
          placeholder="Your email"

          
          className="px-4 py-2 rounded-full text-black focus:outline-none flex-1 border border-gray-300"
        />
        <button
          type="submit"
          
          className="block bg-black text-white font-semibold px-4 py-2 rounded-full hover:bg-gray-800 transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  </div>

  
  <div className="mt-10 border-t border-gray-200 pt-6 text-sm text-center text-gray-600">
    &copy; {new Date().getFullYear()} UrbanWeave. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
