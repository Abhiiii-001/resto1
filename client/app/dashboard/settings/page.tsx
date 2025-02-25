"use client";

import { useState,useRef } from "react";
import { useForm } from "react-hook-form";

export default function EmployeeSettings() {
  const [expanded, setExpanded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [employee, setEmployee] = useState({
    name: "Abhishek Jhatu",
    email: "abhijhatu@gamil.com",
    phone: "8892928929",
    role: "Admin",
    isVerified: true,
  });

  const { register, handleSubmit, formState: { errors } } = useForm();

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
    if (section === "info") setIsEditing(false);
  };

  const handleEdit = () => {
    setExpanded("info");
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const onSubmit = (data) => {
    console.log("Password Updated:", data);
  };

  const [profileImage, setProfileImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (

    <div className="  min-h-scree text-gray-800 p-6 flex flex-col items-center">
      {/* Profile Header */}
      <div className="bg-white text-gray-800 rounded-lg w-full sm:w-[90%] p-4 flex flex-col sm:flex-row items-center gap-4">
      {/* Profile Image */}
      <label className="cursor-pointer relative">
        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
        <div className="w-24 h-24 text-gray-600 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <span>Image</span>
          )}
        </div>
      </label>

      {/* Name & Email */}
      <div className="text-center sm:text-left">
        <h2 className="text-xl font-bold flex items-center gap-2">
          {employee.name}
          {employee.isVerified && <span className="text-green-400 text-sm">✔</span>}
        </h2>
        <p className="text-gray-400">{employee.email}</p>
      </div>

      {/* Edit Button */}
      <button onClick={handleEdit} className="mt-2 sm:mt-0 sm:ml-auto border duration-400 px-3 py-1 rounded hover:bg-gray-700 hover:text-white">Edit</button>
      
    </div>

      {/* Sections */}
      <div className="b-white w-full sm:w-[90%] mt-4">
        {/* Personal Info */}
        <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg mb-2 transition-all duration-300">
          <button onClick={() => toggleExpand("info")} className="w-full text-left flex justify-between">
            Personal Information
            <span>{expanded === "info" ? "▲" : "▼"}</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${expanded === "info" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mt-4 space-y-2">
              {["name", "email", "phone"].map((field) => (
                <div key={field}>
                  <label><strong>{field.charAt(0).toUpperCase() + field.slice(1)}:</strong></label>
                  <input
                    type={field === "email" ? "email" : "text"}
                    value={employee[field]}
                    onChange={(e) => setEmployee({ ...employee, [field]: e.target.value })}
                    disabled={!isEditing}
                    className="w-full p-2 rounded  text-gray-800 bg-gray-200"
                  />
                </div>
              ))}
              <label><strong>Role:</strong></label>
              <input type="text" value={employee.role} disabled className="w-full p-2 rounded bg-gray-200 text-gray-800" />
              {isEditing && (
                <div className="mt-2 flex justify-end gap-2">
                  <button onClick={() => toggleExpand("info")} className="bg-gray-500 px-4 py-2 rounded  hover:bg-gray-600 transition-all duration-300 text-white">Cancel</button>
                  <button onClick={handleSave} className="bg-blue-500 px-4 py-2 rounded  hover:bg-blue-600 transition-all duration-300 text-white">Save</button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Change Password */}
        <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg mb-2 transition-all duration-300">
          <button onClick={() => toggleExpand("password")} className="w-full text-left flex justify-between">
            Change Password
            <span>{expanded === "password" ? "▲" : "▼"}</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${expanded === "password" ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              {["currentPassword", "newPassword", "confirmPassword"].map((field, index) => (
                <div key={field}>
                  <input
                    type="password"
                    placeholder={field.replace(/([A-Z])/g, " $1")}
                    {...register(field, { required: `${field.replace(/([A-Z])/g, " $1")} is required` })}
                    className="w-full p-2 rounded  text-gray-900 bg-gray-200 mb-2"
                  />
                  {errors[field] && <p className="text-red-500">{errors[field].message}</p>}
                </div>
              ))}
              <div className="flex justify-end mt-2">
                <button type="button" className="bg-red-500  hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded mr-2 text-white" onClick={() => toggleExpand("password")}>Cancel</button>
                <button type="submit" className="bg-blue-500  hover:bg-blue-600 transition-all duration-300 px-4 py-2 rounded text-white">Update</button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg transition-all duration-300">
          <button onClick={() => toggleExpand("delete")} className="w-full text-left flex justify-between">
            Delete Account
            <span>{expanded === "delete" ? "▲" : "▼"}</span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${expanded === "delete" ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
            <div className="mt-4">
              <p>Are you sure you want to delete your account? This action is irreversible.</p>
              <button className="bg-red-500 px-4 py-2 rounded mt-2 text-white  hover:bg-red-600 transition-all duration-300" onClick={() => setShowModal(true)}>Delete Account</button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded">
          <div className="bg-gray-800 p-6 rounded-lg text-center w-[90%] sm:w-1/3">
            <h3 className="text-xl font-bold">Confirm Deletion</h3>
            <p className="mt-2 text-white">Are you sure you want to delete your account?</p>
            <div className="mt-4 flex justify-center gap-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-500 px-4 py-2 text-white rounded">Cancel</button>
              <button className="bg-red-500 px-4 py-2 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
