import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { backEndUrl } from "../App";

const EditUser = ({ token }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "", // optional field
  });

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${backEndUrl}/api/user/admin/users/${id}`,{
        headers: { token },
      });
      if (res.data.success) {
        const { name, email } = res.data.user;
        setFormData({ name, email, password: "" });
      } else {
        toast.error(res.data.message || "Failed to fetch user");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching user data");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`${backEndUrl}/api/user/admin/users/${id}`,formData,{
        headers: { token },
      } );
      if (res.data.success) {
        toast.success("User updated successfully");
        navigate("/edit_user");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error updating user");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-xl mx-auto bg-gray-800 rounded-2xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-6">Edit User</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded text-white border border-gray-600"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password (leave blank to keep unchanged)</label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 rounded text-white border border-gray-600"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 transition rounded-lg font-semibold"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditUser;
