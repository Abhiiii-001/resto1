'use client';
import Dialog from '@/components/common/Dialog';
import { useDeleteProductMutation } from '@/redux/api/products';
import { AlertCircle, Edit2, Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import CreateProduct from './CreateProductDialog';
import AlertModal from '@/components/common/AlertModal';
import { toast } from 'react-toastify';
import VariantForm from './VariantForm';
import { Button } from '@/components/ui/button';
import { ProductInterface, ProductVariantInterface } from '@/types/products';
import { useAppSelector } from '@/redux/redux';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';
import Image from 'next/image';

const ProductCard = ({ data }: { data: ProductInterface }) => {
  const { role, canManage } = useAppSelector((state) => state.auth);

  const [isEditModal, setIsEditModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState<boolean>(false);
  const [isVariantModal, setIsVariantModal] = useState<boolean>(false);
  const [variants, setVariants] = useState(data.productVariants);
  const [thumbnail, setThumbnail] = useState(
    'https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp',
  );

  const shouldShowActions = role === USER_ROLE_TYPE.RESTAURANT || canManage;

  useEffect(() => {
    setThumbnail(data?.thumbnail?.trim());
    setVariants(data?.productVariants);
  }, [data, thumbnail]);

  const [delelteProduct] = useDeleteProductMutation();

  const deleteProductHandler = async () => {
    const toastId = toast.loading('Deleting product...');
    try {
      const res = await delelteProduct(data.id);
      if (res.data) {
        toast.success('Product deleted!');
      }
    } catch (error) {
      toast.error('Deletion Failed!');
    }
    toast.dismiss(toastId);
    setIsDeleteModal(false);
  };

  return (
    <div
      className={`grid ${shouldShowActions ? 'grid-cols-12' : 'grid-cols-10'} items-center gap-4 bg-white px-6 py-4 transition-colors hover:bg-gray-50/50`}
    >
      {/* Image */}
      <div className="col-span-1">
        <div className="h-12 w-12 overflow-hidden rounded-lg border border-gray-100 bg-gray-50">
          <Image
            src={
              thumbnail ||
              'https://res.cloudinary.com/dzl6vf3l9/image/upload/v1732903825/my-files/neq9zh5knfbknb9kddi5.webp'
            }
            alt={data?.name}
            height={128}
            width={128}
            className="h-full w-full object-cover"
          />
        </div>
      </div>

      {/* Product Details */}
      <div className="col-span-3 pr-4">
        <p className="font-semibold text-gray-900 truncate">{data?.name}</p>
        <p className="text-sm text-gray-500 line-clamp-1 mt-0.5">
          {data?.description}
        </p>
      </div>

      {/* Category */}
      <div className="col-span-2">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
          {data?.category?.name || 'Uncategorized'}
        </span>
      </div>

      {/* Variants */}
      <div className="col-span-4 flex flex-wrap gap-2">
        {data?.productVariants?.length === 0 ? (
          <span className="text-sm text-gray-400">No variants</span>
        ) : (
          <>
            {data?.productVariants
              ?.slice(0, 3)
              .map((variant: ProductVariantInterface) => (
                <div
                  key={variant.id}
                  className={`flex items-center gap-1.5 rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
                    variant?.isOutOfStock
                      ? 'bg-red-50 text-red-700 ring-red-600/10'
                      : 'bg-gray-50 text-gray-700 ring-gray-500/10'
                  }`}
                >
                  <span className="font-bold">
                    {variant?.size?.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-gray-400">|</span>
                  <span>₹{variant.price}</span>
                </div>
              ))}
            {data.productVariants.length > 3 && (
              <div className="flex items-center justify-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-500 ring-1 ring-inset ring-gray-500/10">
                +{data.productVariants.length - 3}
              </div>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      {shouldShowActions && (
        <div className="col-span-2 flex justify-end gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            onClick={() => setIsEditModal(true)}
            title="Edit Product"
          >
            <Edit2 className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-amber-600 hover:bg-amber-50 hover:text-amber-700"
            onClick={() => setIsVariantModal(true)}
            title="Manage Variants"
          >
            <AlertCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-red-600 hover:bg-red-50 hover:text-red-700"
            onClick={() => setIsDeleteModal(true)}
            title="Delete Product"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Modals */}
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
          desc="Are you sure to delete the product? This action cannot be undone."
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
              standalone={true}
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
