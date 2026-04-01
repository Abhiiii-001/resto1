'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Swiper from 'swiper';
import { useAppSelector } from '@/redux/redux';
import {
  AddCategoryInterface,
  Category,
  useAddCategoryMutation,
  useGetAllCategoriesQuery,
} from '@/redux/api/category';
import Loader from '@/components/common/Loader';
import Image from 'next/image';
import Dialog from '@/components/common/Dialog';
import CreateCategory from './_components/CreateCategory';
import { toast } from 'react-toastify';
import { ProductInterface, useGetProductsQuery } from '@/redux/api/products';
import ProductGrid from './_components/ProductGrid';
import { useRouter } from 'next/navigation';
import CreateProduct from './_components/CreateProductDialog';

type Props = {};

const category = [
  {
    id: 'drinks',
    name: 'Drinks',
  },
  {
    id: 'burger',
    name: 'Burger',
  },
  {
    id: 'pizza',
    name: 'Pizza',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
  {
    id: 'roti',
    name: 'Roti',
  },
  {
    id: 'chicken',
    name: 'Chicken',
  },
];

function Products() {
  const router = useRouter();

  const { isSidebarCollapsed } = useAppSelector((state) => state.global);
  const { user } = useAppSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategroy] = useState<string>('all');
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);

  //Category Data Query
  const { data, isSuccess, isLoading } = useGetAllCategoriesQuery();
  const category: Category[] | undefined = data?.categories;

  //Product Data Query
  const {
    data: getProductQueryData,
    isSuccess: isSuccess1,
    error,
    isLoading: isLoading2,
  } = useGetProductsQuery(user.role === 'USER' ? user.restaurantId : user.id);
  const [products, setProducts] = useState<ProductInterface[]>(
    getProductQueryData?.products,
  );

  //Add category mutation
  const [createCategoryApi, { isLoading: isLoading1 }] =
    useAddCategoryMutation();

  useEffect(() => {
    setProducts(getProductQueryData?.products);
    console.log('getProductQueryData', getProductQueryData?.products);
  }, [isSuccess1, getProductQueryData]);
  let p: any;
  useEffect(() => {
    console.log('Selected CategoryId', selectedCategory);
    if (selectedCategory == 'all') setProducts(getProductQueryData?.products);
    else
      setProducts(
        getProductQueryData?.products.filter(
          (p) => p.categoryId === selectedCategory,
        ),
      );
    console.log(products);
  }, [selectedCategory]);

  console.log(data);

  const createCategoryHandler = async (data: AddCategoryInterface) => {
    const toastId = toast.loading('Loading....');
    try {
      const form = new FormData();
      form.append('name', data.name);
      form.append('thumbnail', data.thumbnail);

      const response = await createCategoryApi(form).unwrap();
      console.log('Category creation response', response);
      toast.success('Category created!');
    } catch (error) {
      toast.error('Category creation failed!');
      console.log('Error during category creation', error);
    }
    toast.dismiss(toastId);
  };

  if (isLoading || isLoading1 || isLoading2) return <Loader />;

  return (
    <div className="mr-6 h-full w-full px-10 py-8">
      {/* Header section */}
      <div className="flex flex-col items-start justify-between gap-1">
        <div className="flex w-full items-center justify-between py-2">
          <h2 className="text-3xl font-semibold text-gray-900">Products</h2>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCreateProductModal(true)}
              className="rounded-xl bg-blue-400 px-4 py-3 text-sm font-semibold text-gray-100 transition-all duration-200 hover:bg-blue-300"
            >
              + Create Product
            </button>
            <div
              className="rounded-xl bg-blue-400 px-4 py-3 text-sm font-semibold text-gray-100 transition-all duration-200 hover:bg-blue-300"
              onClick={() => setIsOpen((prev) => !prev)}
            >
              + Create Category
              <Dialog
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                component={
                  <CreateCategory
                    setIsOpen={setIsOpen}
                    onSubmitHandler={createCategoryHandler}
                  />
                }
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
          <Link href={'/'} className="hover:text-gray-600">
            Home
          </Link>
          {'>'}
          <Link href={'/dashboard'} className="hover:text-gray-600">
            Dashboard
          </Link>
          {'>'}
          <Link href={'/dashboard/products'} className="hover:text-gray-600">
            Products
          </Link>
        </div>
      </div>

      {/* Category Section */}
      <div className="mt-2 flex w-full items-center justify-between">
        <div
          className={`${
            isSidebarCollapsed ? 'w-full' : 'lg:w-[1500px]'
          } no-scrollbar my-6 flex flex-row items-center gap-6 overflow-x-scroll`}
        >
          <div
            className={`flex cursor-pointer flex-col items-center justify-center border px-5 py-3 hover:scale-95 hover:shadow-xl ${selectedCategory == 'all' ? 'border-2 border-gray-800' : 'border-gray-400'} rounded-xl border-opacity-50 bg-gray-100`}
            onClick={() => setSelectedCategroy('all')}
          >
            <p className="text-sm font-semibold text-gray-600 lg:text-[16px]">
              All
            </p>
          </div>
          {isSuccess &&
            category?.map((cat, index) => {
              return (
                <div
                  key={index}
                  className={`flex cursor-pointer flex-col items-center justify-center text-nowrap border px-5 py-3 hover:scale-95 hover:shadow-xl ${selectedCategory == cat.id ? 'border-2 border-gray-800' : 'border-gray-400'} rounded-xl border-opacity-50 bg-gray-100`}
                  onClick={() => setSelectedCategroy(cat.id)}
                >
                  <p className="text-sm font-semibold text-gray-600 lg:text-[16px]">
                    {cat.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>

      {/* Products */}
      <div className="h-full w-full overflow-auto">
        {isSuccess1 && products && products.length > 0 ? (
          <ProductGrid products={products} />
        ) : (
          <div className="flex h-[60vh] w-full items-center justify-center text-2xl">
            No Product Found
          </div>
        )}
      </div>

      {selectedCategory !== 'all' && (
        <div className="mt-2 cursor-pointer text-sm text-blue-500 underline">
          Manage category
        </div>
      )}

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
