import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "../components/ui/table";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaCheck, FaTimes } from 'react-icons/fa';

function Pending() {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPending = async () => {
    try {
      const res = await axios.get('http://localhost:1080/pending');
      setBusinesses(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch pending businesses');
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const handleAction = async (id, action) => {
    try {
      await axios.patch(`http://localhost:1080/${action}/${id}`);
      fetchPending();
      toast.success(`Business ${action === 'approve' ? 'approved' : 'rejected'} successfully!`, { position: 'top-center', autoClose: 2000 });
    } catch (err) {
      setError('Action failed');
      toast.error('Action failed', { position: 'top-center', autoClose: 2000 });
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar />
      <div className="flex-1">
        <div className="-mt-3 px-4">
          <Header />
        </div>
        <div className="p-10">
          {/* <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">Pending Businesses</h2> */}
          <div className="flex justify-center">
            <div className="w-full max-w-4xl">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {error ? (
                  <div className="text-red-500">{error}</div>
                ) : businesses.length === 0 ? (
                  <div>No pending businesses.</div>
                ) : (
                  <Table className="min-w-full">
                    <TableHeader>
                      <TableRow className="bg-blue-50">
                        <TableHead className="px-4 py-3 font-bold text-blue-900">No</TableHead>
                        <TableHead className="px-4 py-3 font-bold text-blue-900">Business Name</TableHead>
                        <TableHead className="px-4 py-3 font-bold text-blue-900">Address</TableHead>
                        <TableHead className="px-4 py-3 font-bold text-blue-900">Owner</TableHead>
                        <TableHead className="px-4 py-3 font-bold text-blue-900">Type</TableHead>
                        <TableHead className="px-4 py-3 font-bold text-blue-900">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {businesses.map((b, idx) => (
                        <TableRow key={b._id} className="hover:bg-blue-100/60 transition rounded-xl">
                          <TableCell className="px-4 py-2 font-semibold text-gray-700">{idx + 1}</TableCell>
                          <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.businessName}</TableCell>
                          <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.address}</TableCell>
                          <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.ownerName}</TableCell>
                          <TableCell className="px-4 py-2 capitalize font-semibold text-gray-700">{b.businessType.replace(/_/g, ' ')}</TableCell>
                          <TableCell className="px-4 py-2 space-x-2">
                            <button
                              onClick={() => handleAction(b._id, 'approve')}
                              title="Approve"
                              className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600 shadow"
                            >
                              <FaCheck />
                            </button>
                            <button
                              onClick={() => handleAction(b._id, 'reject')}
                              title="Reject"
                              className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow"
                            >
                              <FaTimes />
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pending; 