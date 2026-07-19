'use client';

import { useForm } from 'react-hook-form';
import Dialog from '@/components/common/Dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AddUpdateUserPayload, User } from '@/types/employee';

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEmployee: (data: AddUpdateUserPayload) => void;
}

const AddEmployeeModal: React.FC<AddEmployeeModalProps> = ({
  isOpen,
  onClose,
  onAddEmployee,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AddUpdateUserPayload>();

  const onSubmit = (data: AddUpdateUserPayload) => {
    onAddEmployee(data);
    reset();
  };

  const ModalContent = (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Add Employee</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Invite a new team member to your restaurant dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col gap-6"
      >
        <div className="w-full space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter employee name"
            {...register('name', { required: 'Name is required' })}
            className={
              errors.name
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            }
          />
          {errors.name && (
            <p className="text-sm text-destructive">
              {errors.name.message as string}
            </p>
          )}
        </div>

        <div className="w-full space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Email <span className="text-destructive">*</span>
          </label>
          <Input
            type="email"
            placeholder="Enter employee email"
            {...register('email', { required: 'Email is required' })}
            className={
              errors.email
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            }
          />
          {errors.email && (
            <p className="text-sm text-destructive">
              {errors.email.message as string}
            </p>
          )}
        </div>

        <div className="w-full space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Number <span className="text-destructive">*</span>
          </label>
          <Input
            type="text"
            placeholder="Enter contact number"
            {...register('number', { required: 'Number is required' })}
            className={
              errors.number
                ? 'border-destructive focus-visible:ring-destructive'
                : ''
            }
          />
          {errors.number && (
            <p className="text-sm text-destructive">
              {errors.number.message as string}
            </p>
          )}
        </div>

        <div className="w-full space-y-2">
          <label className="text-sm font-semibold text-foreground">
            Role <span className="text-destructive">*</span>
          </label>
          <div className="relative">
            <select
              {...register('role', { required: 'Role is required' })}
              className={`flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                errors.role
                  ? 'border-destructive focus-visible:ring-destructive'
                  : 'border-input'
              }`}
            >
              <option value="" disabled selected hidden>
                Select Role
              </option>
              <option value="User">User</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
              <svg
                className="h-4 w-4 opacity-50"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          {errors.role && (
            <p className="text-sm text-destructive">
              {errors.role.message as string}
            </p>
          )}
        </div>

        <div className="mt-4 flex w-full justify-end gap-3">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Add Employee</Button>
        </div>
      </form>
    </div>
  );

  return (
    <Dialog isOpen={isOpen} setIsOpen={onClose} component={ModalContent} />
  );
};

export default AddEmployeeModal;
