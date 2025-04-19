import React, { useContext, useState } from "react";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box, Button, IconButton, Badge } from "@mui/material";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useContext(ShopContext);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "SHOP", path: "/collection" },
    { name: "ABOUT", path: "/about" },
    { name: "CONTACT", path: "/contact" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        marginTop: "0.75em",
        backgroundColor: "white",
        color: "black",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{
          maxWidth: "1536px",
          width: "100%",
          margin: "0 auto",
          px: { xs: 2, sm: 3, lg: 4 },
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <Box
            component="h1"
            sx={{
              fontSize: "1.25rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
              color: "black",
            }}
          >
            URBANWEAVE
          </Box>
        </Link>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {navLinks.map((item) => (
            <Link key={item.name} to={item.path} style={{ textDecoration: "none" }}>
              <Button
                sx={{
                  color: "black",
                  fontWeight: 500,
                  fontSize: "1.125rem",
                  textTransform: "capitalize",
                  px: 0,
                  py: 1,
                  position: "relative",
                  minWidth: "auto",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: location.pathname === item.path ? "100%" : "0",
                    height: "2px",
                    backgroundColor: "black",
                    transition: "width 0.3s ease",
                  },
                  "&:hover": {
                    backgroundColor: "transparent",
                    "&::after": {
                      width: "75%",
                    },
                  },
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </Box>

        {/* Cart and Profile */}
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {/* Cart Icon */}
          <IconButton
            component={Link}
            to="/cart"
            sx={{
              color: "black",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
          >
            <Badge badgeContent={getCartCount()} color="error">
              <ShoppingCart />
            </Badge>
          </IconButton>

          {/* Profile Dropdown */}
          <div className="group relative">
            <Link to="/login">
              <img
                className="w-[27px] cursor-pointer"
                src={assets.profile_user}
                alt="Profile"
              />
            </Link>
            <div className="group-hover:block hidden absolute right-[-20px] pt-4 z-10">
              <div className="flex flex-col gap-2 w-36 py-3 px-2 bg-white text-gray-500 shadow-lg border border-gray-200 rounded-xl">
                <p className="cursor-pointer hover:text-black hover:bg-gray-100   rounded-md ml-1">My Profile</p>
                <p className="cursor-pointer hover:text-black hover:bg-gray-100  py-1 rounded-md ml-1">Orders</p>
                <p className="cursor-pointer hover:text-black hover:bg-gray-100  py-1 rounded-md ml-1">Logout</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <IconButton
            sx={{
              display: { md: "none" },
              color: "black",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
            }}
            onClick={toggleMobileMenu}
          >
            <MenuIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <Box
          sx={{
            display: { md: "none" },
            backgroundColor: "white",
            boxShadow: "0 4px 6px -1px rgba(0,0,0,0.1)",
            px: 2,
            pt: 1,
            pb: 3,
          }}
        >
          {navLinks.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              style={{ textDecoration: "none" }}
              onClick={toggleMobileMenu}
            >
              <Button
                fullWidth
                sx={{
                  justifyContent: "flex-start",
                  px: 3,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 500,
                  color: "black",
                  backgroundColor:
                    location.pathname === item.path
                      ? "rgba(0,0,0,0.04)"
                      : "transparent",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.04)",
                  },
                  textTransform: "capitalize",
                }}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </Box>
      )}
    </AppBar>
  );
};

export default Navbar;
