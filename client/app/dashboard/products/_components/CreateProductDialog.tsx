'use client';
import FileUploader from '@/components/common/FileUploader';
import { Category, useGetAllCategoriesQuery } from '@/redux/api/category';
import {
  ProductVariantInterface,
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/redux/api/products';
import { Check, Edit, Loader, PlusIcon, Trash2, X } from 'lucide-react';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import VariantForm from './VariantForm';

interface variantInterface {
  id?: string;
  size: string;
  price: number;
}

const CreateProductDialog = ({ isEdit, product, setModal }: any) => {
  const [variants, setVariants] = useState<variantInterface[]>([]);

  const { data: categories, isLoading, isSuccess } = useGetAllCategoriesQuery();
  const [createProduct, { isLoading: createProductLoading }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: updateProductLoading }] =
    useUpdateProductMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm();

  if (isEdit) {
    setValue('name', product?.name);
    setValue('description', product?.description);
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
          },
        );
      }
      console.log(variants);
    }, [product]);
  }

  const thumbnail = watch('thumbnail');

  const createProductHandler = async (data: any) => {
    if (variants.length == 0) {
      toast.warning('Atleast one variant is required!');
      return;
    }
    console.log(data);
    const toastId = toast.loading('Loading...');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('thumbnail', data.thumbnail);
    formData.append('description', data.description);
    if (!isEdit) {
      try {
        formData.append('categoryId', data.categoryId);
        formData.append('variants', JSON.stringify(variants));

        console.log('Create product form data', formData);

        const response = await createProduct(formData);
        console.log('Create Product Response', response);
        if (!response.error) toast.success('Product Created!');
        else toast.error('Product creation Failed!');
      } catch (error) {
        toast.error('Product creation Failed!');
        console.log('Error while creation of product', error);
      }
      reset();
      setVariants([]);
    } else {
      try {
        formData.append('id', product.id);
        console.log('Update product form data', formData);

        const res = await updateProduct({ id: product.id, ...data });
        console.log('Update Product response:', res);
        if (!res.error) toast.success('Product Updated!');
        else toast.error('Product updation Failed!');
      } catch (error) {
        toast.error('Product updation Failed!');
        console.log('Error while updation of product', error);
      }
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-scroll bg-black bg-opacity-50">
      <div className="min-w-[480px] max-w-[900px] rounded-xl bg-white py-8 lg:min-w-[600px]">
        <form
          className="mx-auto flex w-10/12 flex-col items-start gap-6"
          onSubmit={handleSubmit(createProductHandler)}
        >
          {/* Heading and closing button */}
          <div className="flex w-full items-center justify-between">
            <h2 className="text-2xl font-semibold">Product Details</h2>
            <button className="text-2xl" onClick={() => setModal(false)}>
              <X />
            </button>
          </div>

          {/* Name input and label */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600"
            >
              Name <sup className="pl-1 text-pink-800">*</sup>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter product name"
              {...register('name', { required: 'Name is required' })}
              className={`input-style w-full ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <div className="mt-1 w-full text-end text-sm font-semibold text-red-500">
              {errors.name ? 'Please fill name*' : ''}
            </div>
          </div>

          {/* Description input and label */}
          <div className="w-full">
            <label
              htmlFor="description"
              className="block text-[1rem] font-semibold text-gray-600"
            >
              Description <sup className="pl-1 text-pink-800">*</sup>
            </label>
            <input
              id="description"
              type="text"
              placeholder="Enter description"
              {...register('description', {
                required: 'Description is required',
              })}
              className={`input-style w-full ${
                errors.description
                  ? 'border border-red-500'
                  : 'border border-gray-300'
              }`}
            />
            <div className="mt-1 w-full text-end text-sm font-semibold text-red-500">
              {errors.description ? 'Please fill desciption*' : ''}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="w-full">
            <label
              htmlFor="name"
              className="block text-[1rem] font-semibold text-gray-600"
            >
              Thumbnail <sup className="pl-1 text-pink-800">*</sup>
            </label>
            <FileUploader
              thumbnail={thumbnail}
              setValue={setValue}
              previewUrl={isEdit ? product?.thumbnail : null}
            />
            <div className="mt-1 w-full text-end text-sm font-semibold text-red-500">
              {errors.thumbnail ? 'Please fill desciption*' : ''}
            </div>
          </div>

          {/* Category */}
          {!isEdit && (
            <div className="w-full">
              <label
                htmlFor="categoryId"
                className="block text-[1rem] font-semibold text-gray-600"
              >
                Category <sup className="pl-1 text-pink-800">*</sup>
              </label>
              <select
                {...register('categoryId', {
                  required: 'Category is required',
                })}
                className={`input-style w-full text-sm text-gray-600 ${
                  errors.categoryId ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option
                  value={''}
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
              <div className="mt-1 w-full text-end text-sm font-semibold text-red-500">
                {errors.categoryId ? 'Please select category*' : ''}
              </div>
            </div>
          )}

          {/* variants part */}
          {!isEdit && (
            <VariantForm
              variants={variants}
              setVariants={setVariants}
              isEdit={isEdit}
              productId={isEdit ? product.id : ''}
            />
          )}

          <button
            type="submit"
            disabled={createProductLoading || updateProductLoading}
            className="w-full bg-blue-300 py-3 text-center text-sm font-semibold text-gray-600 transition-all duration-200 hover:bg-blue-200 lg:text-[16px]"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProductDialog;
