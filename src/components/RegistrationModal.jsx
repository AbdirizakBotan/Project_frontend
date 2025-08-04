import React, { useState, useEffect } from 'react';

function RegistrationModal({ isOpen, onClose, businessData, onEdit, onConfirm }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(businessData);

  // Update editedData when businessData changes
  useEffect(() => {
    setEditedData(businessData);
    setIsEditing(false);
  }, [businessData]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(editedData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedData(businessData);
    setIsEditing(false);
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundImage: `linear-gradient(rgba(30, 41, 59, 0.7), rgba(30, 41, 59, 0.7)), url('https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=1200&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div
        className="relative rounded-3xl shadow-lg p-8 w-full max-w-xl overflow-hidden bg-purple-800 bg-opacity-95 backdrop-blur text-white"
      >
        <h2 className="text-xl text-white font-bold mb-4 text-center">Business Registration</h2>
        
        {isEditing ? (
          <div className="space-y-3  text-left">
            <div>
              <label className="block text-white font-semibold mb-1 text-left">Business Name :</label>
              <input
                type="text"
                value={editedData.businessName}
                onChange={(e) => setEditedData({...editedData, businessName: e.target.value})}
                className="w-full px-3 py-2 rounded bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1 text-left">Address :</label>
              <input
                type="text"
                value={editedData.address}
                onChange={(e) => setEditedData({...editedData, address: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1 text-left">Owner Name :</label>
              <input
                type="text"
                value={editedData.ownerName}
                onChange={(e) => setEditedData({...editedData, ownerName: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1 text-left">Email :</label>
              <input
                type="email"
                value={editedData.email}
                onChange={(e) => setEditedData({...editedData, email: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              />
            </div>
            <div>
              <label className="block text-white font-semibold mb-1 text-left">Business Type :</label>
              <select
                value={editedData.businessType}
                onChange={(e) => setEditedData({...editedData, businessType: e.target.value})}
                className="w-full px-3 py-2 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-300 text-black"
              >
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
            </div>
          </div>
        ) : (
          <div className="space-y-2 text-white text-left">
            <p><strong>Business Name :</strong> {businessData.businessName}</p>
            <p><strong>Address :</strong> {businessData.address}</p>
            <p><strong>Owner Name :</strong> {businessData.ownerName}</p>
            <p><strong>Email :</strong> {businessData.email}</p>
            <p><strong>Business Type :</strong> {businessData.businessType}</p>
          </div>
        )}

        <div className="flex justify-end space-x-3 mt-6">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Save
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleEdit}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                OK
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegistrationModal; 