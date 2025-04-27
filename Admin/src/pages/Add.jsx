import React, { useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backEndUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);
  const [name, setName] = useState("");
  const [description, setDecription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Women");
  const [subCategory, setSubCategory] = useState("");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("bestseller", bestseller);
      formData.append("sizes", JSON.stringify(sizes));
      image1 && formData.append("image1", image1);
      image2 && formData.append("image2", image2);
      image3 && formData.append("image3", image3);
      image4 && formData.append("image4", image4);

      const response = await axios.post(
        backEndUrl + "/api/product/add",
        formData,
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setDecription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSubCategory("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size)
        ? prev.filter((item) => item !== size)
        : [...prev, size]
    );
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="w-full max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-xl space-y-6"
    >
      <h1 className="text-4xl font-medium text-left text-white mb-8 underline underline-offset-8 decoration-purple-300">
        Add a New Product
      </h1>
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Images</h2>
        <div className="flex gap-6 justify-center">
          <label
            htmlFor="image1"
            className="w-48 h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer overflow-hidden"
          >
            <img
              className="object-cover w-full h-full"
              src={!image1 ? assets.upload_area : URL.createObjectURL(image1)}
              alt=""
            />
            <input
              onChange={(e) => setImage1(e.target.files[0])}
              type="file"
              id="image1"
              hidden
            />
          </label>
          <label
            htmlFor="image2"
            className="w-48 h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer overflow-hidden"
          >
            <img
              className="object-cover w-full h-full"
              src={!image2 ? assets.upload_area : URL.createObjectURL(image2)}
              alt=""
            />
            <input
              onChange={(e) => setImage2(e.target.files[0])}
              type="file"
              id="image2"
              hidden
            />
          </label>
          <label
            htmlFor="image3"
            className="w-48 h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer overflow-hidden"
          >
            <img
              className="object-cover w-full h-full"
              src={!image3 ? assets.upload_area : URL.createObjectURL(image3)}
              alt=""
            />
            <input
              onChange={(e) => setImage3(e.target.files[0])}
              type="file"
              id="image3"
              hidden
            />
          </label>
          <label
            htmlFor="image4"
            className="w-48 h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer overflow-hidden"
          >
            <img
              className="object-cover w-full h-full"
              src={!image4 ? assets.upload_area : URL.createObjectURL(image4)}
              alt=""
            />
            <input
              onChange={(e) => setImage4(e.target.files[0])}
              type="file"
              id="image4"
              hidden
            />
          </label>
        </div>
      </div>

      <div>
        <label className="block mb-1">Product Name</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Product Name"
          required
          className="w-full p-2 rounded bg-gray-800 border border-purple-200"
        />
      </div>

      <div>
        <label className="block mb-1">Product Description</label>
        <textarea
          value={description}
          onChange={(e) => setDecription(e.target.value)}
          placeholder="Enter Description"
          required
          className="w-full p-2 rounded bg-gray-800 border border-purple-200"
        ></textarea>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-purple-200"
          >
            <option value="Women">Women</option>
            <option value="Men">Men</option>
          </select>
        </div>
        <div>
          <label className="block mb-1">Sub Category</label>
          <input
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            type="text"
            placeholder="e.g., Shirts, Jeans"
            required
            className="w-full p-2 rounded bg-gray-800 border border-purple-200"
          />
        </div>
      </div>

      <div>
        <label className="block mb-1">Price (₹)</label>
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Enter Price"
          required
          className="w-full p-2 rounded bg-gray-800 border border-purple-200"
        />
      </div>

      <div>
        <label className="block mb-1">Sizes</label>
        <div className="flex flex-wrap gap-2">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => toggleSize(size)}
              className={`px-4 py-2 rounded-full cursor-pointer text-sm font-medium border
                 border-purple-200 ${
                sizes.includes(size)
                  ? "bg-pink-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller((prev) => !prev)}
        />
        <label htmlFor="bestseller" className="cursor-pointer">
          Mark as Bestseller
        </label>
      </div>

      <button
        type="submit"
        className="bg-pink-600 hover:bg-pink-700 transition duration-200 text-white py-2 px-6 rounded-lg font-semibold"
      >
        Add Product
      </button>
    </form>
  );
};

export default Add;
