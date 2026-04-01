'use client'; // Important for client-side rendering

import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, OctagonAlert, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify'; // ✅ Import toast

import AddEmployeeModal from './_components/AddEmployee';

import {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from '@/redux/api/employee';
import { useAppSelector } from '@/redux/redux';
import Loader from '@/components/common/Loader';
import EmployeeCard from './_components/EmployeeCard';

interface Employee {
  id: string;
  email: string;
  password: string;
  name?: string;
  number: string;
  canModify: boolean;
  role: string;
  restaurantId: string;
  verificationToken: string;
  isVerified: boolean;
  image: string;
}

// const employees: Employee[] = [
//   {
//     id: "1",
//     email: "amankrsingh58@gmail.com",
//     password: "pass",
//     name: "Abhi",
//     number: "1234567890",
//     canModify: false,
//     role: "User",
//     restaurantId: "restro",
//     verificationToken: "token123",
//     isVerified: false,
//     image: "img.com",
//   },
//   {
//     id: "2",
//     email: "amankrsingh58@gmail.com",
//     password: "pas",
//     name: "Adi",
//     number: "0987654321",
//     canModify: true,
//     role: "chef",
//     restaurantId: "restro1",
//     verificationToken: "token456",
//     isVerified: true,
//     image: "adi",
//   },
// ];

// interface confirmationDialogInterfacce {
//   title: string;
//   desc: string;
//   clickHandler: () => void;
//   isModalOpen: boolean;
//   setIsModalOpen: any;
// }

function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employees, setEmployees] = useState<Employee[] | []>([]);

  const { restaurantId } = useAppSelector((state) => state.auth);

  const {
    data: employeesApiData,
    isLoading,
    isError,
  } = useGetAllEmployeesQuery(restaurantId);
  const [addEmployee] = useAddEmployeeMutation();

  useEffect(() => {
    if (employeesApiData?.success == false) {
      toast.error(employeesApiData?.message);
    } else if (employeesApiData?.success) {
      setEmployees(employeesApiData.users);
    }
    // console.log("Employee Api data",employeesApiData);
    // console.log("Employee",employees);
  }, [employeesApiData]);

  //add new employr
  const handleAddEmployee = async (employeeData: Employee) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await addEmployee({
        restaurantId,
        data: employeeData,
      }).unwrap();
      console.log('Employee added successfully:', response);
      if (!response.success) {
        throw new Error(response.message);
      } else {
        toast.success('Employee added successfully!');
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error(error.message);
    }
    setIsModalOpen(false);
    toast.dismiss(toastId);
  };

  //temprorary
  const [temp, setTemp] = useState(false);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="z-0 min-h-screen p-6 px-10 text-white">
      <div className="mb-4 flex w-full flex-col items-center md:flex-row md:justify-between">
        <h1 className="text-3xl font-bold text-black">Teams</h1>
        {/* <button className="bg-blue-400 px-4 py-3 text-gray-100 rounded-xl text-sm font-semibold hover:bg-blue-300 transition-all duration-200 mt-2 md:mt-0">
          + Add Employee
        </button> */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-2 rounded-xl bg-blue-400 px-4 py-3 text-sm font-semibold text-gray-100 transition-all duration-200 hover:bg-blue-300 md:mt-0"
          >
            + Add Employee
          </button>

          <AddEmployeeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddEmployee={handleAddEmployee}
          />
        </div>
      </div>

      <div className="flex flex-row gap-2 pb-4 text-[16px] font-semibold text-gray-400">
        <Link href={'/'} className="hover:text-gray-600">
          Home
        </Link>
        {'>'}
        <Link href={'/dashboard'} className="hover:text-gray-600">
          Dashboard
        </Link>
        {'>'}
        <Link href={'/dashboard/employee'} className="hover:text-gray-600">
          Employees
        </Link>
      </div>

      <div className="z-0 overflow-x-auto lg:w-full">
        {/* Employee Column Detail */}
        <div className="-z-1 relative mb-4 mt-6 hidden gap-4 rounded-xl border bg-white p-3 px-5 font-sans font-semibold text-gray-700 shadow-sm md:grid md:grid-cols-11">
          <div className="col-span-1">Image</div>
          <div className="col-span-3">Personal Details</div>
          {/* <div className="col-span-1"></div> */}
          <div className="col-span-2">Role</div>
          <div className="col-span-2">Verification</div>
          <div className="col-span-2">Product Manager</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Employee Details List */}
        <div className="-z-10 space-y-4">
          {employees && employees.length > 0 ? (
            employees.map((emp: Employee) => (
              <EmployeeCard emp={emp} key={emp.id} />
            ))
          ) : (
            <div className="flex h-[50vh] w-full items-center justify-center text-3xl font-semibold text-black">
              No member is added yet!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmployeesPage;
