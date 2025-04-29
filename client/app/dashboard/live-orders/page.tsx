"use client"
import React, { useEffect, useState } from 'react'
import OrderCard from './_componenets/OrderCard'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { useAppSelector } from '@/redux/redux'
import { useGetAllOrdersQuery, useUpdateOrderStatusMutation } from '@/redux/api/order'

type Props = {}

const dummyData = [
  {
    id: 'ajlkal',
    orderCode: "234561",
    name: null,
    status: "Pending",
    amount: 345,
    isPack: false,
    isVerified: true,
    invoice:" jsjfla",
    paymentOption: "Cash",
    createdAt: "",
    restaurantId: "fjdalk",
    orders:[
      {
        id: "jkdsfk",
        name: "Paneer Burger",
        variant: "small",
        quantity: 2,
        unitPrice: 50,       
      },
      {
        id: "jkdsfkbhb",
        name: "Paneer Burger",
        variant: "small",
        quantity: 2,
        unitPrice: 50,       
      }
    ]
  }
]

function LiveOrders({}: Props) {

  const {orders} = useAppSelector((state) => state.order)
  const {restaurantId} = useAppSelector((state) => state.auth)
  
  const [query , setQuery] = useState("");
  const [filteredOrders , setFilteredOrders] = useState(orders);

  useGetAllOrdersQuery(restaurantId);
  

  useEffect(() => {
     setFilteredOrders(orders);
  },[orders])

  useEffect(() => {
     const data = orders.filter((ord) => !query || query == "" || ord.orderCode.toLowerCase().includes(query));
     setFilteredOrders(data);
  },[query])

  return (
    <div className='my-8 mx-4'>

      
      {/* Heading */}
      <div className="flex flex-col justify-between items-start mb-4">
        <div className="flex flex-row justify-between items-center mb-4 w-full pr-4">
          <div className="text-3xl text-black font-semibold flex items-center gap-2">Live Orders</div>
          <div className="">
            {/* Search Form */}
            <SearchForm query={query} setQuery={setQuery} />
          </div>
        </div>

        <div className="pb-4 flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
          <Link href={"/"} className="hover:text-gray-600">
            Home
          </Link>
          {">"}
          <Link href={"/dashboard"} className="hover:text-gray-600">
            Dashboard
          </Link>
          {">"}
          <Link href={"/dashboard/live-orders"} className="hover:text-gray-600">
            Live Order
          </Link>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-8'>
        {
          filteredOrders.length > 0 ? filteredOrders.map((data,index) => (
            <OrderCard data = {data} key={index} />
          )) : 
          <div className='w-[80vw] h-[50vh] flex items-center justify-center text-2xl font-medium text-black'>
             No order available
          </div>
        }
      </div>
    </div>
  )
}

const SearchForm = ({ query, setQuery }) => {
  return (
    <form className="w-full mx-auto pb-2">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
          <Search width={16} height={16} />
        </div>
        <input
          type="search"
          id="search"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
          className="block px-12 py-2 font-clash text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-gray-500 focus:border-gray-500 "
          placeholder="Search orders..."
          required
        />
      </div>
    </form>
  );
};

export default LiveOrders