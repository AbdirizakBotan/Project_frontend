import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import axios from "axios";
import { FaBuilding, FaTimesCircle } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import { BsBarChartFill } from "react-icons/bs";

const businessTypeLabels = {
  sole: "Sole Proprietorship",
  partnership: "Partnership",
  private_company: "Private Company",
  public_company: "Public Company",
  ngo: "NGO / Non-Profit",
  cooperative: "Cooperative",
  freelancer: "Freelancer / Home Business",
  online: "Online Business",
  retail: "Retail / Wholesale",
  manufacturer: "Manufacturer / Factory"
};

const businessTypeIcons = {
  sole: <FaBuilding className="text-3xl text-blue-500" />,
  partnership: <MdBusinessCenter className="text-3xl text-purple-500" />,
  private_company: <BsBarChartFill className="text-3xl text-orange-500" />,
  public_company: <BsBarChartFill className="text-3xl text-green-500" />,
  ngo: <FaBuilding className="text-3xl text-pink-500" />,
  cooperative: <FaBuilding className="text-3xl text-yellow-500" />,
  freelancer: <FaBuilding className="text-3xl text-indigo-500" />,
  online: <FaBuilding className="text-3xl text-cyan-500" />,
  retail: <FaBuilding className="text-3xl text-teal-500" />,
  manufacturer: <FaBuilding className="text-3xl text-red-500" />
};

function Reports() {
  const [typeCounts, setTypeCounts] = useState([]);
  const [rejected, setRejected] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:1080/type-counts')
      .then(res => {
        setTypeCounts(res.data.approvedByType);
        setRejected(res.data.rejected);
      })
      .catch(() => {
        setTypeCounts([]);
        setRejected(0);
      });
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar />
      <div className="flex-1">
        <div className="-mt-3 px-4">
          <Header />
        </div>
        <div className="p-10">
          {/* <h1 className="text-3xl font-bold mb-10 text-blue-800 text-center tracking-tight">Business Reports</h1> */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {typeCounts.map((t) => (
              <div
                key={t._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border-b-4 border-blue-500 hover:scale-105 hover:shadow-2xl transition-all duration-300"
              >
                {businessTypeIcons[t._id] || <FaBuilding className="text-3xl text-gray-400" />}
                <span className="mt-3 text-lg font-semibold text-gray-700">{businessTypeLabels[t._id] || t._id}</span>
                <span className="mt-2 text-4xl font-bold text-blue-700">{t.count}</span>
                <span className="text-xs text-gray-400 mt-1">Approved</span>
              </div>
            ))}
            <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center border-b-4 border-red-500 hover:scale-105 hover:shadow-2xl transition-all duration-300">
              <FaTimesCircle className="text-3xl text-red-500" />
              <span className="mt-3 text-lg font-semibold text-gray-700">Rejected Businesses</span>
              <span className="mt-2 text-4xl font-bold text-red-700">{rejected}</span>
              <span className="text-xs text-gray-400 mt-1">Rejected</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;