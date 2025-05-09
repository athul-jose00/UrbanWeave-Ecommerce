import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const endpoint = "https://api.web3forms.com/submit";
    const apiKey = "4c3eb705-184f-47cb-b919-40f7d6db2515";

    const formDataToSend = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      subject: "Contact Us Form Submission",
      access_key: apiKey
    };

    try {
      const response = await axios.post(endpoint, formDataToSend, {
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (response.data.success) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Oops! Something went wrong. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 py-12 text-gray-800 group max-w-7xl mx-auto">
      <h1 className="text-3xl sm:text-4xl font-medium mb-10 text-center">
        Contact Us
        <span className="block h-1 w-20 bg-gray-800 mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-150 rounded-full" />
      </h1>

      <div className="flex flex-col-reverse lg:flex-row gap-10 lg:gap-16 items-center">
        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 bg-white p-6 sm:p-8 rounded-xl shadow-md"
        >
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-gray-400"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Message</label>
            <textarea
              name="message"
              rows="4"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 ring-gray-400"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gray-900 text-white px-6 py-2 rounded-full w-full sm:w-auto"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {/* Illustration / Info */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <img
            src="https://media.istockphoto.com/id/1497793104/photo/contact-us-concept-male-hand-draws-a-line-under-the-word-contact-us-on-yellow-background.jpg?s=612x612&w=0&k=20&c=xBTPhLTvrMnlCXJ_VNfa4FFBCPXJ75hVVbgyYZIT1B0="
            alt="Contact Illustration"
            className="rounded-lg shadow-md mb-6 w-full h-auto object-cover max-h-72"
          />
          <p className="text-gray-600 text-base sm:text-lg">
            Got a question, suggestion, or just want to say hello? We'd love to hear from you! Drop us a message and our team will get back to you as soon as possible.
          </p>
          <div className="mt-4 text-gray-700 text-sm sm:text-base space-y-1">
            <p><strong>Email:</strong> support@urbanweave.com</p>
            <p><strong>Phone:</strong> +91 98765 43210</p>
            <p><strong>Location:</strong> Bangalore, India</p>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Contact;
