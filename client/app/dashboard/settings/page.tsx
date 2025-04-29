"use client";

import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";

import { useChangePasswordMutation } from "@/redux/api/auth";
import { useDeleteEmployeeMutation, useUpdateEmployeeMutation } from "@/redux/api/employee";
import { restaurantApi, useDeleteRestaurantMutation, useUpdateRestuarantDetailsMutation } from "@/redux/api/restaurant";
import { toast } from "react-toastify";
import Loader from "@/components/common/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/states/authSlice";

export default function EmployeeSettings() {

  const dispatch = useAppDispatch();
  const { user, role } = useAppSelector((state) => state.auth);

  const [expanded, setExpanded] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [personalDetails, setPersonalDetails] = useState(user);
  const [profileImage, setProfileImage] = useState(user?.thumbnail);

  // APIs
  const [updateEmployeeApi,{isLoading: updateEmployeeLoader}] = useUpdateEmployeeMutation();
  const [deleteEmployeeApi,{isLoading: deleteEmployeeLoader}] = useDeleteEmployeeMutation();
  const [updateRestaurantApi,{isLoading: updateRestaurantLoader}] = useUpdateRestuarantDetailsMutation();
  const [deleteRestaurantApi,{isLoading: deleteRestaurantLoader}] = useDeleteRestaurantMutation();
  const [changePasswordApi,{isLoading: changePasswordLoader}] = useChangePasswordMutation();

  useEffect(() => {
    setPersonalDetails(user);
    setProfileImage(
      user?.thumbnail ??
        `https://ui-avatars.com/api/?name=${encodeURIComponent(
          user.name
        )}&background=random`
    );
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  const toggleExpand = (section: string) => {
    setExpanded(expanded === section ? null : section);
    if (section === "info") setIsEditing(false);
  };

  const handleEdit = () => {
    setExpanded("info");
    setIsEditing(true);
  };


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

  const ChangePasswordHandler = async (data: any) => {
     try {
      
      const response = await changePasswordApi({id: user?.id,...data,role}).unwrap();
      if(!response?.success){
        throw new Error(response?.message);
      }
      reset();
      toast.success("Password changed!")

     } catch (error) {
        console.log("Change password error",error);
        toast.error(error?.message)
     }
  };

  const UpdateUserHandler = async () => {
    setIsEditing(false);
    try {
      let response;
      if(role === "Restaurant"){
        response = await updateRestaurantApi({restaurantId: user?.id,...personalDetails}).unwrap();
      }
      else if(role === "User"){
        response = await updateEmployeeApi({id: user?.id,...personalDetails}).unwrap();
      }

      if(!response || !response?.success){
        throw new Error(response?.message);
      }

      console.log("response",response);
      useDispatch(setUser(response?.data))
      toast.success("Information Updated!")

    } catch (error) {
      console.log("Update user error",error);
        toast.error(error?.message || "Something went wrong!")
    }
  };

  const DeleteUserHandler = async () => {
    try {
      let response;
      if(role === "Restaurant"){
        response = await deleteRestaurantApi({restaurantId: user?.id}).unwrap();
      }
      else if(role === "User"){
        response = await deleteEmployeeApi({id: user?.id}).unwrap();
      }

      if(!response || !response?.success){
        throw new Error(response?.message);
      }

      toast.success("User Deleted!")

    } catch (error) {
      console.log("Delete user error",error);
        toast.error(error?.message || "Something went wrong!")
    }
  };

  if(updateEmployeeLoader || updateRestaurantLoader || deleteEmployeeLoader || deleteRestaurantLoader || changePasswordLoader){
    return <Loader/>
  }

  return (
    <div className="  min-h-screen text-gray-800 p-6 flex flex-col items-center">
      {/* Profile Header */}
      <div className="bg-white text-gray-800 rounded-lg w-full sm:w-[90%] p-4 flex flex-col sm:flex-row items-center gap-4">
        {/* Profile Image */}
        <label className="cursor-pointer relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
            disabled={role !== "Restaurant"}
          />
          <div className="w-24 h-24 text-gray-600 rounded-full flex items-center justify-center overflow-hidden border border-gray-300">
            {profileImage ? (
              <img
                src={profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span>Image</span>
            )}
          </div>
        </label>

        {/* Name & Email */}
        <div className="text-center sm:text-left">
          <h2 className="text-xl font-bold flex items-center gap-2">
            {personalDetails.name}
            {personalDetails.isVerified && (
              <span className="text-green-400 text-sm">✔</span>
            )}
          </h2>
          <p className="text-gray-400">{personalDetails.email}</p>
        </div>

        {/* Edit Button */}
        <button
          onClick={handleEdit}
          className="mt-2 sm:mt-0 sm:ml-auto border duration-400 px-3 py-1 rounded hover:bg-gray-700 hover:text-white"
        >
          Edit
        </button>
      </div>

      {/* Sections */}
      <div className="b-white w-full sm:w-[90%] mt-4">
        {/* Restaurant Info */}
        {role === "Restaurant" ? (
          <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg mb-2 transition-all duration-300">
            <button
              onClick={() => toggleExpand("info")}
              className="w-full text-left flex justify-between"
            >
              Restaurant Information
              <span>{expanded === "info" ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded === "info"
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4 space-y-2">
                {["name","slogan", "email", "phone","address"].map((field) => (
                  <div key={field}>
                    <label>
                      <strong>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </strong>
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={
                        field !== "phone"
                          ? personalDetails[field]
                          : personalDetails?.number
                      }
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          [field]: e.target.value,
                        })
                      }
                      disabled={!isEditing || field === "email"}
                      className="w-full p-2 rounded  text-gray-800 bg-gray-200"
                    />
                  </div>
                ))}
                <label>
                  <strong>Role:</strong>
                </label>
                <input
                  type="text"
                  value={personalDetails.role}
                  disabled
                  className="w-full p-2 rounded bg-gray-200 text-gray-800"
                />
                {isEditing && (
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => toggleExpand("info")}
                      className="bg-gray-500 px-4 py-2 rounded  hover:bg-gray-600 transition-all duration-300 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={UpdateUserHandler}
                      className="bg-blue-500 px-4 py-2 rounded  hover:bg-blue-600 transition-all duration-300 text-white"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg mb-2 transition-all duration-300">
            <button
              onClick={() => toggleExpand("info")}
              className="w-full text-left flex justify-between"
            >
              Personal Information
              <span>{expanded === "info" ? "▲" : "▼"}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-300 ${
                expanded === "info"
                  ? "max-h-96 opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="mt-4 space-y-2">
                {["name", "email", "phone"].map((field) => (
                  <div key={field}>
                    <label>
                      <strong>
                        {field.charAt(0).toUpperCase() + field.slice(1)}:
                      </strong>
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      value={
                        field !== "phone"
                          ? personalDetails[field]
                          : personalDetails?.number
                      }
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          [field]: e.target.value,
                        })
                      }
                      disabled={!isEditing || field === "email"}
                      className="w-full p-2 rounded  text-gray-800 bg-gray-200"
                    />
                  </div>
                ))}
                <label>
                  <strong>Role:</strong>
                </label>
                <input
                  type="text"
                  value={personalDetails.role}
                  disabled
                  className="w-full p-2 rounded bg-gray-200 text-gray-800"
                />
                {isEditing && (
                  <div className="mt-2 flex justify-end gap-2">
                    <button
                      onClick={() => toggleExpand("info")}
                      className="bg-gray-500 px-4 py-2 rounded  hover:bg-gray-600 transition-all duration-300 text-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={UpdateUserHandler}
                      className="bg-blue-500 px-4 py-2 rounded  hover:bg-blue-600 transition-all duration-300 text-white"
                    >
                      Save
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Change Password */}
        <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg mb-2 transition-all duration-300">
          <button
            onClick={() => toggleExpand("password")}
            className="w-full text-left flex justify-between"
          >
            Change Password
            <span>{expanded === "password" ? "▲" : "▼"}</span>
          </button>
          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded === "password"
                ? "max-h-96 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <form
              onSubmit={handleSubmit(ChangePasswordHandler)}
              className="mt-4"
            >
              {["currentPassword", "newPassword", "confirmPassword"].map(
                (field, index) => {
                  return (
                    <div key={field}>
                      <label className="capitalize text-sm text-gray-600 my-1">
                        {field.replace(/([A-Z])/g, " $1")}
                        <sup className="text-red-500">*</sup>
                      </label>
                      <input
                        type="password"
                        placeholder={`Enter ${field.replace(
                          /([A-Z])/g,
                          " $1"
                        )}`}
                        {...register(field, {
                          required: `${field.replace(
                            /([A-Z])/g,
                            " $1"
                          )} is required`,
                        })}
                        className="w-full p-2 rounded  text-gray-900 bg-gray-200 mb-2"
                      />
                      {errors[field] && (
                        <p className="text-red-500">{errors[field].message}</p>
                      )}
                    </div>
                  );
                }
              )}
              <div className="flex justify-end mt-2">
                <button
                  type="button"
                  className="bg-red-500  hover:bg-red-600 transition-all duration-300 px-4 py-2 rounded mr-2 text-white"
                  onClick={() => toggleExpand("password")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500  hover:bg-blue-600 transition-all duration-300 px-4 py-2 rounded text-white"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Delete Account */}
        <div className="bg-white text-gray-800 font-semibold p-4 rounded-lg transition-all duration-300">
          <button
            onClick={() => toggleExpand("delete")}
            className="w-full text-left flex justify-between"
          >
            Delete Account
            <span>{expanded === "delete" ? "▲" : "▼"}</span>
          </button>
          <div
            className={`overflow-hidden transition-all text-gray-500 duration-300 ${
              expanded === "delete"
                ? "max-h-40 opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="mt-4">
              <p>
                Are you sure you want to delete your account? 
              </p>
              <div className="w-full flex justify-end">
              <button
                className="bg-red-500 px-4 py-2 rounded mt-2 w-fit text-white  hover:bg-red-600 transition-all duration-300"
                onClick={() => setShowModal(true)}
              >
                Delete Account
              </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 rounded">
          <div className="bg-gray-800 p-6 rounded-lg text-center w-[90%] sm:w-1/3">
            <h3 className="text-xl font-bold">Confirm Deletion</h3>
            <p className="mt-2 text-white">
              Are you sure you want to delete your account?
            </p>
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 px-4 py-2 text-white rounded"
              >
                Cancel
              </button>
              <button
                className="bg-red-500 px-4 py-2 text-white rounded"
                onClick={DeleteUserHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
