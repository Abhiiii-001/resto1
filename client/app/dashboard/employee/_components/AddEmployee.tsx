"use client";

import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface EmployeeData {
  name: string;
  email: string;
  number: string;
  role: string;
}

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (data: EmployeeData) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({ isOpen, onClose, onAddEmployee }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EmployeeData>();

  const onSubmit = (data: EmployeeData) => {
    onAddEmployee(data);
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add Employee</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium">Name</label>
            <input
              type="text"
              {...register("name", { required: "Name is required" })}
              className="w-full border p-2 rounded text-black"
              placeholder="Enter employee name"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full border p-2 rounded text-black"
              placeholder="Enter employee email"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Number</label>
            <input
              type="text"
              {...register("number", { required: "Number is required" })}
              className="w-full border p-2 rounded text-black"
              placeholder="Enter contact number"
            />
            {errors.number && <p className="text-red-500 text-sm">{errors.number.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium">Role</label>
            <select
              {...register("role", { required: "Role is required" })}
              className="w-full border p-2 rounded text-gray-700"
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="chef">Chef</option>
              <option value="staff">Staff</option>
            </select>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-2 mt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
