import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { backEndUrl } from "../App";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const Add = ({ token }) => {
  const { id } = useParams();
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
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    const fetchProdData = async () => {
      if (id) {
        try {
          const res = await axios.post(`${backEndUrl}/api/product/single`, { pId: id });
          const product = res.data.product;
          setName(product.name);
          setDecription(product.description);
          setPrice(product.price);
          setCategory(product.category);
          setSubCategory(product.subCategory);
          setBestseller(product.bestseller);
          setSizes(product.sizes);
          setExistingImages(product.image); // Array of image URLs
        } catch (err) {
          console.error("Failed to fetch product data", err);
        }
      }
    };
    fetchProdData();
  }, [id]);

 const onSubmitHandler = async (e) => {
  e.preventDefault();
  try {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("bestseller", bestseller);
    formData.append("sizes", JSON.stringify(sizes));

    const updatedImages = [];

    // Loop over image1–image4 (and their setters)
    const images = [image1, image2, image3, image4];
    for (let i = 0; i < 4; i++) {
      if (images[i]) {
        formData.append(`image${i + 1}`, images[i]); // send new image
        updatedImages[i] = null; // backend will replace this slot
      } else if (existingImages[i]) {
        updatedImages[i] = existingImages[i]; // preserve old image
      }
    }

    formData.append("existingImages", JSON.stringify(updatedImages)); // send preserved ones

    const url = id
      ? `${backEndUrl}/api/product/update/${id}`
      : `${backEndUrl}/api/product/add`;

    const response = await axios.post(url, formData, {
      headers: { token },
    });

    if (response.data.success) {
      toast.success(response.data.message);
      if (!id) {
        // Reset only if adding
        setName("");
        setDecription("");
        setImage1(false);
        setImage2(false);
        setImage3(false);
        setImage4(false);
        setPrice("");
        setSubCategory("");
        setSizes([]);
        setBestseller(false);
      }
    } else {
      toast.error(response.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error("An error occurred while saving the product.");
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
        {id ? "Edit Product" : "Add a New Product"}
      </h1>

      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Images</h2>
        <div className="flex gap-6 justify-center">
          {[1, 2, 3, 4].map((imgNum, index) => {
            const imageState = [image1, image2, image3, image4][index];
            const setImage = [setImage1, setImage2, setImage3, setImage4][index];
            const existingImage = existingImages[index];

            return (
              <label
                key={imgNum}
                htmlFor={`image${imgNum}`}
                className="w-48 h-48 border-2 border-dashed border-purple-400 rounded-lg cursor-pointer overflow-hidden"
              >
                <img
                  className="object-cover w-full h-full"
                  src={
                    imageState
                      ? URL.createObjectURL(imageState)
                      : existingImage
                      ? existingImage
                      : assets.upload_area
                  }
                  alt=""
                />
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id={`image${imgNum}`}
                  hidden
                />
              </label>
            );
          })}
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
        {id ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
};

export default Add;
