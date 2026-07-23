import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';

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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
  }, [isModalOpen, setIsModalOpen]);

  if (!mounted || !isModalOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200">
      <div
        className="w-full max-w-[420px] scale-100 rounded-2xl border border-border bg-background p-6 shadow-2xl transition-transform duration-200"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600">
            <AlertCircle size={24} />
          </div>
          <h2 className="text-xl font-bold text-foreground">{title}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
        </div>

        <div className="mt-6 flex w-full items-center justify-center gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={clickHandler}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default AlertModal;
