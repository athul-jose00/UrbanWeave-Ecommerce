import React, { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const onSubmitHandler=async(event)=>{
    event.preventDefault();
  }
  return (
    <div className="min-h-screen  flex items-center justify-center px-4 mt-[-70px]">
      <form className="w-full max-w-md bg-white border border-gray-200 shadow-xl rounded-2xl p-8 flex flex-col gap-6 group" onSubmit={onSubmitHandler}>
        <div className="text-center ">
          <h1 className="text-3xl font-medium text-gray-800">{currentState}</h1>
          <span className="block h-1 w-14 bg-black mt-2 mx-auto transition-transform duration-500 group-hover:scale-x-140 rounded-full" />
        </div>

        {currentState !== 'Login' && (
          <input
            type="text"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Name"
            required
          />
        )}

        <input
          type="email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Email"
          required
        />
        <input
          type="password"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          placeholder="Password"
          required
        />

        <div className="flex justify-between text-sm text-gray-600">
          <p className="cursor-pointer hover:text-black">Forgot your password?</p>
          <p
            className="cursor-pointer hover:text-black font-medium"
            onClick={() => setCurrentState(currentState === "Login" ? "Sign Up" : "Login")}
          >
            {currentState === "Login" ? "Create Account" : "Login"}
          </p>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white bg-black rounded-md hover:opacity-90 transition"
        >
          {currentState}
        </button>
      </form>
    </div>
  );
};

export default Login;
