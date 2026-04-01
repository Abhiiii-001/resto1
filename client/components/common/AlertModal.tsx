import React, { useEffect, useRef } from 'react';

type Props = {
  title: string;
  desc: string;
  clickHandler: () => void;
  isModalOpen: boolean | string;
  setIsModalOpen: any;
};

const AlertModal = ({
  title,
  desc,
  clickHandler,
  isModalOpen,
  setIsModalOpen,
}: Props) => {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsModalOpen(false);
      }
    };

    if (isModalOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className="flex w-full max-w-[400px] flex-col items-center justify-between gap-10 rounded-xl bg-white px-6 py-4"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <h2 className="text-2xl font-semibold !text-gray-800">{title}</h2>
          <p className="py-2 text-sm font-semibold text-gray-600 text-opacity-60">
            {desc}
          </p>
        </div>
        <div className="flex w-full items-center justify-end gap-2">
          <button
            onClick={() => setIsModalOpen(null)}
            className="rounded-xl bg-red-400 px-6 py-2 text-gray-200 hover:bg-red-500"
          >
            No
          </button>
          <button
            onClick={clickHandler}
            className="rounded-xl bg-blue-400 px-6 py-2 text-gray-200 hover:bg-blue-500"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
