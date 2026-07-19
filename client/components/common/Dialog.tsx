import { useRef, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DialogProps {
  component: React.ReactNode;
  isOpen: boolean;
  setIsOpen: any;
}

const Dialog: React.FC<DialogProps> = ({ component, isOpen, setIsOpen }) => {
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
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-opacity duration-200 p-4">
      <div
        className="relative w-full max-w-2xl scale-100 max-h-[90vh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl transition-transform duration-200"
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 z-10 text-muted-foreground hover:bg-gray-100 hover:text-foreground"
          onClick={() => setIsOpen(false)}
        >
          <X className="h-4 w-4" />
        </Button>
        <div className="p-6 md:p-8">{component}</div>
      </div>
    </div>
  );
};

export default Dialog;
