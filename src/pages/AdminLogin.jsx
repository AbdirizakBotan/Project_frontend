import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import adminImage from "../assets/admin-image.jpg";
import admin2 from "../assets/admin.jpeg"
function AdminLogin() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:1080/api/admin/login', form);
      localStorage.setItem('adminToken', res.data.token);
      if (res.data.username) {
        localStorage.setItem('username', res.data.username);
      }
      toast.success('Login successful!', { position: 'top-center', autoClose: 2000 });
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed', { position: 'top-center', autoClose: 2000 });
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
      <div className="absolute inset-0  opacity-50 z-0"></div>
      <form onSubmit={handleSubmit} className="bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl shadow-lg p-8 w-full max-w-md flex flex-col gap-6 z-10 relative">
        <div className="flex justify-center mb-2">
          <img
            src={admin2}
            alt="Admin"
            className="w-20 bg-blue-400 h-20 rounded-full object-cover shadow-md"
          />
        </div>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="px-4 py-2 rounded-lg border bg-white border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="px-4 py-2 bg-white rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-br from-purple-600 to-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Login
        </button>
        
        <div className="text-center">
          <Link to="/admin-forgot-password" className="text-white text-sm hover:underline cursor-pointer">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
}

export default AdminLogin; 