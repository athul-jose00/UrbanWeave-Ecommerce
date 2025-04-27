import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { assets } from "../assets/assets";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Hero = () => {
  return (
    <section className="w-full min-h-[90vh] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-[7vw] py-10 mt-[-30px] gap-12 md:gap-0 ">
      
      {/* Left Side */}
      <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center items-center md:items-start ">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-black mb-6 leading-tight">
          Redefining Style<br />with UrbanWeave
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6 max-w-sm sm:max-w-md">
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
            width: { xs: "16em", sm: "18em", md: "20em" },
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

     
      <div className="w-full  md:w-1/2 flex justify-end ">
        <img
          src={assets.hero_image}
          alt="Urban fashion"
          className="w-[80%] sm:w-[70%] md:w-full max-w-md object-cover"
        />
      </div>

    </section>
  );
};

export default Hero;
