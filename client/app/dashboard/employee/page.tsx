"use client"; // Important for client-side rendering

import React, { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-toastify"; // ✅ Import toast


import AddEmployeeModal from "./_components/AddEmployee";

import {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} from "@/redux/api/employee";



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

const dummyEmployees: Employee[] = [
  {
    id: "1",
    email: "amankrsingh58@gmail.com",
    password: "pass",
    name: "Abhi",
    number: "1234567890",
    canModify: false,
    role: "User",
    restaurantId: "restro",
    verificationToken: "token123",
    isVerified: false,
    image: "img.com",
  },
  {
    id: "2",
    email: "amankrsingh58@gmail.com",
    password: "pas",
    name: "Adi",
    number: "0987654321",
    canModify: true,
    role: "chef",
    restaurantId: "restro1",
    verificationToken: "token456",
    isVerified: true,
    image: "adi",
  },
];

function EmployeesPage() {

  const { data: employees, isLoading, isError } = useGetAllEmployeesQuery(); 
  const [addEmployee] = useAddEmployeeMutation(); 
  const [updateEmployee] = useUpdateEmployeeMutation(); 
  const [deleteEmployee] = useDeleteEmployeeMutation(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <p>Loading employees...</p>;
  if (isError) return <p>Error loading employees.</p>;



  const toggleVerified = async (id: string, isVerified: boolean) => {
    try {
      await updateEmployee({ id, data: { isVerified: !isVerified } }).unwrap();
    } catch (error) {
      console.error("Error updating verification status:", error);
    }
  };

  const toggleCanModify = async (id: string, canModify: boolean) => {
    try {
      await updateEmployee({ id, data: { canModify: !canModify } }).unwrap();
    } catch (error) {
      console.error("Error updating canModify status:", error);
    }
  };



  //  Delete employee
  const handleDeleteEmployee = async (id: string) => {
    await deleteEmployee(id);
  };

  //add new employr
  const handleAddEmployee = async (employeeData: Employee) => {
    try {
      const response = await addEmployee(employeeData).unwrap(); 
      console.log("Employee added successfully:", response);

      toast.success("Employee added successfully!"); 
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding employee:", error);
      toast.error("Failed to add employee. Please try again."); 
    }
  };


  console.log("New Employee:", employees);

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 w-full">
        <h1 className="text-3xl text-black font-bold">Teams</h1>
        {/* <button className="bg-blue-400 px-4 py-3 text-gray-100 rounded-xl text-sm font-semibold hover:bg-blue-300 transition-all duration-200 mt-2 md:mt-0">
          + Add Employee
        </button> */}
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-400 px-4 py-3 text-gray-100 rounded-xl text-sm font-semibold hover:bg-blue-300 transition-all duration-200 mt-2 md:mt-0"
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

      <div className="pb-4 flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
        <Link href={"/"} className="hover:text-gray-600">
          Home
        </Link>
        {">"}
        <Link href={"/dashboard"} className="hover:text-gray-600">
          Dashboard
        </Link>
        {">"}
        <Link href={"/dashboard/employee"} className="hover:text-gray-600">
          Employees
        </Link>
      </div>

      {/* Employee Column Detail */}
      <div className="hidden md:grid md:grid-cols-7 bg-white text-black p-3 rounded-md mb-4 font-semibold text-center">
        <span>Image</span>
        <span>Name</span>
        <span></span>
        <span>Role</span>
        <span>Verified</span>
        <span>Can Modify</span>
        <span>Actions</span>
      </div>

      {/* Employee Details List */}
      <div className="space-y-4">
        {employees.map((emp: Employee) => (
          <div
            key={emp.id}
            className="grid grid-cols-1 md:grid-cols-7 items-center bg-white p-4 rounded-md gap-2 border border-black"
          >
            <div className="flex justify-center">
              <img
                src={emp.image}
                alt={emp.name}
                className="w-16 h-16 rounded-md"
              />
            </div>
            <div className="xs:pl-[1px] lg:pl-[38px] md:text-left sm:text-left">
              <h2 className="text-lg text-black font-semibold">{emp.name}</h2>
              <p className="text-black">{emp.number}</p>
              <p className="text-black">{emp.email}</p>
            </div>
            <p className="text-black lg:text-center md:text-center"></p>
            <p className="text-black lg:text-center md:text-left">{emp.role}</p>

            {/* Verified Button */}
            <div className="flex justify-center">
              {/* isVerified  true */}
              {emp.isVerified === true? (
                <button className="px-4 py-2 bg-green-500 rounded-[10px] text-white">
                  Verified
                </button>
              ) : (
                <button
                  className={`relative inline-flex lg:items-center xs:items-left justify-center w-16 h-8 rounded-full transition-all duration-300 ${emp.isVerified ? "bg-green-500" : "bg-red-500"
                    }`}
                  onClick={() => toggleVerified(emp.id, emp.isVerified)}
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${emp.isVerified ? "translate-x-8" : "translate-x-0"
                      }`}
                  ></span>
                </button>
              )}
            </div>


                       {/* Can Modify  */}
            <div className="flex justify-center">
              <button
                className={`relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 ${emp.canModify ? "bg-green-500" : "bg-red-500"
                  }`}
                onClick={() => toggleCanModify(emp.id, emp.canModify)}
              >
                <span
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${emp.canModify ? "translate-x-8" : "translate-x-0"
                    }`}
                ></span>
              </button>
            </div>

            {/* Delete Button */}
            <div className="flex justify-center">
              <button
                className="bg-red-600 text-white px-3 py-2 rounded-[8px] flex items-center gap-1 hover:bg-red-500 transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => handleDeleteEmployee(emp.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmployeesPage;