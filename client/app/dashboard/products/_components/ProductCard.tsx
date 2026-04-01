'use client';
import Dialog from '@/components/common/Dialog';
import {
  CreateProductVariantInterface,
  ProductInterface,
  useDeleteProductMutation,
} from '@/redux/api/products';
import { AlertCircleIcon, Edit, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import CreateProduct from './CreateProductDialog';
import AlertModal from '@/components/common/AlertModal';
import { toast } from 'react-toastify';
import VariantForm from './VariantForm';

type Props = {};

const ProductCard = ({ data }: { data: ProductInterface }) => {
  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isVariantModal, setIsVariantModal] = useState<boolean>(false);
  const [variants, setVariants] = useState(data.productVariants);
  const [thumbnail, setThumbnail] = useState(
    'https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp',
  );

  useEffect(() => {
    setThumbnail(data?.thumbnail?.trim());
    setVariants(data?.productVariants);
  }, [data, thumbnail]);

  const [delelteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async () => {
    const toastId = toast.loading('Loading...');
    try {
      const res = await delelteProduct(data.id);
      if (res.data) {
        toast.success('Product deleted!');
      }
    } catch (error) {
      console.log('Delete product error', error);
      toast.error('Deletion Failed!');
    }
    toast.dismiss(toastId);
    setIsDeleteModal(false);
  };

  return (
    <div className="grid w-full grid-cols-12 place-content-center gap-8 border border-[#B9B9B9] bg-gray-100 px-6 py-4 text-gray-600 text-opacity-80">
      <img
        src={
          thumbnail ||
          'https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp'
        }
        alt="image"
        width={90}
        height={80}
        className="col-span-2"
      />
      <div className="col-span-3 flex flex-col items-start gap-[2px]">
        <p className="font-sans text-xl font-semibold text-gray-600">
          {data?.name}
        </p>
        <p className="text-xs font-bold text-gray-600 text-opacity-80">
          {data?.description}
        </p>
      </div>
      <div className="col-span-2 pl-1 text-[16px] font-semibold">
        {data?.category?.name}
      </div>
      <div className="col-span-3 flex gap-2">
        {data?.productVariants?.length == 0 ? (
          <div className="font-semibold">N\A</div>
        ) : (
          data?.productVariants?.slice(0, 3).map((variant, index) => {
            return (
              <div key={variant.id} className="flex gap-1">
                <div
                  className={`flex flex-col items-start gap-4 ${variant?.isOutOfStock ? '!text-red=400' : 'text-gray-600'}`}
                >
                  <p className="ml-1 text-center text-lg font-semibold">
                    {variant?.size?.charAt(0)}
                  </p>
                  <p className="text-sm font-semibold">₹{variant.price}</p>
                </div>
                {index !== data.productVariants?.length - 1 && (
                  <div className="h-full w-1 bg-gray-400"></div>
                )}
              </div>
            );
          })
        )}
        {data.productVariants.length > 4 && (
          <div className="relative bottom-1 pt-12 font-bold">.....</div>
        )}
      </div>
      <div className="col-span-2">
        <div className="flex w-fit items-center rounded-xl px-2 py-1 text-sm">
          <div
            onClick={() => setIsEditModal(true)}
            className="cursor-pointer rounded-l-xl border border-gray-400 bg-gray-100 px-2 py-1 text-blue-400 hover:text-blue-500 2xl:px-4"
          >
            <Edit />
          </div>
          <div
            onClick={() => setIsVariantModal(true)}
            className={`cursor-pointer border border-gray-400 bg-gray-100 px-2 py-1 text-red-400 hover:text-red-500 2xl:px-4`}
          >
            <AlertCircleIcon />
          </div>
          <div
            className="cursor-pointer rounded-r-xl border border-gray-400 bg-gray-100 px-2 py-1 text-red-400 hover:text-red-500 2xl:px-4"
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
