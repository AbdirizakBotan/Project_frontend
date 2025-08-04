import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home(){
  // const [username, setUsername] = useState("");

  // useEffect(() => {
  //   const name = localStorage.getItem("username");
  //   if (name) setUsername(name);
  // }, []);

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1559136555-9303baea8ebd?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      {/* Content */}
      <div className="text-center z-10 relative">
        {/* {username && (
          <h2 className="text-2xl font-bold text-white mb-4">Welcome {username}</h2>
        )} */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Online Business Registration
        </h1>
        <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
          Register your business online with ease. Join thousands of businesses that trust our platform.
        </p>
        <Link 
          to="/login" 
          className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-xl font-semibold px-12 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
        >
          Get Started 
        </Link>
      </div>
    </div>
  );
}

export default Home;