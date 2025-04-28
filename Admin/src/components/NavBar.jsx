import { Menu as MenuIcon, Logout as LogoutIcon } from '@mui/icons-material';

import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({setToken}) => {
  return (
    <div className="bg-gray-900 text-white flex items-center justify-between p-4 shadow-md relative">
      <Link to="/">
        <div className="flex items-center space-x-4 cursor-pointer group">
          <h1 className="text-xl font-bold tracking-wide relative ">
            UrbanWeave Admin Panal
            
            <span className="absolute  bottom-0 left-0 w-full h-0.5 bg-purple-200  "></span>
          </h1>
        </div>
      </Link>

      <button onClick={()=>setToken('')} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm font-semibold cursor-pointer">
        <LogoutIcon fontSize="small" />
        Logout
      </button>
    </div>
  );
};

export default NavBar;