"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Swiper from "swiper";
import { useAppSelector } from "@/redux/redux";
import ProductsItem from "./_components/ProductsItem";
import { AddCategoryInterface, Category, useAddCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/category";
import Loader from "@/components/common/Loader";
import Image from "next/image";
import Dialog from "@/components/common/Dialog";
import CreateCategory from "./_components/CreateCategory";
import { toast } from "react-toastify";
import { useGetProductsQuery } from "@/redux/api/products";



type Props = {};

// const category = [
//   {
//     id: "drinks",
//     name: "Drinks",
//   },
//   {
//     id: "burger",
//     name: "Burger",
//   },
//   {
//     id: "pizza",
//     name: "Pizza",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
//   {
//     id: "roti",
//     name: "Roti",
//   },
//   {
//     id: "chicken",
//     name: "Chicken",
//   },
// ];



function Products({}: Props) {

  const [ isOpen , setIsOpen ] = useState<boolean>(false);
  const { isSidebarCollapsed } = useAppSelector((state) => state.global);

  const {data , isSuccess ,isLoading} = useGetAllCategoriesQuery();
  const category: Category[] | undefined = data?.categories;

  const [ createCategoryApi ,{ isLoading:isLoading1 } ] = useAddCategoryMutation();

  const {data:products , isSuccess:isSuccess1 ,error, isLoading:isLoading2} = useGetProductsQuery();
  console.log("Products",products);
  // console.log(products.products)
  useEffect(() => {
    if (error) {
      console.log('RTK Query Error:', error);
    }
  }, [error]);

  console.log(data)

  const createCategoryHandler = async(data: AddCategoryInterface) => {
      const toastId = toast.loading("Loading....")
      try {
        
        const form = new FormData();
        form.append("name",data.name);
        form.append("thumbnail",data.thumbnail);

        const response = await createCategoryApi(form).unwrap();
        console.log("Category creation response",response)
        toast.success("Category created!");

      } catch (error) {
         toast.error("Category creation failed!")
         console.log("Error during category creation",error)
      }
      toast.dismiss(toastId);
  }

  if(isLoading || isLoading1) return <Loader/>

  return (
    <div className="w-full h-full py-8 px-10">
      {/* Header section */}
      <div className="flex flex-col items-start justify-between gap-1">
        <div className="w-full flex items-center justify-between py-2">
          <h2 className="text-3xl font-semibold text-gray-900">Products</h2>
          <div className="flex items-center flex-wrap gap-3">
            <button className="bg-blue-400 px-4 py-3 text-gray-100 rounded-xl text-sm font-semibold hover:bg-blue-300 transition-all duration-200">
                + Create Product
            </button>
            <div 
            className="bg-blue-400 px-4 py-3 text-gray-100 rounded-xl text-sm font-semibold hover:bg-blue-300 transition-all duration-200"
            onClick={() => setIsOpen((prev) => !prev)}
            >
               + Create Category
               <Dialog
               isOpen={isOpen}
               setIsOpen={setIsOpen}
               component={<CreateCategory setIsOpen={setIsOpen} onSubmitHandler={createCategoryHandler}/>}
               />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
          <Link href={"/"} className="hover:text-gray-600">
            Home
          </Link>
          {">"}
          <Link href={"/dashboard"} className="hover:text-gray-600">
            Dashboard
          </Link>
          {">"}
          <Link href={"/dashboard/products"} className="hover:text-gray-600">
            Products
          </Link>
        </div>
      </div>

      {/* Category section */}
      <div className="w-full mt-6 mb-12 flex items-center justify-between">
        <div
          className={`${
            isSidebarCollapsed ? "w-full" : "lg:w-[1500px]"
          } flex flex-row items-center gap-6 my-6 no-scrollbar overflow-x-scroll`}
        >
          { isSuccess &&
           category?.map((cat, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center hover:drop-shadow-[0_0_10px_rgba(37,99,235,0.7)] "
              >
                <Image src={cat.thumbnail} alt="category-logo" width={120} height={120} />
                <p className="text-sm lg:text-[16px] font-semibold text-gray-600">{cat.name}</p>
              </div>
            );
          })}
        </div>
       
      </div>

      {/* Products section */}
     {
      isSuccess1 && <div>
                       <ProductsItem products={products.products}/>
                    </div>
     }
    </div>
  );
}

export default Products;
