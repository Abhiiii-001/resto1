import FileUploader from "@/components/common/FileUploader";
import { AddCategoryInterface } from "@/redux/api/category";
import { X } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

interface Props{
    setIsOpen: any;
    onSubmitHandler: (data: AddCategoryInterface) => Promise<void>;
}

const CreateCategory = ({setIsOpen , onSubmitHandler}:Props ) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<AddCategoryInterface>();
  const thumbnail = watch("thumbnail");
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Create Category!
        </h2>
        <X className="text-gray-800 cursor-pointer hover:text-gray-900 transition-all duration-200" onClick={() => setIsOpen(false)}/>
      </div>
      <p className="text-sm text-gray-600 font-semibold mb-4">
        Create category for make your product categorize
      </p>
      <form className="flex items-start flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmitHandler)}>

        <div className="w-full">
          <label
            htmlFor="name"
            className="block text-[1rem] font-semibold text-gray-600 "
          >
            Name <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="name"
            type="text"
            {...register("name", { required: "Name is required" })}
            className={`input-style w-full ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Ente name of category"
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="thumnail"
            className="block text-[lg] font-semibold text-gray-600 "
          >
            Thumbnail <span className="text-pink-800 pl-1">*</span>
          </label>
          <FileUploader thumbnail={thumbnail} setValue={setValue} />
          <p className="">Please upload transparent background image for better user experience</p>
        </div>

        <div className="flex w-full items-center justify-end gap-3 mt-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 border"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </button>
              <button
               type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
