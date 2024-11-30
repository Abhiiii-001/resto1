"use client"
import Dialog from '@/components/common/Dialog'
import { CreateProductVariantInterface, ProductInterface } from '@/redux/api/products'
import { CircleAlertIcon, Edit, Trash2, X } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'

type Props = {}

const ProductCard = ({data}:{data: ProductInterface}) => {
  
  const [isCreateVariantModal,setIsCreateVariantModal] = useState<boolean>(false);
    
  return (
    <div className='w-[250px] relative group hover:border mt-10 hover:drop-shadow-lg transition-all duration-200'>
        <div>
          <div className='w-full flex items-center justify-center absolute -top-24 left-[2px]'>
            <Image src={data?.thumbnail} alt='thumbnail' width={500} height={500} />
          </div>
          <div className='absolute hidden group-hover:flex flex-row items-center gap-4 top-4 right-2'>
            <button className='text-blue-400 hover:text-blue-500'>
               <Edit/>
            </button>
            <button className='text-red-500 hover:text-red-700'>
               <Trash2/>
            </button>
          </div>
        </div>
        <div className='w-full  -z-10 bg-white px-6 py-2 flex flex-col items-center justify-between pt-20 gap-1 min-h-96 bg-gradient-to-b from-white to-[#E7E9E2] '>
            <div className='flex flex-col gap-1 items-center justify-center'>
                <p className='text-2xl font-semibold font-serif'>{data?.name}</p>
                <p className='text-sm font-bold text-gray-400 text-center'>{data?.description}</p>
            </div>
            <div className='flex w-full items-center justify-between'>
              <p className='text-lg font-semibold text-blue-400'>Variants</p>
              <div className='text-[12px] font-semibold text-gray-600 underline cursor-pointer hover:text-blue-400' onClick={() => setIsCreateVariantModal(true)} >Add</div>
              {
                isCreateVariantModal && <Dialog
                component={<CreateVariant data={data} setIsOpen={setIsCreateVariantModal}/>}
                isOpen={isCreateVariantModal}
                setIsOpen={setIsCreateVariantModal}
                />
              }
            </div>
            <div className='flex flex-col items-start gap-1 min-h-[80px] pl-4'>
                {
                //@ts-ignore
                    data.productVariants.map((variant,index) => {
                        return (
                            <div key={index} className='w-full flex items-center justify-between text-sm font-semibold text-gray-400'>
                                <div>{variant?.size}</div>
                                <div className='flex items-center gap-1'>
                                    <p>₹</p>
                                    <p className='line-through'>{variant.price}</p>
                                    <p>{variant.salePrice}</p>
                                    <button className={`${variant.isOutOfStock ? "text-red-400" : ""} scale-75`}>
                                        <CircleAlertIcon/>
                                    </button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div className='w-full flex items-center justify-between border-t-2 mt-2 py-2 px-1'>
                <p className='text-lg font-semibold text-gray-500'>Sold</p>
                <p className='text-lg font-semibold text-gray-500'>{data?.sold}</p>
            </div>
        </div>
    </div>
  )
}


const CreateVariant = ({data,setIsOpen}:{data: ProductInterface,setIsOpen: any}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();

      const onSubmitHandler = (formData: any) => {
        console.log("Create variant handler",formData);
        const inputData = {productId: data.id,...formData}
        console.log("Create variant handler",inputData);
      }

      return (
        <div className="w-full">
          <div className="w-full flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-2 text-gray-800">
                Create Product Variant!
            </h2>
            <X className="text-gray-800 cursor-pointer hover:text-gray-900 transition-all duration-200" onClick={() => setIsOpen(false)}/>
          </div>
          <p className="text-sm text-gray-600 font-semibold mb-4">
            Create product variants of all the size you have.
          </p>
          <form className="flex items-start flex-col gap-4 w-full" onSubmit={handleSubmit(onSubmitHandler)}>
    
            <div className="w-full">
              <label
                htmlFor="size"
                className="block text-[1rem] font-semibold text-gray-600 "
              >
                Name <span className="text-pink-800 pl-1">*</span>
              </label>
              <input
                id="size"
                type="text"
                {...register("size", { required: "Name is required" })}
                className={`input-style w-full ${
                  errors.size ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ente name of size"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="price"
                className="block text-[1rem] font-semibold text-gray-600 "
              >
                Price <span className="text-pink-800 pl-1">*</span>
              </label>
              <input
                id="price"
                type="number"
                {...register("price", { required: "Price is required" })}
                className={`input-style w-full ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ente price"
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="salePrice"
                className="block text-[1rem] font-semibold text-gray-600 "
              >
                Sale Price <span className="text-pink-800 pl-1">*</span>
              </label>
              <input
                id="salePrice"
                type="number"
                {...register("salePrice", { required: "Sale price is required" })}
                className={`input-style w-full ${
                  errors.salePrice ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Ente sale price"
              />
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
}

export default ProductCard