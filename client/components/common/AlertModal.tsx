import React, { useEffect, useRef } from "react";

type Props = {
  title: string;
  desc: string;
  clickHandler: () => void;
  isModalOpen: boolean;
  setIsModalOpen: any;
};

const AlertModal = ({ title, desc, clickHandler,isModalOpen, setIsModalOpen }: Props) => {

    const dialogRef = useRef<HTMLDivElement>(null);
    
      useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (dialogRef.current && !dialogRef.current.contains(event.target as Node)) {
            setIsModalOpen(false);
          }
        };
    
        if (isModalOpen) {
          document.addEventListener("mousedown", handleOutsideClick);
        }
    
        return () => {
          document.removeEventListener("mousedown", handleOutsideClick);
        };
      }, [isModalOpen]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className=" max-w-[350px] w-full py-4 px-6 flex flex-col items-center justify-between gap-10 bg-white rounded-xl"
      ref={dialogRef}
      onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <h2 className="text-2xl font-semibold !text-gray-800">{title}</h2>
          <p className="text-sm py-2">{desc}</p>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <button onClick={() => setIsModalOpen(false)} className="py-2 px-6 rounded-xl text-gray-200 bg-red-400 hover:bg-red-500">No</button>
          <button onClick={clickHandler} className="py-2 px-6 rounded-xl text-gray-200 bg-blue-400 hover:bg-blue-500">Yes</button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
