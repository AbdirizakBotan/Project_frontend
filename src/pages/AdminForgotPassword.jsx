import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import adminImage from "../assets/admin-image.jpg";
import admin2 from "../assets/admin.jpeg";

function AdminForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:1080/api/admin/forgot-password', {
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
        backgroundImage: `url(${adminImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-10 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-4">
          <img
            src={admin2}
            alt="Admin"
            className="w-20 bg-blue-400 h-20 rounded-full object-cover shadow-md"
          />
        </div>
        
        <h2 className="text-white text-center text-2xl font-semibold mb-6">ADMIN FORGOT PASSWORD</h2>
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

          <Link to="/admin-login" className="text-white text-center block mt-4 text-sm hover:underline flex items-center justify-center">
            <FaArrowLeft className="mr-2" />
            Back to Admin Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AdminForgotPassword; 