import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { FaUserCircle, FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { ClipLoader } from "react-spinners";

const Profile = () => {
  const { backendURL, token } = useContext(ShopContext);
  const [userData, setUserData] = useState(null);
  const [dashboardData, setDashboardData] = useState();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [userRes, dashboardRes] = await Promise.all([
          axios.get(`${backendURL}/api/user/details`, { headers: { token } }),
          axios.get(`${backendURL}/api/user/user-dashboard`, { headers: { token } }),
        ]);
        if (userRes.data.success) setUserData(userRes.data.user);
        if (dashboardRes.data.success) setDashboardData(dashboardRes.data);
      } catch (err) {
        console.error("Error fetching data:", err);
        
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [backendURL, token]);

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.match(/image\/(jpeg|jpg|png|gif)/)) {
      toast.error("Please select a valid image file (JPEG, JPG, PNG, GIF)");
      return;
    }
    if (selected.size > 2 * 1024 * 1024) {
      toast.error("Image size should be less than 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(selected);
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(selected);
  };

  const uploadImage = async () => {
    if (!image) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("profileImg", image);

    try {
      const res = await axios.post(
        `${backendURL}/api/user/update-profile-image`,
        formData,
        { headers: { token } }
      );
      if (res.data.success) {
        toast.success("Profile image updated successfully");
        setUserData((prev) => ({
          ...prev,
          profileImage: res.data.imageUrl,
        }));
        setImage(null);
        setImagePreview(null);
      } else {
        toast.error(res.data.message || "Failed to update profile image");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
      toast.error(err.response?.data?.message || "Failed to update profile image");
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ClipLoader size={50} color="#3B82F6" />
      </div>
    );
  }

  return (
    <div className="min-h-screen px-5 md:px-[8vw] py-12 bg-gray-50 text-gray-800 group: ">
      <h1 className="text-3xl font-semibold mb-9 text-center mx-auto">
        Profile
        <span className="block h-1 w-22 bg-gray-800 mt-1 mx-auto transition-transform duration-500 group-hover:scale-x-150 rounded-full" />
      </h1>

      <div className="grid md:grid-cols-2 gap-10">
        
        <div className="bg-white p-8 h-120 rounded-xl shadow-md">
          <div className="flex flex-col items-center justify-evenly gap-5">
          <form
  onSubmit={(e) => {
    e.preventDefault();
    uploadImage();
  }}
  className="flex flex-col items-center"
>
  <div className="relative w-32 h-32 rounded-full overflow-hidden group">
    <label htmlFor="profile-image" className="w-full h-full cursor-pointer">
      {imagePreview ? (
        <img
          src={imagePreview}
          alt="Preview"
          className="w-full h-full object-cover"
        />
      ) : userData?.profileImage ? (
        <img
          src={userData.profileImage}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <FaUserCircle className="w-full h-full text-gray-300" />
      )}

      {/* Only show hover effect over the image */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
        <FaEdit className="text-white text-xl" />
      </div>

      <input
        type="file"
        id="profile-image"
        accept="image/jpeg, image/jpg, image/png, image/gif"
        onChange={handleImageChange}
        className="hidden"
      />
    </label>
  </div>

  {/* Upload button shows only if image selected */}
  {image && (
    <button
      type="submit"
      disabled={isUploading}
      className={`mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition ${
        isUploading ? "opacity-70 cursor-not-allowed" : ""
      }`}
    >
      {isUploading ? (
        <ClipLoader size={18} color="#ffffff" />
      ) : (
        "Upload Image"
      )}
    </button>
  )}
</form>


            {/* User Info */}
            <div className="w-full mt-8">
              <div className="mb-4">
                <label className="text-sm text-gray-500">Name</label>
                <p className="text-lg font-medium">{userData?.name}</p>
              </div>
              <div>
                <label className="text-sm text-gray-500">Email</label>
                <p className="text-lg font-medium">{userData?.email}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Orders */}
        <div className="flex flex-col gap-8">
          {/* Total Orders */}
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <h2 className="text-xl font-semibold mb-4">Total Orders</h2>
            <p className="text-4xl font-bold text-blue-600">
              {dashboardData?.data?.totalDeliveredOrders || 0}
            </p>
          </div>

          {/* Order History */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-semibold mb-6 text-center">Order History</h2>
            {dashboardData?.data?.deliveredOrders?.length ? (
              <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {dashboardData.data.deliveredOrders.map((order) =>
                  order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="border p-3 rounded-lg flex justify-between items-center hover:bg-gray-100 transition"
                    >
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-base font-semibold">₹{item.price}</p>
                        <span className="text-green-600 text-xs font-medium">
                          Delivered
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ) : (
              <p className="text-gray-500 text-center mt-8">No delivered orders yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
