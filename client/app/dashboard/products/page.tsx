'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAppSelector } from '@/redux/redux';
import {
  AddCategoryInterface,
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
  useUpdateCategoryMutation,
} from '@/redux/api/category';
import Loader from '@/components/common/Loader';
import Dialog from '@/components/common/Dialog';
import CreateCategory from './_components/CreateCategory';
import { toast } from 'react-toastify';
import { useGetProductsQuery } from '@/redux/api/products';
import ProductGrid from './_components/ProductGrid';
import { skipToken } from '@reduxjs/toolkit/query';
import CreateProduct from './_components/CreateProductDialog';
import { Button } from '@/components/ui/button';
import { Plus, FolderPlus, ChevronRight } from 'lucide-react';
import { ProductInterface } from '@/types/products';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

function Products() {
  const { user, token, role, canManage, restaurantId } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategroy] = useState<string>('all');
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);
  const [isEditCategory, setIsEditCategory] = useState<boolean>(false);

  //Category Data Query
  const { data: category, isSuccess: isCategoriesFetched, isLoading: isFetchingCategory } = useGetAllCategoriesQuery();

  //Product Data Query
  const {
    data: getProductQueryData,
    isSuccess: isProductFetched,
    isLoading: isFetchingProducts,
  } = useGetProductsQuery(
    user && token ? restaurantId : skipToken
  );
  const [products, setProducts] = useState<ProductInterface[]>(
    getProductQueryData?.products || [],
  );

  //Add category mutation
  const [createCategoryApi, { isLoading: isCreatingCategory }] =
    useAddCategoryMutation();
  const [updateCategoryApi, { isLoading: isUpdatingCategory }] = useUpdateCategoryMutation();

  useEffect(() => {
    if (getProductQueryData?.products) setProducts(getProductQueryData.products);
  }, [isProductFetched, getProductQueryData]);

  useEffect(() => {
    if (selectedCategory == 'all') setProducts(getProductQueryData?.products || []);
    else
      setProducts(
        getProductQueryData?.products?.filter(
          (p: any) => p.categoryId === selectedCategory,
        ) || [],
      );
  }, [selectedCategory, getProductQueryData]);

  const createCategoryHandler = async (data: AddCategoryInterface) => {
    const toastId = toast.loading('Creating category...');
    try {
      const form = new FormData();
      form.append('name', data.name);
      form.append('thumbnail', data.thumbnail);

      const response = await createCategoryApi(form as unknown as AddCategoryInterface).unwrap();
      toast.success('Category created!');
      setIsOpen(false);
    } catch (error) {
      toast.error('Category creation failed!');
    }
    toast.dismiss(toastId);
  };

  const updateCategoryHandler = async (data: AddCategoryInterface) => {
    if (!selectedCategory || selectedCategory === 'all') return;
    const toastId = toast.loading('Updating category...');
    try {
      const form = new FormData();
      form.append('name', data.name);
      if (data.thumbnail instanceof File) {
        form.append('thumbnail', data.thumbnail);
      }

      await updateCategoryApi({ id: selectedCategory, data: form }).unwrap();
      toast.success('Category updated!');
      setIsOpen(false);
      setIsEditCategory(false);
    } catch (error) {
      toast.error('Category update failed!');
    }
    toast.dismiss(toastId);
  };

  if (isFetchingCategory || isFetchingProducts) return <Loader />;

  return (
    <div className="flex h-full w-full flex-col px-4 py-6 md:px-10 bg-gray-50/50 min-h-screen">
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">Products</h2>
          <div className="mt-2 flex items-center text-sm font-medium text-gray-500">
            <Link href="/" className="transition-colors hover:text-gray-900">Home</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/dashboard" className="transition-colors hover:text-gray-900">Dashboard</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-gray-900">Products</span>
          </div>
        </div>
        
       {(role === USER_ROLE_TYPE.RESTAURANT || canManage) && 
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={() => {
            setIsEditCategory(false);
            setIsOpen(true);
          }} variant="outline" className="gap-2 bg-white">
            <FolderPlus className="h-4 w-4" />
            Create Category
          </Button>
          <Button onClick={() => setCreateProductModal(true)} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Product
          </Button>
        </div>}
      </div>

      <Dialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        component={
          <CreateCategory
            setIsOpen={setIsOpen}
            onSubmitHandler={isEditCategory ? updateCategoryHandler : createCategoryHandler}
            isEdit={isEditCategory}
            category={category?.find((c) => c.id === selectedCategory)}
            disableSubmitButton={isUpdatingCategory || isCreatingCategory}
          />
        }
      />

      {/* Category Section */}
      <div className="mb-6">
        <div className="flex w-full items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          <button
            className={`flex-none rounded-full px-5 py-2 text-sm font-semibold transition-all ${
              selectedCategory === 'all'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
            onClick={() => setSelectedCategroy('all')}
          >
            All Products
          </button>
          
          {isCategoriesFetched &&
            category?.map((cat) => (
              <button
                key={cat.id}
                className={`flex-none rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategroy(cat.id)}
              >
                {cat.name}
              </button>
            ))}
        </div>
        {selectedCategory !== 'all' && (
          <div className="mt-3 flex justify-end">
            <button
              onClick={() => {
                setIsEditCategory(true);
                setIsOpen(true);
              }}
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Update category detail
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="flex-1 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {isProductFetched && products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex h-64 flex-col items-center justify-center gap-2">
            <p className="text-lg font-medium text-gray-500">No products found</p>
            <p className="text-sm text-gray-400">Create a product to get started.</p>
          </div>
        )}
      </div>

      {/* Create product dialog */}
      {createProductModal && (
        <CreateProduct
          isEdit={false}
          product={null}
          setModal={setCreateProductModal}
        />
      )}
    </div>
  );
}

export default Products;
