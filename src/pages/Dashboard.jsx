import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FaHourglassHalf, FaCheckCircle } from 'react-icons/fa';
import { MdBusinessCenter } from 'react-icons/md';
import axios from "axios";

const cardStyles = [
  "from-blue-400 to-blue-600 border-blue-600 text-blue-900",
  "from-yellow-300 to-yellow-500 border-orange-400 text-yellow-900",
  "from-orange-300 to-orange-500 border-yellow-500 text-orange-900"
];
const cardIcons = [
  <MdBusinessCenter className="text-5xl" />, 
  <FaHourglassHalf className="text-5xl" />, 
  <FaCheckCircle className="text-5xl" />
];
const cardLabels = [
  "Total of Business",
  "Total of Pending",
  "Total of Approved"
];

function Dashboard() {
  const [counts, setCounts] = useState({ total: 0, approved: 0, pending: 0 });
  useEffect(() => {
    axios.get('http://localhost:1080/counts')
      .then(res => setCounts(res.data))
      .catch(() => setCounts({ total: 0, approved: 0, pending: 0 }));
  }, []);
  const cardData = [counts.total, counts.pending, counts.approved];
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar />
      <div className="flex-1">
        <div className="-mt-3 px-4">
          <Header />
        </div>
        <div className="p-10">
          {/* <h1 className="text-3xl font-bold mb-10 text-blue-800 text-center tracking-tight">Dashboard</h1> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {cardData.map((count, idx) => (
              <div
                key={idx}
                className={`bg-gradient-to-br ${cardStyles[idx]} rounded-2xl shadow-lg p-8 flex flex-col items-center justify-center border-b-4 hover:scale-105 hover:shadow-2xl transition-all duration-300`}
              >
                <div className="mb-4">{cardIcons[idx]}</div>
                <span className="text-4xl font-bold mb-2">{count}</span>
                <span className="text-lg font-semibold">{cardLabels[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;