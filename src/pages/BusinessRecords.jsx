import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import axios from 'axios';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

function BusinessRecords() {
  const [businesses, setBusinesses] = useState([]);
  const [error, setError] = useState(null);
  const [editId, setEditId] = useState(null);
  const [editForm, setEditForm] = useState({ businessName: '', address: '', ownerName: '', businessType: '' });
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchApproved = async () => {
    try {
      const res = await axios.get('https://project-backend-last.onrender.com/approved');
      setBusinesses(res.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch approved businesses');
    }
  };

  useEffect(() => {
    fetchApproved();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://project-backend-last.onrender.com/delete/${id}`);
      fetchApproved();
      toast.success('Business deleted successfully!', { position: 'top-center', autoClose: 2000 });
    } catch (err) {
      setError('Delete failed');
      toast.error('Delete failed', { position: 'top-center', autoClose: 2000 });
    }
  };

  const handleEdit = (business) => {
    setEditId(business._id);
    setEditForm({
      businessName: business.businessName,
      address: business.address,
      ownerName: business.ownerName,
      businessType: business.businessType,
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(`https://project-backend-last.onrender.com/update/${id}`, editForm);
      setEditId(null);
      fetchApproved();
      toast.success('Business updated successfully!', { position: 'top-center', autoClose: 2000 });
    } catch (err) {
      setError('Update failed');
      toast.error('Update failed', { position: 'top-center', autoClose: 2000 });
    }
  };

  const handleSearch = async (query) => {
    if (!query) {
      setSearchResults([]);
      setSearching(false);
      setSearchModalOpen(false);
      return;
    }
    setSearching(true);
    setSearchModalOpen(true);
    try {
      const res = await axios.get(`https://project-backend-last.onrender.com/search?q=${encodeURIComponent(query)}`);
      setSearchResults(res.data);
    } catch {
      setSearchResults([]);
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <Sidebar />
      <div className="flex-1">
        <div className="-mt-3 px-4">
          <Header onSearch={handleSearch} />
        </div>
        <div className="pt-2  p-10">
          {/* <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center tracking-tight">Business Records</h2> */}
          <div className="flex  justify-center">
            <div className="w-full  max-w-5xl">
              <div className="bg-white rounded-2xl shadow-lg p-6">
                {error ? (
                  <div className="text-red-500">{error}</div>
                ) : (searching ? (
                  <>
                    <h3 className="text-lg font-bold mb-2 text-blue-700">Search Results</h3>
                    {searchResults.filter(b => b.status === 'approved').length === 0 ? (
                      <div className="text-gray-500">No results found.</div>
                    ) : (
                      <Table className="min-w-full">
                        <TableHeader>
                          <TableRow className="bg-blue-50">
                            <TableHead className="px-4 py-3 font-bold text-blue-900">No</TableHead>
                            <TableHead className="px-4 py-3 font-bold text-blue-900">Business Name</TableHead>
                            <TableHead className="px-4 py-3 font-bold text-blue-900">Address</TableHead>
                            <TableHead className="px-4 py-3 font-bold text-blue-900">Owner</TableHead>
                            <TableHead className="px-4 py-3 font-bold text-blue-900">Type</TableHead>
                            <TableHead className="px-4 py-3 font-bold text-blue-900">Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {searchResults.filter(b => b.status === 'approved').map((b, idx) => (
                            <TableRow key={b._id} className="hover:bg-blue-100/60 transition rounded-xl">
                              <TableCell className="px-4 py-2 font-semibold text-gray-700">{idx + 1}</TableCell>
                              <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.businessName}</TableCell>
                              <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.address}</TableCell>
                              <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.ownerName}</TableCell>
                              <TableCell className="px-4 py-2 capitalize font-semibold text-gray-700">{b.businessType.replace(/_/g, ' ')}</TableCell>
                              <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.status}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    )}
                  </>
                ) : (businesses.length === 0 ? (
                  <div>No approved businesses.</div>
                ) : (
                  <>
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
                        {businesses.slice((currentPage-1)*itemsPerPage, currentPage*itemsPerPage).map((b, idx) => (
                          <TableRow key={b._id} className="hover:bg-blue-100/60 transition rounded-xl">
                            {editId === b._id ? (
                              <>
                                <TableCell className="px-4 py-2">{(currentPage-1)*itemsPerPage + idx + 1}</TableCell>
                                <TableCell className="px-4 py-2"><input name="businessName" value={editForm.businessName} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" /></TableCell>
                                <TableCell className="px-4 py-2"><input name="address" value={editForm.address} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" /></TableCell>
                                <TableCell className="px-4 py-2"><input name="ownerName" value={editForm.ownerName} onChange={handleEditChange} className="border rounded px-2 py-1 w-full" /></TableCell>
                                <TableCell className="px-4 py-2"><select name="businessType" value={editForm.businessType} onChange={handleEditChange} className="border rounded px-2 py-1 w-full">
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
                                </select></TableCell>
                                <TableCell className="px-4 py-2 space-x-2">
                                  <button onClick={() => handleUpdate(b._id)} title="Save" className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 shadow"><FaSave /></button>
                                  <button onClick={() => setEditId(null)} title="Cancel" className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500 shadow"><FaTimes /></button>
                                </TableCell>
                              </>
                            ) : (
                              <>
                                <TableCell className="px-4 py-2 font-semibold text-gray-700">{(currentPage-1)*itemsPerPage + idx + 1}</TableCell>
                                <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.businessName}</TableCell>
                                <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.address}</TableCell>
                                <TableCell className="px-4 py-2 font-semibold text-gray-700">{b.ownerName}</TableCell>
                                <TableCell className="px-4 py-2 capitalize font-semibold text-gray-700">{b.businessType.replace(/_/g, ' ')}</TableCell>
                                <TableCell className="px-4 py-2 space-x-2">
                                  <button onClick={() => handleEdit(b)} title="Edit" className="bg-yellow-400 text-white p-2 rounded-lg hover:bg-yellow-500 shadow"><FaEdit /></button>
                                  <button onClick={() => handleDelete(b._id)} title="Delete" className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 shadow"><FaTrash /></button>
                                </TableCell>
                              </>
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    {/* Pagination Controls */}
                    {businesses.length > itemsPerPage && (
                      <div className="flex justify-center items-center mt-4 space-x-4">
                        <button
                          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-4 py-2 rounded bg-blue-200 text-blue-900 font-semibold shadow ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
                        >
                          Prev
                        </button>
                        <span className="font-semibold text-blue-700">Page {currentPage} of {Math.ceil(businesses.length / itemsPerPage)}</span>
                        <button
                          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(businesses.length / itemsPerPage)))}
                          disabled={currentPage === Math.ceil(businesses.length / itemsPerPage)}
                          className={`px-4 py-2 rounded bg-blue-200 text-blue-900 font-semibold shadow ${currentPage === Math.ceil(businesses.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-300'}`}
                        >
                          Next
                        </button>
                      </div>
                    )}
                  </>
                )))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusinessRecords; 