import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function AdminRegister() {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    // Validation
    if (form.password !== form.confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-center', autoClose: 2000 });
      return;
    }

    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters', { position: 'top-center', autoClose: 2000 });
      return;
    }

    try {
      const res = await axios.post('http://localhost:1080/api/admin/register', {
        username: form.username,
        email: form.email,
        password: form.password
      });
      
      toast.success('Admin registered successfully!', { position: 'top-center', autoClose: 2000 });
      setForm({ username: '', email: '', password: '', confirmPassword: '' });
      setTimeout(() => navigate('/admin-login'), 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed', { position: 'top-center', autoClose: 2000 });
    }
  };

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
      <div className="absolute inset-0 bg-black opacity-60 z-0"></div>
      
      <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-10 rounded-lg shadow-md w-full max-w-md z-10 relative">
        <div className="flex justify-center mb-4">
          <div className="bg-gradient-to-br from-purple-600 to-blue-300 w-24 h-24 rounded-full flex items-center justify-center">
            <FaUser className="text-white text-4xl" />
          </div>
        </div>
        
        <h2 className="text-white text-center text-2xl font-semibold mb-6">ADMIN REGISTER</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaUser />
              </span>
              <input 
                value={form.username} 
                onChange={handleChange}
                name="username"
                type="text"
                placeholder="Username"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaEnvelope />
              </span>
              <input 
                value={form.email} 
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="Email"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
                required
              />
            </label>
          </div>

          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input
                value={form.password} 
                onChange={handleChange}
                name="password"
                type="password"
                placeholder="Password"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
                required
              />
            </label>
          </div>

          <div className="mb-6">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input
                value={form.confirmPassword} 
                onChange={handleChange}
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="pl-8 w-full px-3 py-2 rounded bg-white focus:outline-none"
                required
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-purple-600 to-blue-400 hover:bg-blue-700 text-white py-2 rounded-full font-semibold"
          >
            CREATE ADMIN ACCOUNT
          </button>

          <Link to="/admin-login" className="text-white text-center block mt-4 text-sm hover:underline">
            Already have an admin account? Login here
          </Link>
        </form>
      </div>
    </div>
  );
}

export default AdminRegister; 