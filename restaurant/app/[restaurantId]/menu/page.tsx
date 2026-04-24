"use client"
import React, { useEffect, useState } from 'react'
import Header from './_component/Header'
import CategorySidebar from './_component/CategorySidebar'
import Products from './_component/Products'
import { useParams, usePathname } from 'next/navigation'
import { CategoryInterface, ProductInterface, useGetMenuQuery } from '@/redux/api/data'
import MenuLoader from './_component/MenuLoader'
import VariantModal from './_component/VariantModal'
import { AnimatePresence } from 'motion/react'

type Props = {}

function Menu({}: Props) {
  const {restaurantId} = useParams();
  const [selectedCategory,setSelectedCategory] = useState<CategoryInterface | undefined>();
  const [clickedProduct,setClickedProduct] = useState<ProductInterface | null>(null)
  const [ isCartOpen , setIsCartOpen ] = useState<boolean>(false);
  
  const {data: restaurantData,isLoading,isError} = useGetMenuQuery(restaurantId);
  //console.log("Restaurant all data",restaurantData);

  useEffect(() => {
    if(restaurantData)
    setSelectedCategory(restaurantData?.data[0]);
  },[restaurantData])

  // if(isLoading){
  //   return <MenuLoader/>
  // }

  return (
    <div className='w-screen h-full bg-richGray bg-white relative'>
       {/* header  */}
       <div className='md:h-36 h-24 px-3 py-2 lg:px-12 lg:py-6 w-full fixed bg-white z-2'>
         <Header isCartOpen = {isCartOpen} setIsCartOpen = {setIsCartOpen} />
       </div>

       {/* main content  */}
       <div className='bg-richGray h-full pt-28 md:pt-36'>

          {/* Category Sidebar  */}
        <div className={`h-[88vh] lg:h-[90vh] fixed left-0 lg:w-72 w-28 ${isCartOpen ? "-z-10" : ""} `}>
            <CategorySidebar data={restaurantData?.data} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}/>
          </div>

          {/* Products  */}
          <div className='ml-28 lg:ml-72 h-full'>
              <Products data={selectedCategory?.products} setClickedProduct={setClickedProduct}/>
          </div>

       </div>
       
          <AnimatePresence initial={false}>
          {
            clickedProduct !== null && <VariantModal clickedProduct={clickedProduct} setClickedProduct={setClickedProduct} />
          }
          </AnimatePresence>
       
    </div>
  )
}

export default Menu