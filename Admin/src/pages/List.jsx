import axios from 'axios';
import { backEndUrl } from "../App";
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { useNavigate } from 'react-router-dom';

const List = ({ token }) => {
  const navigate = useNavigate();
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backEndUrl + '/api/product/view');
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.post(backEndUrl + "/api/product/remove", { id }, { headers: { token } });
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('Error deleting product');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto p-6 bg-gray-900 text-white rounded-2xl shadow-xl">
      <h1 className="text-4xl font-medium text-left text-white mb-8 underline underline-offset-8 decoration-purple-300">
        All Products
      </h1>

      <div className="grid grid-cols-6 font-semibold text-purple-300 border-b border-purple-500 pb-2 mb-4 text-sm sm:text-base">
        <div className="col-span-1 px-2">Image</div>
        <div className="col-span-2 px-2">Name</div>
        <div className="col-span-1 px-2">Category</div>
        <div className="col-span-1 px-2">Price</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {list.length === 0 ? (
        <p className="text-center text-gray-500">No products found</p>
      ) : (
        <div className="space-y-4">
          {list.map((product) => (
            <div key={product._id} className="grid grid-cols-6 items-center bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-purple-200 transition-all ease-in">
              <div className="col-span-1 px-2">
                <img src={product.image[0]} alt={product.name} className="w-20 h-20 object-cover rounded-lg" />
              </div>
              <div className="col-span-2 px-2 font-medium">{product.name}</div>
              <div className="col-span-1 px-2 text-sm">{product.category} - {product.subCategory}</div>
              <div className="col-span-1 px-2 text-white font-bold">₹ {product.price}</div>
              <div className="col-span-1 flex justify-center gap-4">
                <button
                  onClick={() => navigate(`/add/${product._id}`)}
                  className="text-blue-400 hover:text-blue-500"
                  title="Update Product"
                >
                  <EditOutlinedIcon fontSize="medium" />
                </button>
                <button
                  onClick={() => handleDelete(product._id)}
                  className="text-red-500 hover:text-red-600"
                  title="Delete Product"
                >
                  <DeleteOutlineIcon fontSize="medium" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default List;
