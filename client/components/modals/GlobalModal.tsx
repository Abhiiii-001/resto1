'use client';

import { useAppSelector, useAppDispatch } from '@/redux/redux';
import { closeModal } from '@/redux/states/modalSlice';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import DowngradeModal from './DowngradeModal';

const MODAL_COMPONENTS: Record<string, React.FC<any>> = {
  DOWNGRADE_CONFIRMATION: DowngradeModal,
  // Add other modals here
};

export default function GlobalModal() {
  const { isOpen, type, data } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') dispatch(closeModal());
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [dispatch]);

  if (!mounted) return null;
  if (!isOpen || !type) return null;

  const Component = MODAL_COMPONENTS[type];
  if (!Component) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6"
      onClick={() => dispatch(closeModal())}
    >
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="relative w-full max-w-lg overflow-hidden"
      >
        <Component data={data} />
      </div>
    </div>,
    document.body
  );
}
