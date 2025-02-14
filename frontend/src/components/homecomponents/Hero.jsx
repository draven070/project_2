import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken"); // Check if the user is logged in

  const handleGetStarted = () => {
    navigate("/signup");
  };

  return (
    <div>
      <div className="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544442069-97dded965a9f?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Background Image"
            className="object-cover object-center w-full h-full"
          />
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center items-center h-full text-center">
          <h1
            className="text-5xl font-bold leading-tight mb-4"
            style={{ fontFamily: "Playfair Display, serif" }}
          >
            Welcome To YatraSathi!
          </h1>
          <p
            className="text-lg text-gray-300 mb-8 tracking-wide leading-relaxed"
            style={{ fontFamily: "Roboto, sans-serif" }} // Roboto for the paragraph
          >
            Connect With Travel Mates And Experience Nepal Like Never Before.
          </p>

          {/* Conditionally render the "Get Started" button */}
          {!isLoggedIn && (
            <button
              onClick={handleGetStarted}
              className="bg-teal-400 text-gray-900 hover:bg-teal-300 py-2 px-6 rounded-full text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
            >
              Get Started
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
