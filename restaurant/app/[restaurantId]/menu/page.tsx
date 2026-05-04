"use client"
import React, { useEffect, useState } from 'react'
import Header from './_component/Header'
import CategorySidebar from './_component/CategorySidebar'
import Products from './_component/Products'
import { useParams } from 'next/navigation'
import { CategoryInterface, ProductInterface, useGetMenuQuery } from '@/redux/api/data'
import VariantModal from './_component/VariantModal'
import { AnimatePresence } from 'motion/react'

function Menu() {
  const { restaurantId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState<CategoryInterface | undefined>();
  const [clickedProduct, setClickedProduct] = useState<ProductInterface | null>(null);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);

  const { data: restaurantData } = useGetMenuQuery(restaurantId as string);

  useEffect(() => {
    if (restaurantData?.data)
      setSelectedCategory(restaurantData.data[0]);
  }, [restaurantData])

  return (
    <div className='w-screen min-h-screen bg-rGray'>
      {/* Fixed header — consistent height on all screens */}
      <div className='h-16 px-4 lg:px-8 w-full fixed top-0 left-0 right-0 bg-white border-b border-gray-100 z-30'>
        <Header isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen} />
      </div>

      {/* Main content pushed below fixed header */}
      <div className='pt-16 h-full flex'>
        {/* Category Sidebar — fixed, starts below header */}
        <div
          className={`fixed top-16 left-0 bottom-0 w-24 lg:w-64 bg-white border-r border-gray-100 ${isCartOpen ? 'z-0' : 'z-20'}`}
        >
          <CategorySidebar
            data={restaurantData?.data}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>

        {/* Products — offset by sidebar width, scrollable */}
        <div className='ml-24 lg:ml-64 flex-1 overflow-y-auto'>
          <Products data={selectedCategory?.products || []} setClickedProduct={setClickedProduct} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {clickedProduct !== null && (
          <VariantModal
            clickedProduct={clickedProduct}
            setClickedProduct={setClickedProduct}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default Menu