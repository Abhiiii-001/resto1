'use client';
import FileUploader from '@/components/common/FileUploader';
import { Category, useGetAllCategoriesQuery } from '@/redux/api/category';
import {
  useCreateProductMutation,
  useUpdateProductMutation,
} from '@/redux/api/products';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import VariantForm from './VariantForm';
import Dialog from '@/components/common/Dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CreateProductInterface, ProductVariantInterface } from '@/types/products';

interface variantInterface {
  id?: string;
  size: string;
  price: number;
}

interface CreateProductDialogProps {
  isEdit: boolean;
  product: any;
  setModal: (isOpen: boolean) => void;
}

interface CreateProductFormData {
    name: string;
    description: string;
    thumbnail: File;
    categoryId: string;
  }

const CreateProductDialog = ({ isEdit, product, setModal }: CreateProductDialogProps) => {
  const [variants, setVariants] = useState<ProductVariantInterface[]>([]);

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
  } = useForm<CreateProductFormData>();

  if (isEdit) {
    setValue('name', product?.name);
    setValue('description', product?.description);

    useEffect(() => {
      if (
        product?.productVariants?.length > 0 &&
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
    }, [product]);
  }

  const thumbnail = watch('thumbnail');

  const createProductHandler = async (data: CreateProductFormData) => {
    if (variants.length === 0) {
      toast.warning('At least one variant is required!');
      return;
    }
    const toastId = toast.loading('Loading...');
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('thumbnail', data.thumbnail);
    formData.append('description', data.description);
    if (!isEdit) {
      try {
        formData.append('categoryId', data.categoryId);
        formData.append('variants', JSON.stringify(variants));

        const response = await createProduct(formData as unknown as CreateProductInterface);
        if (!response.error) {
          toast.success('Product Created!');
          setModal(false);
        } else {
          toast.error('Product creation Failed!');
        }
      } catch (error) {
        toast.error('Product creation Failed!');
      }
      reset();
      setVariants([]);
    } else {
      try {
        formData.append('id', product.id);
        const res = await updateProduct({ id: product.id, ...data });
        if (!res.error) {
          toast.success('Product Updated!');
          setModal(false);
        } else {
          toast.error('Product updation Failed!');
        }
      } catch (error) {
        toast.error('Product updation Failed!');
      }
    }
    toast.dismiss(toastId);
  };

  const ModalContent = (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">
          {isEdit ? 'Edit Product' : 'Create Product'}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {isEdit ? 'Update your product details below.' : 'Fill in the details to add a new product.'}
        </p>
      </div>

      <form
        className="flex w-full flex-col items-start gap-6"
        onSubmit={handleSubmit(createProductHandler)}
      >
        <div className="w-full space-y-2">
          <label
            htmlFor="name"
            className="text-sm font-semibold text-foreground"
          >
            Name <span className="text-destructive">*</span>
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Enter product name"
            {...register('name', { required: 'Name is required' })}
            className={errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {errors.name && <p className="text-sm text-destructive">{errors.name.message as string}</p>}
        </div>

        <div className="w-full space-y-2">
          <label
            htmlFor="description"
            className="text-sm font-semibold text-foreground"
          >
            Description <span className="text-destructive">*</span>
          </label>
          <Input
            id="description"
            type="text"
            placeholder="Enter description"
            {...register('description', {
              required: 'Description is required',
            })}
            className={errors.description ? 'border-destructive focus-visible:ring-destructive' : ''}
          />
          {errors.description && <p className="text-sm text-destructive">{errors.description.message as string}</p>}
        </div>

        <div className="w-full space-y-2">
          <label
            htmlFor="thumbnail"
            className="text-sm font-semibold text-foreground"
          >
            Thumbnail <span className="text-destructive">*</span>
          </label>
          <FileUploader
            thumbnail={thumbnail}
            setValue={setValue}
            previewUrl={isEdit ? product?.thumbnail : null}
          />
          {errors.thumbnail && <p className="text-sm text-destructive">{errors.thumbnail.message as string}</p>}
        </div>

        {!isEdit && (
          <div className="w-full space-y-2">
            <label
              htmlFor="categoryId"
              className="text-sm font-semibold text-foreground"
            >
              Category <span className="text-destructive">*</span>
            </label>
            <div className="relative">
              <select
                {...register('categoryId', {
                  required: 'Category is required',
                })}
                className={`flex h-10 w-full appearance-none rounded-md border bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                  errors.categoryId ? 'border-destructive focus-visible:ring-destructive' : 'border-input'
                }`}
              >
                <option value="" disabled hidden>
                  Select Category
                </option>
                {isSuccess &&
                  categories &&
                  categories.map((category: Category) => (
                    <option key={category.id} value={category?.id}>
                      {category?.name}
                    </option>
                  ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-muted-foreground">
                <svg className="h-4 w-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>
            </div>
            {errors.categoryId && <p className="text-sm text-destructive">{errors.categoryId.message as string}</p>}
          </div>
        )}

        {!isEdit && (
          <div className="w-full">
            <VariantForm
              variants={variants}
              setVariants={setVariants}
              isEdit={isEdit}
              productId={isEdit ? product.id : ''}
            />
          </div>
        )}

        <div className="mt-4 flex w-full justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setModal(false)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={createProductLoading || updateProductLoading}
          >
            {isEdit ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </div>
  );

  return (
    <Dialog isOpen={true} setIsOpen={setModal} component={ModalContent} />
  );
};

export default CreateProductDialog;
