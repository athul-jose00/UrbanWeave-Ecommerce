import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { backEndUrl } from "../App";

const UserList = ({ token }) => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const response = await axios.get(backEndUrl+"/api/user/admin/users", {
        headers: { token },
      });
      console.log(response);
      if (response.data.success) {
        setUsers(response.data.users);
      } else {
        toast.error("Failed to fetch users");
        
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching users");
    }
  };

  const deleteUser = async (userId) => {
    try {
      const res = await axios.delete(`${backEndUrl}/api/user/admin/users/${userId}`, {
        headers: { token },
      });
      if (res.data.success) {
        toast.success("User deleted");
        fetchUsers();
      } else {
        toast.error("Delete failed");
      }
    } catch (error) {
      toast.error("Error deleting user",error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 md:p-10 bg-[#0f172a] min-h-screen text-white">
      <h1 className="text-3xl font-semibold mb-6 underline decoration-purple-400">
        All Users
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left bg-[#1e293b] text-white rounded-lg">
          <thead className="bg-[#334155] text-white">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id} className="border-b border-gray-700">
                <td className="p-3">{user.name}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3 flex gap-3">
                  <button
                    onClick={() => navigate(`/admin/users/edit/${user._id}`)}
                    className="bg-purple-500 px-4 py-1 rounded hover:bg-purple-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => deleteUser(user._id)}
                    className="bg-red-500 px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="3" className="p-3 text-center text-gray-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
