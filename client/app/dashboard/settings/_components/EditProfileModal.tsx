"use client";
import { useState } from "react";



const EditProfileModal = ({ isOpen, onClose }) => {
    const [user] = useState({
      name: "Aman Singh",
      email: "amankrsingh58@gmail.com",
      avatar: "/team1.png", // Replace with actual profile image URL
    });
  if (!isOpen) return null; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[40%] shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white rounded-t-lg relative">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button onClick={onClose} className="absolute top-4 right-4 text-white text-2xl">
            &times;
          </button>
          <div className="flex justify-center mt-4">
            <div className="relative w-24 h-24 rounded-full border-4 border-white overflow-hidden">
              <img src="/profile-placeholder.png" alt="Profile" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center cursor-pointer">
                <span className="text-white text-sm">📷</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              defaultValue={user.name}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Phone Number</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              defaultValue="8287393644"
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              defaultValue={user.email}
              
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              defaultValue={user.email}
              
            />
          </div>

          <div className="text-right">
            <button onClick={onClose} className="px-4 py-2 bg-gray-300 hover:bg-gray-400 transition-all duration-300 rounded-[8px] mr-2">Cancel</button>
            <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 transition-all duration-300 text-white rounded-[8px]">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
