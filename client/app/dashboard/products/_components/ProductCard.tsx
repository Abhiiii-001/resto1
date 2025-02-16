"use client";
import Dialog from "@/components/common/Dialog";
import {
  CreateProductVariantInterface,
  ProductInterface,
  useDeleteProductMutation,
} from "@/redux/api/products";
import { AlertCircleIcon, Edit, Trash2, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CreateProduct from "./CreateProductDialog";
import AlertModal from "@/components/common/AlertModal";
import { toast } from "react-toastify";
import VariantForm from "./VariantForm";

type Props = {};

const ProductCard = ({ data }: { data: ProductInterface }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isVariantModal , setIsVariantModal] = useState<boolean>(false);
  const [variants , setVariants] = useState(data.productVariants);
  const [thumbnail,setThumbnail] = useState("https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp");

  useEffect(() => {
      setThumbnail(data?.thumbnail?.trim());
      setVariants(data?.productVariants);
  },[data,thumbnail])
  
  
   

  const [delelteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async () => {
    const toastId = toast.loading("Loading...");
    try {
      const res = await delelteProduct(data.id);
      if (res.data) {
        toast.success("Product deleted!");
      }
    } catch (error) {
      console.log("Delete product error", error);
      toast.error("Deletion Failed!");
    }
    toast.dismiss(toastId);
    setIsDeleteModal(false);
  };

  return (
    <div className=" bg-gray-100 w-full grid grid-cols-12 text-opacity-80 gap-8 py-4 px-6 border border-[#B9B9B9] text-gray-600 place-content-center">
      <img
        src={thumbnail || "https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp"}
        alt="image"
        width={90}
        height={80}
        className="col-span-2"
      />
      <div className="col-span-3  flex flex-col items-start gap-[2px]">
        <p className="text-xl font-semibold font-sans text-gray-600">
          {data?.name}
        </p>
        <p className="text-xs font-bold text-opacity-80 text-gray-600">
          {data?.description}
        </p>
      </div>
      <div className="col-span-2 text-[16px] font-semibold pl-1">
        {data?.category?.name}
      </div>
      <div className="col-span-3 flex gap-2">
        {
          data?.productVariants?.length == 0 ? <div className="font-semibold">N\A</div> : data?.productVariants?.slice(0,3).map((variant,index) => {
            return (
              <div key={variant.id} className="flex gap-1">
              <div className={`flex flex-col items-start gap-4 ${variant?.isOutOfStock ? "!text-red=400" : "text-gray-600"}`} >
                  <p className="font-semibold text-lg text-center ml-1 ">{variant?.size?.charAt(0)}</p>
                  <p className="text-sm font-semibold">₹{variant.price}</p>
                </div>
                {index !== data.productVariants?.length - 1 && <div className="h-full w-1 bg-gray-400"></div>}
              </div>
            );
          })
        }
        {
          data.productVariants.length > 4 && <div className="relative bottom-1 pt-12 font-bold">.....</div>
        }
      </div>
      <div className="col-span-2 ">
        <div className="py-1 px-2 w-fit  rounded-xl flex items-center text-sm">
          <div
            onClick={() => setIsEditModal(true)}
            className="border border-gray-400 bg-gray-100 py-1 px-4 rounded-l-xl text-blue-400 hover:text-blue-500 cursor-pointer"
          >
            <Edit />
          </div>
          <div
            onClick={() => setIsVariantModal(true)}
            className={`border border-gray-400 bg-gray-100 py-1 px-4  text-red-400 hover:text-red-500 cursor-pointer`}
          >
            <AlertCircleIcon />
          </div>
          <div
            className="border border-gray-400 bg-gray-100 py-1 px-4 rounded-r-xl text-red-400 hover:text-red-500 cursor-pointer"
            onClick={() => setIsDeleteModal(true)}
          >
            <Trash2 />
          </div>
        </div>
      </div>
      {isEditModal && (
        <CreateProduct
          product={data}
          isEdit={isEditModal}
          setModal={setIsEditModal}
        />
      )}
      {isDeleteModal && (
        <AlertModal
          title="Delete Product"
          desc="Are you sure to delete the product?"
          isModalOpen={isDeleteModal}
          setIsModalOpen={setIsDeleteModal}
          clickHandler={deleteProductHandler}
        />
      )}
      {isVariantModal && (
        <Dialog
        component={
          <VariantForm
          variants={variants}
          setVariants={setVariants}
          isEdit={true}
          productId={data?.id}
          />
        }
        isOpen={isVariantModal}
        setIsOpen={setIsVariantModal}
        />
      )}
    </div>
  );
};

export default ProductCard;
