import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const tokenFromUrl = searchParams.get('token');
    if (!tokenFromUrl) {
      toast.error('Invalid reset link', { position: 'top-center', autoClose: 3000 });
      navigate('/login');
      return;
    }
    setToken(tokenFromUrl);
  }, [searchParams, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match', { position: 'top-center', autoClose: 3000 });
      return;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long', { position: 'top-center', autoClose: 3000 });
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post('https://project-backend-last.onrender.com/reset-password', {
        token: token,
        password: password
      });
      
      toast.success('Password reset successfully!', { position: 'top-center', autoClose: 3000 });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password', { position: 'top-center', autoClose: 3000 });
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
            <FaLock className="text-white text-4xl" />
          </div>
        </div>
        
        <h2 className="text-white text-center text-2xl font-semibold mb-6">RESET PASSWORD</h2>
        <p className="text-gray-300 text-center mb-6">
          Enter your new password below.
        </p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="pl-8 pr-10 w-full px-3 py-2 rounded bg-white focus:outline-none text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-2.5 text-blue-400"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>
          </div>

          <div className="mb-6">
            <label className="relative block">
              <span className="absolute left-2 top-2.5 text-blue-400">
                <FaLock />
              </span>
              <input 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)}
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="pl-8 pr-10 w-full px-3 py-2 rounded bg-white focus:outline-none text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-2.5 text-blue-400"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-br from-purple-600 to-blue-400 hover:bg-blue-700 text-white py-2 rounded-full font-semibold disabled:opacity-50"
          >
            {loading ? 'RESETTING...' : 'RESET PASSWORD'}
          </button>

          <Link to="/login" className="text-white text-center block mt-4 text-sm hover:underline">
            Back to Login
          </Link>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword; 