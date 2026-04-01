'use client';
import { useState } from 'react';

const EditProfileModal = ({ isOpen, onClose }) => {
  const [user] = useState({
    name: 'Aman Singh',
    email: 'amankrsingh58@gmail.com',
    avatar: '/team1.png', // Replace with actual profile image URL
  });
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[90%] rounded-lg bg-white shadow-lg md:w-[40%]">
        {/* Header */}
        <div className="relative rounded-t-lg bg-gradient-to-r from-blue-500 to-blue-700 p-6 text-white">
          <h2 className="text-lg font-semibold">Edit Profile</h2>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-2xl text-white"
          >
            &times;
          </button>
          <div className="mt-4 flex justify-center">
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-white">
              <img
                src="/profile-placeholder.png"
                alt="Profile"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black bg-opacity-50">
                <span className="text-sm text-white">📷</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="p-6">
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              defaultValue={user.name}
            />
          </div>

          <div className="mb-4">
            <label className="block font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              defaultValue="8287393644"
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              defaultValue={user.email}
            />
          </div>
          <div className="mb-4">
            <label className="block font-medium text-gray-700">Email</label>
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
              defaultValue={user.email}
            />
          </div>

          <div className="text-right">
            <button
              onClick={onClose}
              className="mr-2 rounded-[8px] bg-gray-300 px-4 py-2 transition-all duration-300 hover:bg-gray-400"
            >
              Cancel
            </button>
            <button className="rounded-[8px] bg-blue-500 px-4 py-2 text-white transition-all duration-300 hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
