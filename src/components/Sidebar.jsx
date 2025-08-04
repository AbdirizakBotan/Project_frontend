import React, { useState } from 'react';
import { FaRegFolderOpen, FaChartBar, FaHourglassHalf, FaSignOutAlt, FaHome, FaCalendar, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RiDashboardLine } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';

function Sidebar() {
  const navigate = useNavigate();
  const [expandedMenus, setExpandedMenus] = useState({
    create: false,
    todoLists: false
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  const toggleMenu = (menuName) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  return (
    <aside className="h-screen w-64 bg-gradient-to-br from-purple-900 to-blue-900 shadow-2xl flex flex-col justify-between rounded-r-xl">
      <div>
        {/* Header with expand/collapse icons */}
        <div className="flex items-center justify-center gap-2 px-2 pt-6 pb-4 border-b border-purple-700/30">
      
          <span className="text-white text-lg font-semibold">Online Business Registration</span>
         
        </div>

        <nav className="mt-6">
          <ul className="flex flex-col gap-12 px-3">
         

            {/* Dashboard */}
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-gray-300 hover:bg-purple-800/50 ${isActive ? 'bg-purple-800/70 text-white' : ''}`}>
                <RiDashboardLine className="text-lg" />
                <span>Dashboard</span>
              </NavLink>
            </li>


            {/* Business Records */}
            <li>
              <NavLink to="/business-records" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-gray-300 hover:bg-purple-800/50 ${isActive ? 'bg-purple-800/70 text-white' : ''}`}>
                <FaRegFolderOpen className="text-lg" />
                <span>Business Records</span>
              </NavLink>
            </li>

            {/* Reports */}
            <li>
              <NavLink to="/reports" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-gray-300 hover:bg-purple-800/50 ${isActive ? 'bg-purple-800/70 text-white' : ''}`}>
                <FaChartBar className="text-lg" />
                <span>Reports</span>
              </NavLink>
            </li>

            {/* Pending */}
            <li>
              <NavLink to="/pending" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 font-medium text-gray-300 hover:bg-purple-800/50 ${isActive ? 'bg-purple-800/70 text-white' : ''}`}>
                <FaHourglassHalf className="text-lg" />
                <span>Pending</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      {/* Logout section */}
      <div className="p-4 border-t border-purple-700/30">
        <button onClick={handleLogout} className="flex items-center gap-3 text-red-400 hover:text-red-300 font-medium transition-all w-full px-4 py-2 rounded-lg hover:bg-red-900/20">
          <FaSignOutAlt className="text-lg" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;