'use client';

import React, { useEffect, useState } from 'react';
import { ChevronRight, Plus } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-toastify';

import AddEmployeeModal from './_components/AddEmployee';

import {
  useGetAllEmployeesQuery,
  useAddEmployeeMutation,
} from '@/redux/api/employee';
import { useAppSelector } from '@/redux/redux';
import Loader from '@/components/common/Loader';
import EmployeeCard from './_components/EmployeeCard';
import { Button } from '@/components/ui/button';
import { AddUpdateUserPayload, User } from '@/types/employee';

function EmployeesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { restaurantId } = useAppSelector((state) => state.auth);

  const {
    data: employees,
    isLoading,
    isError,
  } = useGetAllEmployeesQuery(restaurantId);
  const [addEmployee] = useAddEmployeeMutation();

  const handleAddEmployee = async (employeeData: AddUpdateUserPayload) => {
    const toastId = toast.loading('Adding employee...');
    try {
      const response = await addEmployee({
        ...employeeData,
        restaurantId,
      }).unwrap();
      if (!response.success) {
        throw new Error(response.message);
      } else {
        toast.success('Employee added successfully!');
      }
    } catch (error: any) {
      console.error('Error adding employee:', error);
      toast.error(error?.data?.message || error?.message || 'Failed to add employee');
    }
    setIsModalOpen(false);
    toast.dismiss(toastId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col px-4 py-6 md:px-10 bg-gray-50/50 min-h-screen">
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Teams
          </h2>
          <div className="mt-2 flex items-center text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">Employees</span>
          </div>
        </div>

        <div>
          <Button onClick={() => setIsModalOpen(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Employee
          </Button>

          <AddEmployeeModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddEmployee={handleAddEmployee}
          />
        </div>
      </div>

      <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="w-full overflow-x-auto no-scrollbar">
          <div className="min-w-[1000px]">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-4 border-b border-border bg-gray-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              <div className="col-span-1">Profile</div>
              <div className="col-span-3">Personal Details</div>
              <div className="col-span-2">Role</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2">Menu Edit Access</div>
              <div className="col-span-2 text-right pr-6">Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-gray-100">
              {employees && employees.length > 0 ? (
                employees.map((emp: User) => (
                  <EmployeeCard emp={emp} key={emp.id} />
                ))
              ) : (
                <div className="flex h-[400px] w-full flex-col items-center justify-center gap-2">
                  <p className="text-lg font-medium text-muted-foreground">
                    No team members added yet
                  </p>
                  <p className="text-sm text-gray-400">
                    Click "Add Employee" to invite a new team member.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeesPage;
