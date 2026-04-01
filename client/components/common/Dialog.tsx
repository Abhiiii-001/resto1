import { useState, useRef, useEffect } from 'react';

interface DialogProps {
  component: React.ReactNode;
  //   onSave: (formData: { input1: string; input2: string }) => void;
  isOpen: boolean;
  setIsOpen: any;
}

const Dialog: React.FC<DialogProps> = ({ component, isOpen, setIsOpen }) => {
  //   const [isOpen, setIsOpen] = useState(false);

  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className="w-96 min-w-[480px] rounded-xl bg-gray-200 p-6 shadow-[rgba(75,85,99,_0.24)_0px_3px_8px] lg:min-w-[600px]"
            ref={dialogRef}
            onClick={(e) => e.stopPropagation()} // Prevent closing on content click
          >
            {component}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dialog;
