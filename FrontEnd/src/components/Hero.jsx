import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { assets } from "../assets/assets";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';



const Hero = () => {
  return (
    <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-between px-7 md:px-[7vw] py-10 mt-[-50px]">
     
      <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Redefining Style<br />with UrbanWeave
        </h1>
        <p className="text-xl sm:text-xl  text-gray-700 mb-6 max-w-md">
          Minimal. Bold. Timeless. Discover fashion that blends luxury with everyday comfort.
        </p>
        <Button
  component={Link}
  to="/collection"
  variant="contained"
  className="group"
  sx={{
    backgroundColor: "black",
    color: "white",
    px: 4,
    py: 1.5,
    fontWeight: 600,
    fontSize: "1rem",
    textTransform: "capitalize",
    borderRadius: "200px",
    width:"20em",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  }}
>
  <span className="flex items-center gap-2 transition-transform duration-300 group-hover:scale-110">
    Explore Collection
    <span className="inline-block transition-transform duration-300 group-hover:translate-x-2 text-2xl">
  <ArrowForwardIcon fontSize="inherit" />
</span>
  </span>
</Button>

      </div>

      
      <div className="w-full md:w-1/2 flex justify-center ">
        <img
          src={assets.hero_image}
          alt="Urban fashion"
          className="w-full max-w-md object-cover ml-20"
        />
      </div>
    </section>
  );
};

export default Hero;
