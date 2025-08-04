import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function UserForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:1080/forgot-password', {
        email: email
      });
      
      toast.success('Password reset link sent to your email!', { position: 'top-center', autoClose: 3000 });
      setEmail('');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset link', { position: 'top-center', autoClose: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-10 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-600 to-blue-300 w-24 h-24 rounded-full flex items-center justify-center">
            <FaEnvelope className="text-white text-4xl" />
          </div>
        </div>
        
        <h2 className="text-white text-center text-2xl font-semibold mb-6">FORGOT PASSWORD</h2>
        <p className="text-gray-300 text-center mb-6">
          Enter your email address and we'll send you a link to reset your password.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaEnvelope />
              </span>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Enter your email"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none text-black"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-400 hover:bg-blue-700 text-white py-2 rounded-full font-semibold disabled:opacity-50"
          >
            {loading ? 'SENDING...' : 'SEND RESET LINK'}
          </button>

          <Link to="/login" className="text-white text-center block mt-4 text-sm hover:underline flex items-center justify-center">
            <FaArrowLeft className="mr-2" />
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default UserForgotPassword; 