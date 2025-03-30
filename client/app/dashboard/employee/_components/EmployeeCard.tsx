"use client"
import AlertModal from '@/components/common/AlertModal'
import { useDeleteEmployeeMutation, useUpdateEmployeeMutation } from '@/redux/api/employee'
import { CheckCircleIcon, OctagonAlert, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

type Props = {
    emp: any
}

function EmployeeCard({emp}: Props) {

      const [confirmationDialogData,setConfirmationDialogData] = useState<any>();
      const [confirmationDialog,setConfirmationDialog] = useState(false);

        const [updateEmployee , {isLoading:updateEmployeeLoader}] = useUpdateEmployeeMutation(); 
        const [deleteEmployee , {isLoading: deleteEmployeeLoader}] = useDeleteEmployeeMutation(); 

      const toggleVerified = async () => {
        const toastId = toast.loading("Loading..");
        try {
            
            console.log("Is verified handler",emp);
            const res = await updateEmployee({ id:emp.id, data: { isVerified: !emp.isVerified } }).unwrap();
            if(!res?.success){
                throw new Error(res.message);
            }
            else{
                toast.success("User verified!")
            }
        } catch (error) {
          console.error("Error updating verification status:", error);
          toast.error(error.message);
        }
        toast.dismiss(toastId);
        setConfirmationDialog(false);
        setConfirmationDialogData(null);
      };
    
      const toggleCanModify = async () => {
        const toastId = toast.loading("Loading..");
        try {
         const res =  await updateEmployee({ id:emp.id, data: { canModify: !emp.canModify } }).unwrap();
         if(!res?.success){
            throw new Error(res.message);
        }
        else{
            toast.success("Change updated!")
        }
        console.log("Can Modify ",emp);
        } catch (error) {
          console.error("Error updating canModify status:", error);
          toast.error(error.message);
        }
        toast.dismiss(toastId);
      };
    
    
    
      //  Delete employee
      const handleDeleteEmployee = async () => {
        const toastId = toast.loading("Deleting...");
        try {
            const res = await deleteEmployee(emp.id).unwrap();
            if(!res?.success){
                throw new Error(res.message);
            }
            else{
                toast.success("User deleted!")
            }
        } catch (error) {
            console.error("Error deleting user:", error);
          toast.error(error.message);
        }
        toast.dismiss(toastId);
      };

  return (
    <div
              key={emp.id}
              className="grid w-full grid-cols-11 items-center bg-white shadow-md p-4 rounded-xl gap-4 border h-[140px]"
            >
              <div className="flex justify-center col-span-1">
                <img
                  src={emp.image ? emp.image :  `https://ui-avatars.com/api/?name=${encodeURIComponent(emp.name)}&background=random`}
                  alt={emp.name}
                  className="w-16 h-16 rounded-full"
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
                    onClick={() => {
                        setConfirmationDialogData({
                            title: "Are you sure to verify the user?",
                            desc: "Only verify if you know the user because he can interace with your restaurant",
                            clickHanlder: toggleVerified,
                        })
                        setConfirmationDialog(true);
                    }}
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
                  className={`relative inline-flex items-center justify-center w-16 h-8 rounded-full transition-all duration-300 
                    ${emp.canModify ? "bg-blue-300" : "bg-gray-300"}
                    }`}
                    disabled={updateEmployeeLoader}
                  onClick={toggleCanModify}
                >
                  <span
                    className={`absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 transform ${emp.canModify ? "translate-x-8" : "translate-x-0"
                      }`}
                  ></span>
                </button>
              </div>
  
              {/* Delete Button */}
              <div className="col-span-1">
                <button
                  className="border text-red-400 px-3 py-2 rounded-[12px] flex items-center gap-1 hover:text-red-500 transition-all duration-200 hover:scale-105 active:scale-95"
                  onClick={() => {
                    setConfirmationDialogData({
                        title: "Are you sure to delete?",
                        desc: "This action can't be revert so think again.",
                        clickHanlder: handleDeleteEmployee,
                    })
                    setConfirmationDialog(true);
                  }                 
                  }
                >
                  <Trash2 size={18} />
                </button>
              </div>
              {
                confirmationDialog && 
                <AlertModal
                 title={confirmationDialogData.title}
                 desc={confirmationDialogData.desc}
                 clickHandler={confirmationDialogData.clickHanlder}
                 isModalOpen={confirmationDialog}
                 setIsModalOpen={setConfirmationDialog}
                />
              }
            </div>
  )
}

export default EmployeeCard