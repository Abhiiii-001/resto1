"use client";
import FileUploader from "@/components/common/FileUploader";
import { Category, useGetAllCategoriesQuery } from "@/redux/api/category";
import { useCreateProductMutation } from "@/redux/api/products";
import { Check, Loader, PlusIcon, Trash2, X } from "lucide-react";
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";


interface variantInterface{
   size: string;
   price: string;
}

const Temp = () => {
  const [variants, setVariants] = useState<variantInterface[]>([]);
  const [ isEdit , setIsEdit ] = useState(false);
  const [variantAddOption, setVariantAddOption] = useState(true);
  const [createVariantData,setCreateVaraintData] = useState({
    size:"",
    price:""
  });

  const { data: categories, isLoading, isSuccess } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: isLoading1 }] = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();
  const thumbnail = watch("thumbnail");
  const createProductHandler = async (data: any) => {
    if(variants.length == 0){
        toast.warning("Atleast one variant is required!");
        return;
    }
    console.log(data);
    const toastId = toast.loading("Loading...");
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("thumbnail", data.thumbnail);
      formData.append("description", data.description);
      formData.append("categoryId", data.categoryId);
      formData.append("variants",JSON.stringify(variants));

      console.log(formData);

      const response = await createProduct(formData);
      console.log("Create Product Response",response);
      if(!response.error)
          toast.success("Product Created!");
      else
        toast.error("Product creation Failed!")
    } catch (error) {
      toast.error("Product creation Failed!");
      console.log("Error while creation of product", error);
    }
    reset();
    toast.dismiss(toastId);
  };

  if (isLoading || isLoading1) {
    return <Loader />;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="max-w-[900px] lg:min-w-[500px] bg-white mt-12 py-8 rounded-xl">
        <form
          className="w-10/12 mx-auto flex flex-col items-start gap-6"
          onSubmit={handleSubmit(createProductHandler)}
        >
        <h2 className="text-2xl font-semibold">Product Details</h2>
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600 "
            >
              Name <sup className="text-pink-800 pl-1">*</sup>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              {...register("name", { required: "Name is required" })}
              className={`input-style w-full ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {
                errors.name ? "Please fill name*" : ""
              }
            </div>
          </div>

          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-[1rem] font-semibold text-gray-600 "
            >
              Description <sup className="text-pink-800 pl-1">*</sup>
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              {...register("description", {
                required: "Description is required",
              })}
              className={`input-style w-full ${
                errors.description ? "border border-red-500" : "border border-gray-300"
              }`}
            />
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {
                errors.description ? "Please fill desciption*" : ""
              }
            </div>
            
          </div>

          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600 "
            >
              Thumbnail <sup className="text-pink-800 pl-1">*</sup>
            </label>
            <FileUploader thumbnail={thumbnail} setValue={setValue} />
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {
                errors.thumbnail ? "Please fill desciption*" : ""
              }
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600 "
            >
              Category <sup className="text-pink-800 pl-1">*</sup>
            </label>
            <select
              {...register("categoryId", { required: "Category is required" })}
              className={`input-style w-full text-sm text-gray-600 ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option
                value={""}
                disabled
                hidden
                selected
                className="text-sm text-gray-400"
              >
                Select Category
              </option>
              {isSuccess &&
                categories &&
                categories.categories?.map((category: Category) => {
                  return (
                    <option key={category.id} value={category?.id}>
                      {category?.name}
                    </option>
                  );
                })}
            </select>
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {
                errors.categoryId ? "Please select category*" : ""
              }
            </div>
          </div>

          {/* variants part */}
          <div className="w-full">
            <div className="w-full flex items-center justify-between">
              <h2 className="text-2xl font-semibold py-2">Variants</h2>
              <div onClick={() => setVariantAddOption(!variantAddOption)} className="scale-110 cursor-pointer px-2 py-1 bg-blue-300 rounded-xl">              
                {
                  variantAddOption ? <X /> : <PlusIcon/>
                }
              </div>
            </div>
            <div>
              {variants.length != 0 &&
                variants?.map((v: any) => {
                  return (
                    <div className=" flex items-center gap-12 py-2">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-600">Size:</p>
                        <div className="py-1 px-2 min-w-20 text-center text-wrap bg-blue-300 rounded-xl">{v?.size}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-600">Price:</p>
                        <div className="py-1 px-2 min-w-20 text-center bg-blue-300 rounded-xl">{v?.price}</div>
                      </div>
                      <button className="text-red-500" onClick={() => setVariants(variants.filter((vari:any) => vari.size !== v.size ))}>
                        <Trash2/>
                      </button>
                    </div>
                  );
                })}
            </div>

            {/* Variant Add form  */}

            {variantAddOption && (
              <div className="w-full space-y-1">
                <div className="w-full flex gap-4 items-center">
                 {/* Size input and label */}
                <div className="w-full">
                  <label
                    htmlFor="size"
                    className="block text-[1rem] font-semibold text-gray-600 "
                  >
                    Size <sup className="text-pink-800 pl-1">*</sup>
                  </label>
                  <input
                    id="size"
                    type="text"
                    placeholder="Ex: S"
                    value={createVariantData.size}
                    onChange={(e) => setCreateVaraintData({
                       size: e.target.value,
                       price: createVariantData.price
                    })}
                    className="input-style w-full"
                  />
                </div>

                {/* Price input and label */}
                <div className="w-full">
                  <label
                    htmlFor="price"
                    className="block text-[1rem] font-semibold text-gray-600 "
                  >
                    Prize <sup className="text-pink-800 pl-1">*</sup>
                  </label>
                  <input
                    id="price"
                    type="text"
                    placeholder="Ex: 123"
                    value={createVariantData.price}
                    onChange={(e:ChangeEvent<HTMLInputElement>) => setCreateVaraintData({
                      size: createVariantData.size,
                      price: e.target.value,
                   })}
                    className="input-style w-full"
                  />
                </div>

                {/* Variant create button */}
                <button onClick={() => {
                  const alreadyPresent = variants.filter((variant:any) => variant.size === createVariantData.size);
                  console.log(alreadyPresent);
                  if(alreadyPresent.length != 0){
                    toast.error("Already Present size")
                  }
                  else{
                    variants.push(createVariantData);
                  }
                  setCreateVaraintData({size: "",price:""});
                  setVariantAddOption(false);
                }} className="flex items-center justify-center h-full pt-4 scale-125 text-blue-500">
                    <Check/>
                </button>
              </div>
              
              </div>
            )}
          </div>

            <button
            type="submit"
            className="w-full bg-blue-300 text-gray-600 text-center py-3 font-semibold hover:bg-blue-200 transition-all duration-200 lg:text-[16px] text-sm"
            >
              Submit
            </button>

        </form>
      </div>
    </div>
  );
};

export default Temp;
