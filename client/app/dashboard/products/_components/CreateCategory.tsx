import FileUploader from '@/components/common/FileUploader';
import { AddCategoryInterface } from '@/redux/api/category';
import { X } from 'lucide-react';
import React from 'react';
import { useForm } from 'react-hook-form';

interface Props {
  setIsOpen: any;
  onSubmitHandler: (data: AddCategoryInterface) => Promise<void>;
}

const CreateCategory = ({ setIsOpen, onSubmitHandler }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddCategoryInterface>();
  const thumbnail = watch('thumbnail');
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h2 className="mb-2 text-2xl font-bold text-gray-800">
          Create Category!
        </h2>
        <X
          className="cursor-pointer text-gray-800 transition-all duration-200 hover:text-gray-900"
          onClick={() => setIsOpen(false)}
        />
      </div>
      <p className="mb-4 text-sm font-semibold text-gray-600">
        Create category for make your product categorize
      </p>
      <form
        className="flex w-full flex-col items-start gap-4"
        onSubmit={handleSubmit(onSubmitHandler)}
      >
        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-[1rem] font-semibold text-gray-600"
          >
            Name <span className="pl-1 text-pink-800">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register('name', { required: 'Name is required' })}
            className={`input-style w-full ${
              errors.name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ente name of category"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="thumnail"
            className="block font-semibold text-[lg] text-gray-600"
          >
            Thumbnail <span className="pl-1 text-pink-800">*</span>
          </label>
          <FileUploader thumbnail={thumbnail} setValue={setValue} />
          <p className="">
            Please upload transparent background image for better user
            experience
          </p>
        </div>

        <div className="mt-4 flex w-full items-center justify-end gap-3">
          <button
            className="rounded border bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
