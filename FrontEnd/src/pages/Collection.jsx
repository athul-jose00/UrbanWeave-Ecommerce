import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { ShopContext } from "../context/ShopContext";

const Collections = () => {
  const [filtered, setFiltered] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [subCategoryFilter, setSubCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const { products } = useContext(ShopContext);

  useEffect(() => {
    let updated = [...products];

    if (categoryFilter !== "All") {
      updated = updated.filter((p) => p.category === categoryFilter);
    }

    if (subCategoryFilter !== "All") {
      updated = updated.filter((p) => p.subCategory === subCategoryFilter);
    }

    if (searchTerm.trim() !== "") {
      updated = updated.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFiltered(updated);
  }, [categoryFilter, subCategoryFilter, searchTerm, products]);

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const subCategories = ["All", ...new Set(products.map((p) => p.subCategory))];

  return (
    <div className="px-6 md:px-[7vw] py-12 group">
      <h1 className="text-4xl font-medium mb-8 text-center">
        Our Collection
        <span className="block h-1 w-36 bg-gray-800 mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-150 rounded-full" />
      </h1>

      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-10 justify-center">
      <div className="flex flex-col">
          <label className="text-sm font-semibold uppercase text-gray-600 mb-2 tracking-wide">
            Category
          </label>
          <select
            className="bg-white text-gray-800 font-medium border border-gray-300 rounded-lg px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-200"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-semibold uppercase text-gray-600 mb-2 tracking-wide">
            Sub-category
          </label>
          <select
            className="bg-white text-gray-800 font-medium border border-gray-300 rounded-lg px-5 py-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-700 transition duration-200"
            value={subCategoryFilter}
            onChange={(e) => setSubCategoryFilter(e.target.value)}
          >
            {subCategories.map((sc, i) => (
              <option key={i} value={sc}>
                {sc}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full md:w-72">
          
          <div className="flex items-center border border-gray-400 rounded-full px-4 py-2">
            <SearchIcon className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="outline-none flex-1 bg-transparent text-gray-800"
            />
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="group"
            >
              <div className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                <div className="overflow-hidden bg-gray-100">
                  <img
                    src={product.image?.[0] || "/placeholder.jpg"}
                    alt={product.name}
                    className="w-full h-72 object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 mt-1 flex items-center gap-1">
                    ₹<span>{product.price.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-500 col-span-full">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Collections;
