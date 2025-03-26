"use client"; // Important for client-side rendering

import React, { useEffect, useState } from "react";
import { CheckCircleIcon, OctagonAlert, Trash2 } from "lucide-react";
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

const employees: Employee[] = [
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

  // const { data: employees, isLoading, isError } = useGetAllEmployeesQuery(); 
  const [addEmployee] = useAddEmployeeMutation(); 
  const [updateEmployee] = useUpdateEmployeeMutation(); 
  const [deleteEmployee] = useDeleteEmployeeMutation(); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  // if (isLoading) return <p>Loading employees...</p>;
  // if (isError) return <p>Error loading employees.</p>;



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

  //temprorary
  const [temp,setTemp] = useState(false)


  console.log("New Employee:", employees);

  return (
    <div className="p-6 text-white min-h-screen">
      <div className="flex flex-col md:flex-row md:justify-between items-center mb-4 w-full pr-4">
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

    <div className="w-[900px] lg:w-full pr-4 overflow-x-auto">
        {/* Employee Column Detail */}
        <div className="hidden md:grid md:grid-cols-11 gap-4 bg-white shadow-sm rounded-xl border font-sans text-gray-700 p-3 px-5 mb-4 font-semibold mt-6">
        <div className="col-span-1">Image</div>
        <div className="col-span-3">Personal Details</div>
        {/* <div className="col-span-1"></div> */}
        <div className="col-span-2">Role</div>
        <div className="col-span-2">Verification</div>
        <div className="col-span-2">Product Manager</div>
        <div className="col-span-1">Actions</div>
      </div>

      {/* Employee Details List */}
      <div className="space-y-4">
        {employees.map((emp: Employee) => (
          <div
            key={emp.id}
            className="grid w-full grid-cols-11 items-center bg-white shadow-md p-4 rounded-xl gap-4 border h-[140px]"
          >
            <div className="flex justify-center col-span-1">
              <img
                src={emp.image}
                alt={emp.name}
                className="w-16 h-16 rounded-md"
              />
            </div>
            <div className="col-span-3">
              <h2 className="text-lg text-black font-semibold">{emp.name}</h2>
              <p className="text-gray-600 text-sm mt-1 font-semibold opacity-60 cursor-pointer hover:text-blue-800">{emp.number}</p>
              <p className="text-gray-600 text-sm font-semibold opacity-60 cursor-pointer hover:text-blue-800">{emp.email}</p>
            </div>
           
           <div className="col-span-2 px-6 py-1 border rounded-xl w-fit ">
           <p className="text-gray-600 text-sm font-semibold uppercase">{emp.role}</p>
           </div>

            {/* Verified Button */}
            <div className="col-span-2">
              {/* isVerified  true */}
              {emp.isVerified === true? (
                <div className=" text-sm flex font-semibold items-center text-blue-400 gap-1">
                  <CheckCircleIcon size={18}/>
                  <p className="">Verified</p>
                </div>
              ) : (
                <button
                  onClick={() => toggleVerified(emp.id, emp.isVerified)}
                >
                  <div className=" text-sm flex font-semibold items-center text-red-400 gap-1">
                  <OctagonAlert size={18}/>
                  <p className="">Pending</p>
                </div> 
                </button>
              )}
            </div>


                       {/* Can Modify  */}
            <div className="col-span-2">
              <button
                className={`relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 bg-gray-300
                  }`}
                onClick={() => setTemp(!temp)}
              >
                <span
                  className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${temp ? "translate-x-8" : "translate-x-0"
                    }`}
                ></span>
              </button>
            </div>

            {/* Delete Button */}
            <div className="col-span-1">
              <button
                className="border text-red-400 px-3 py-2 rounded-[12px] flex items-center gap-1 hover:text-red-500 transition-all duration-200 hover:scale-105 active:scale-95"
                onClick={() => handleDeleteEmployee(emp.id)}
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
      

    </div>
  );
}

export default EmployeesPage;