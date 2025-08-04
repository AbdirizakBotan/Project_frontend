import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Header({ onSearch }) {
  const [query, setQuery] = useState("");
  const [adminName, setAdminName] = useState("");

  useEffect(() => {
    // Get admin name from JWT
    const token = localStorage.getItem('adminToken');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminName(decoded.username ? decoded.username.charAt(0).toUpperCase() + decoded.username.slice(1) : 'Admin');
      } catch {
        setAdminName('Admin');
      }
    } else {
      setAdminName('Admin');
    }
  }, []);

  const handleInput = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  return (
    <header className="w-full flex items-center justify-between bg-gradient-to-br from-purple-900 to-blue-900 rounded-2xl shadow p-3 px-6 mb-8 mt-4 transition-colors">
      <div className="flex items-center flex-1">
        <div className="relative w-full max-w-xl">
          <input
            type="text"
            value={query}
            onChange={handleInput}
            placeholder="Search"
            className="w-full pl-4 pr-4 py-2 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200 text-gray-700 shadow-sm"
          />
        </div>
      </div>
      <div className="flex items-center ml-6">
        {/* Show full username as welcome message */}
        <span className="text-white  font-thin text-2xl">Welcome , {adminName}</span>
      </div>
    </header>
  );
}

export default Header; 