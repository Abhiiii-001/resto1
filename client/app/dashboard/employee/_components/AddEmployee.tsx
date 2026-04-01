'use client';

import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

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

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
}) => {
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-black">Add Employee</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block py-1 text-sm font-semibold text-gray-700">
              Name<span className="pl-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('name', { required: 'Name is required' })}
              className="w-full rounded border p-2 text-black"
              placeholder="Enter employee name"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block py-1 text-sm font-semibold text-gray-700">
              Email<span className="pl-1 text-red-500">*</span>
            </label>
            <input
              type="email"
              {...register('email', { required: 'Email is required' })}
              className="w-full rounded border p-2 text-black"
              placeholder="Enter employee email"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <label className="block py-1 text-sm font-semibold text-gray-700">
              Number<span className="pl-1 text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register('number', { required: 'Number is required' })}
              className="w-full rounded border p-2 text-black"
              placeholder="Enter contact number"
            />
            {errors.number && (
              <p className="text-sm text-red-500">{errors.number.message}</p>
            )}
          </div>

          <div>
            <label className="block py-1 text-sm font-semibold text-gray-700">
              Role<span className="pl-1 text-red-500">*</span>
            </label>
            <select
              {...register('role', { required: 'Role is required' })}
              className="w-full rounded border bg-white p-2 text-sm text-gray-700 text-opacity-60"
            >
              <option value="">Select Role</option>
              {/* <option value="admin">Admin</option> */}
              <option value="User">User</option>
              {/* <option value="staff">Staff</option> */}
            </select>
            {errors.role && (
              <p className="text-sm text-red-500">{errors.role.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl bg-gray-400 px-4 py-2 text-white transition-all duration-200 hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-xl bg-blue-400 px-4 py-2 text-white transition-all duration-200 hover:bg-blue-500"
            >
              Add Employee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
