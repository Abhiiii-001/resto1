"use client";
import FileUploader from "@/components/common/FileUploader";
import { Category, useGetAllCategoriesQuery } from "@/redux/api/category";
import {
  ProductVariantInterface,
  useCreateProductMutation,
  useUpdateProductMutation,
} from "@/redux/api/products";
import { Check, Edit, Loader, PlusIcon, Trash2, X } from "lucide-react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import VariantForm from "./VariantForm";

interface variantInterface {
  id?: string;
  size: string;
  price: number;
}

const CreateProductDialog = ({ isEdit, product, setModal }: any) => {
  const [variants, setVariants] = useState<variantInterface[]>([]);

  const { data: categories, isLoading, isSuccess } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: createProductLoading }] = useCreateProductMutation();
  const [updateProduct , { isLoading: updateProductLoading}] = useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  if (isEdit) {

    setValue("name", product?.name);
    setValue("description", product?.description);
    // setValue("thumbanil",product?.thumbnail)
    // setVariants(product?.productVariants)

    useEffect(() => {
      if (
        product?.productVariants.length > 0 &&
        Array.isArray(product.productVariants)
      ) {
        setVariants([]);
        (product?.productVariants || []).forEach(
          (v: ProductVariantInterface) => {
            setVariants((prev) => [
              ...prev,
              {
                id: v.id,
                price: v.price,
                size: v.size,
              },
            ]);
          }
        );
      }
      console.log(variants);
    }, [product]);
  }

  const thumbnail = watch("thumbnail");


  const createProductHandler = async (data: any) => {
    if (variants.length == 0) {
      toast.warning("Atleast one variant is required!");
      return;
    }
    console.log(data);
    const toastId = toast.loading("Loading...");
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("thumbnail", data.thumbnail);
    formData.append("description", data.description);
     if(!isEdit){
      try {
        formData.append("categoryId", data.categoryId);
        formData.append("variants", JSON.stringify(variants));
  
        console.log("Create product form data",formData);
  
        const response = await createProduct(formData);
        console.log("Create Product Response", response);
        if (!response.error) toast.success("Product Created!");
        else toast.error("Product creation Failed!");
      } catch (error) {
        toast.error("Product creation Failed!");
        console.log("Error while creation of product", error);
      }
      reset();
      setVariants([]);
    }
    else{
      try {
        formData.append("id",product.id);
        console.log("Update product form data",formData)
        
        const res = await updateProduct({id:product.id,data});
          console.log("Update Product response:",res);
          if (!res.error) toast.success("Product Updated!");
          else toast.error("Product updation Failed!");
        } catch (error) {
          toast.error("Product updation Failed!");
          console.log("Error while updation of product", error);
        }

      }
      toast.dismiss(toastId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-scroll bg-black bg-opacity-50">
      <div className="max-w-[900px] lg:min-w-[600px] bg-white py-8 rounded-xl">
        <form
          className="w-10/12 mx-auto flex flex-col items-start gap-6"
          onSubmit={handleSubmit(createProductHandler)}
        >
          {/* Heading and closing button */}
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Product Details</h2>
            <button className="text-2xl" onClick={() => setModal(false)}>
              <X />
            </button>
          </div>

          {/* Name input and label */}
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
              {errors.name ? "Please fill name*" : ""}
            </div>
          </div>

          {/* Description input and label */}
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
                errors.description
                  ? "border border-red-500"
                  : "border border-gray-300"
              }`}
            />
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {errors.description ? "Please fill desciption*" : ""}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600 "
            >
              Thumbnail <sup className="text-pink-800 pl-1">*</sup>
            </label>
            <FileUploader
              thumbnail={thumbnail}
              setValue={setValue}
              previewUrl={isEdit ? product?.thumbnail : null}
            />
            <div className="text-red-500 text-sm w-full text-end font-semibold mt-1">
              {errors.thumbnail ? "Please fill desciption*" : ""}
            </div>
          </div>

          {/* Category */}
          {!isEdit && (
            <div className="w-full">
              <label
                htmlFor="categoryId"
                className="block text-[1rem] font-semibold text-gray-600 "
              >
                Category <sup className="text-pink-800 pl-1">*</sup>
              </label>
              <select
                {...register("categoryId", {
                  required: "Category is required",
                })}
                className={`input-style w-full text-sm text-gray-600 ${
                  errors.categoryId ? "border-red-500" : "border-gray-300"
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
                {errors.categoryId ? "Please select category*" : ""}
              </div>
            </div>
          )}

          {/* variants part */}
          {
            !isEdit &&  <VariantForm
            variants={variants}
            setVariants={setVariants}
            isEdit={isEdit}
            productId={isEdit ? product.id : ""}
            />
          }

          <button
            type="submit"
            disabled={createProductLoading || updateProductLoading}
            className="w-full bg-blue-300 text-gray-600 text-center py-3 font-semibold hover:bg-blue-200 transition-all duration-200 lg:text-[16px] text-sm"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductDialog;
