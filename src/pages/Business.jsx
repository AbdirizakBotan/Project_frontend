import React, { useState } from "react"
import { FaUser } from "react-icons/fa"
import axios from "axios"
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import registrationBg from "../assets/registration-bg.avif"
import RegistrationModal from "../components/RegistrationModal"

function Business(){
    const [form, setForm] = useState({
        businessName: '',
        address: '',
        ownerName: '',
        email: '',
        businessType: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [registrationData, setRegistrationData] = useState(null);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    
    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    const handleSubmit = async e => {
        e.preventDefault();
        // Validation
        const newErrors = {};
        if (!form.businessName) newErrors.businessName = "Business Name is required";
        if (!form.address) newErrors.address = "Address is required";
        if (!form.ownerName) newErrors.ownerName = "Owner Name is required";
        if (!form.email) newErrors.email = "Email is required";
        if (!form.businessType) newErrors.businessType = "Business Type is required";
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        setErrors({});
        setRegistrationData(form);
        setShowModal(true);
    };

    const handleEdit = (editedData) => {
        setForm(editedData);
        setRegistrationData(editedData);
    };

    const handleConfirm = async () => {
        try {
            const res = await axios.post('https://project-backend-last.onrender.com/register', registrationData);
            toast.success('Business registered successfully!', { position: 'top-center', autoClose: 3000 });
            setForm({ businessName: '', address: '', ownerName: '', email: '', businessType: '' });
            setTimeout(() => navigate('/'), 2000);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Registration failed', { position: 'top-center', autoClose: 2000 });
        }
    };
    return (
  <div
    className="min-h-screen flex items-center justify-center relative"
    style={{
      backgroundImage: `url(${registrationBg})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
  >
    <div className="absolute inset-0  opacity-50 z-0"></div>
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 p-6 sm:p-8 rounded-2xl shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg text-center z-10 relative">
      <div className="mb-2 flex justify-center">
        <div className="bg-gradient-to-br from-purple-600 to-blue-300  w-20 h-20 rounded-full flex items-center justify-center shadow-md">
          <FaUser className="text-white text-3xl" />
        </div>
      </div>
      <h2 className="text-white text-2xl font-semibold mb-2">Register Business</h2>
      <form className="space-y-2 text-left" onSubmit={handleSubmit}>
        {/* Business Name */}
        <div>
          <label className="block text-white font-semibold mb-1">Business Name :</label>
          <input
            type="text"
            name="businessName"
            value={form.businessName}
            onChange={handleChange}
            placeholder="Enter business name"
            className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          {errors.businessName && <p className="text-red-400 text-xs mt-1">{errors.businessName}</p>}
        </div>
        {/* Address */}
        <div>
          <label className="block text-white font-semibold mb-1">Address :</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          {errors.address && <p className="text-red-400 text-xs mt-1">{errors.address}</p>}
        </div>
        {/* Owner Name */}
        <div>
          <label className="block text-white font-semibold mb-1">Owner Name :</label>
          <input
            type="text"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            placeholder="Enter owner's name"
            className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          {errors.ownerName && <p className="text-red-400 text-xs mt-1">{errors.ownerName}</p>}
        </div>
        {/* Email */}
        <div>
          <label className="block text-white font-semibold mb-1">Email :</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>
        {/* Region (Select Dropdown) */}
        <div>
          <label className="block text-white font-semibold mb-1">Business Type :</label>
          <select
            name="businessType"
            value={form.businessType}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300"
            required
          >
            <option value="" disabled>Select business type</option>
            <option value="sole">Sole Proprietorship</option>
            <option value="partnership">Partnership</option>
            <option value="private_company">Private Company</option>
            <option value="public_company">Public Company</option>
            <option value="ngo">NGO / Non-Profit</option>
            <option value="cooperative">Cooperative</option>
            <option value="freelancer">Freelancer / Home Business</option>
            <option value="online">Online Business</option>
            <option value="retail">Retail / Wholesale</option>
            <option value="manufacturer">Manufacturer / Factory</option>
          </select>
          {errors.businessType && <p className="text-red-400 text-xs mt-1">{errors.businessType}</p>}
        </div>
        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-br from-purple-600 to-blue-400 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      </form>
      
      <RegistrationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        businessData={registrationData}
        onEdit={handleEdit}
        onConfirm={handleConfirm}
      />
    </div>
  </div>
)
}
export default Business