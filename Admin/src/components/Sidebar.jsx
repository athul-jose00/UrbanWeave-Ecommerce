import React from "react";
import {
  AddBox as AddBoxIcon,
  List as ListIcon,
  EditNote as EditNoteIcon,
  TakeoutDining as TakeoutDiningIcon
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  return (
    <div className="h-full fixed top-12 left-0 w-55 bg-gray-900 text-white shadow-lg">
      <div className="space-y-4 pt-5 px-2">
        <NavLink
          to="/edit_user"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 
             hover:ring-2 hover:ring-purple-500 
             ${
               isActive
                 ? "ring-2 ring-purple-500 bg-gray-800"
                 : "hover:bg-gray-800"
             }`
          }
        >
          <EditNoteIcon />
          <span>User Details</span>
        </NavLink>

        <NavLink
          to="/add"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded cursor-pointer pr-20 transition-all duration-200 
             hover:ring-2 hover:ring-purple-500 
             ${
               isActive
                 ? "ring-2 ring-purple-500 bg-gray-800"
                 : "hover:bg-gray-800"
             }`
          }
        >
          <AddBoxIcon />
          <span>Add Item</span>
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 
             hover:ring-2 hover:ring-purple-500 
             ${
               isActive
                 ? "ring-2 ring-purple-500 bg-gray-800"
                 : "hover:bg-gray-800"
             }`
          }
        >
          <ListIcon />
          <span>List Items</span>
        </NavLink>

        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 p-2 rounded cursor-pointer transition-all duration-200 
             hover:ring-2 hover:ring-purple-500 
             ${
               isActive
                 ? "ring-2 ring-purple-500 bg-gray-800"
                 : "hover:bg-gray-800"
             }`
          }
        >
          <TakeoutDiningIcon />
          <span>Orders</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
