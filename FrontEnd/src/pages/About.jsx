import React from 'react';
import {assets} from '../assets/assets'

const About = () => {
  return (
    <div className="px-6 md:px-[7vw] py-12 text-gray-800 group">
      <div className="text-center mb-12">
      <h1 className="text-4xl font-semibold mb-8 text-center mx-auto">
        About Us
        <span className="block h-1 w-22 bg-gray-800 mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-150 rounded-full" />
      </h1>
      </div>

      {/* Introduction Section */}
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-4 underline underline-offset-4 decoration-2">Our Story</h2>
          <p className="text-gray-600 text-xl">
            Urban Weave was born from a passion for authentic street culture and a desire to bring bold, expressive fashion to the forefront. Our collections are inspired by the rhythm of the city, blending comfort with cutting-edge design to empower individuals to express their unique style.
          </p>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <img
            src={assets.about_img1}
            alt="Urban Fashion"
            className="w-80 h-auto "
          />
        </div>
      </div>

      
      <div className="flex flex-col md:flex-row items-center gap-10 mb-16 mt-36">
        <div className="md:w-1/2 flex justify-center order-2 md:order-1">
          <img
            src="https://media.istockphoto.com/id/1363627613/photo/multiracial-group-of-young-friends-bonding-outdoors.jpg?s=612x612&w=0&k=20&c=ManrdILSin-JyEZqtdREJqnYUTIJaEQg9FrEh2V8OHA="
            alt="Streetwear"
            className="w-90 h-auto rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2 order-1 md:order-2">
          <h2 className="text-2xl font-semibold mb-4 underline underline-offset-4 decoration-2">Our Mission</h2>
          <p className="text-gray-600 text-xl">
            At Urban Weave, our mission is to craft apparel that resonates with the heartbeat of urban life. We aim to provide high-quality, stylish clothing that allows our community to make bold statements and embrace their individuality with confidence.
          </p>
        </div>
      </div>

      


      

      
      <div className="text-center mt-32">
        <h2 className="text-2xl font-semibold mb-4 underline underline-offset-4 decoration-2">Our Values</h2>
        <p className="text-gray-600 mb-6 text-xl">
          We stand for authenticity, creativity, and community. Our designs are a tribute to the diverse cultures and stories that make up the urban tapestry. We believe in sustainable practices and are committed to making a positive impact on both fashion and society.
        </p>
        <div className="flex justify-center">
          <img
            src="https://media.istockphoto.com/id/1305252434/vector/the-diverse-group-of-people-entrepreneurs-or-office-workers-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=bV8k8kMureOtnu_dd-Oz3v_taIai0ekTsA4gSaFHrVQ="
            alt="Urban Style"
            className="w-200 h-auto rounded-lg "
          />
        </div>
      </div>
    </div>
  );
};

export default About;
