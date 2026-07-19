'use client';
import AlertModal from '@/components/common/AlertModal';
import {
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
} from '@/redux/api/employee';
import { CheckCircleIcon, OctagonAlert, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { User } from '@/types/employee';

type Props = {
  emp: User;
};

function EmployeeCard({ emp }: Props) {
  const [confirmationDialogData, setConfirmationDialogData] = useState<any>();
  const [confirmationDialog, setConfirmationDialog] = useState(false);

  const [updateEmployee, { isLoading: updateEmployeeLoader }] =
    useUpdateEmployeeMutation();
  const [deleteEmployee, { isLoading: deleteEmployeeLoader }] =
    useDeleteEmployeeMutation();

  const toggleVerified = async () => {
    const toastId = toast.loading('Loading..');
    try {
      const res = await updateEmployee({
        ...emp,
        isVerified: !emp.isVerified,
      }).unwrap();
      if (!res?.success) {
        throw new Error(res.message);
      } else {
        toast.success('User verified!');
      }
    } catch (error: any) {
      console.error('Error updating verification status:', error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
    setConfirmationDialog(false);
    setConfirmationDialogData(null);
  };

  const toggleCanModify = async () => {
    const toastId = toast.loading('Loading..');
    try {
      const res = await updateEmployee({
        ...emp,
        canModify: !emp.canModify,
      }).unwrap();
      if (!res?.success) {
        throw new Error(res.message);
      } else {
        toast.success('Change updated!');
      }
    } catch (error: any) {
      console.error('Error updating canModify status:', error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };

  const handleDeleteEmployee = async () => {
    const toastId = toast.loading('Deleting...');
    try {
      const res = await deleteEmployee(emp.id).unwrap();
      if (!res?.success) {
        throw new Error(res.message);
      } else {
        toast.success('User deleted!');
      }
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast.error(error.message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="grid grid-cols-12 items-center gap-4 bg-white px-6 py-4 transition-colors hover:bg-gray-50/50">
      {/* Profile Image */}
      <div className="col-span-1 flex items-center">
        <div className="h-12 w-12 overflow-hidden rounded-full border border-gray-100 bg-gray-50 shadow-sm">
          <img
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`}
            alt={emp.name}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Personal Details */}
      <div className="col-span-3 pr-4">
        <h2 className="font-semibold text-gray-900 truncate">{emp.name}</h2>
        <div className="mt-0.5 flex flex-col gap-0.5 text-xs text-muted-foreground">
          <p className="truncate hover:text-primary cursor-pointer transition-colors">
            {emp.email}
          </p>
          <p className="hover:text-primary cursor-pointer transition-colors">
            {emp.number}
          </p>
        </div>
      </div>

      {/* Role */}
      <div className="col-span-2">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wide text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {emp.role}
        </span>
      </div>

      {/* Verification Status */}
      <div className="col-span-2">
        {emp.isVerified ? (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
            <CheckCircleIcon className="h-3.5 w-3.5" />
            <span>Verified</span>
          </div>
        ) : (
          <button
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-amber-50 px-2 py-1 text-xs font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20 transition-colors hover:bg-amber-100"
            onClick={() => {
              setConfirmationDialogData({
                title: 'Verify User?',
                desc: 'Only verify this user if you trust them to interact with your restaurant data.',
                clickHanlder: toggleVerified,
              });
              setConfirmationDialog(true);
            }}
          >
            <OctagonAlert className="h-3.5 w-3.5" />
            <span>Pending</span>
          </button>
        )}
      </div>

      {/* Can Modify Toggle */}
      <div className="col-span-2 flex items-center">
        <button
          type="button"
          disabled={updateEmployeeLoader}
          onClick={toggleCanModify}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
            emp.canModify ? 'bg-primary' : 'bg-gray-300'
          }`}
        >
          <span className="sr-only">Toggle Modification Access</span>
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              emp.canModify ? 'translate-x-2.5' : '-translate-x-2.5'
            }`}
          />
        </button>
        <span className="ml-3 text-xs font-medium text-muted-foreground">
          {emp.canModify ? 'Allowed' : 'Read-only'}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-2 flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
          onClick={() => {
            setConfirmationDialogData({
              title: 'Delete Employee?',
              desc: 'This action cannot be undone. This user will lose all access to the restaurant.',
              clickHanlder: handleDeleteEmployee,
            });
            setConfirmationDialog(true);
          }}
          title="Delete Employee"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Confirmation Dialog */}
      {confirmationDialog && (
        <AlertModal
          title={confirmationDialogData.title}
          desc={confirmationDialogData.desc}
          clickHandler={confirmationDialogData.clickHanlder}
          isModalOpen={confirmationDialog}
          setIsModalOpen={setConfirmationDialog}
        />
      )}
    </div>
  );
}

export default EmployeeCard;
