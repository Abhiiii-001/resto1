"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Stats from './_component/Stats'
import TrendingProduct from './_component/TrendingProduct'
import SaleSummary from './_component/SaleSummary'
import { getDayAndMonthName } from '@/utils/DateExtracter'
import OrderSummary from './_component/OrderSummary'
import TotalOrderChart from './_component/TotalOrderChart'
import { useAppSelector } from '@/redux/redux'
import { useGetDashboardDataQuery } from '@/redux/api/dashboard'
import Loader from '@/components/common/Loader'

// const saleSummaryByDay = [
//   {
//     id: "1",
//     amount: 10500,
//     duration: "Day",
//     orders: 10,
//     cratedAt: "2025-04-17T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "2",
//     amount: 8700,
//     duration: "Day",
//     orders: 25,
//     cratedAt: "2025-04-16T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "3",
//     amount: 200,
//     duration: "Day",
//     orders: 50,
//     cratedAt: "2025-04-15T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "4",
//     amount: 11000,
//     duration: "Day",
//     orders: 35,
//     cratedAt: "2025-04-14T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "5",
//     amount: 1200,
//     duration: "Day",
//     orders: 120,
//     cratedAt: "2025-04-13T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "6",
//     amount: 10200,
//     duration: "Day",
//     orders: 100,
//     cratedAt: "2025-04-12T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "7",
//     amount: 600,
//     duration: "Day",
//     orders: 88,
//     cratedAt: "2025-04-11T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
// ];

// const saleSummaryByMonth = [
//   {
//     id: "8",
//     amount: 200000,
//     duration: "Month",
//     orders: 2500,
//     cratedAt: "2025-04-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "9",
//     amount: 185000,
//     duration: "Month",
//     orders: 2000,
//     cratedAt: "2025-03-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "10",
//     amount: 192500,
//     duration: "Month",
//     orders: 1200,
//     cratedAt: "2025-02-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "11",
//     amount: 210000,
//     duration: "Month",
//     orders: 2800,
//     cratedAt: "2025-01-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "12",
//     amount: 178000,
//     duration: "Month",
//     orders: 1600,
//     cratedAt: "2024-12-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "13",
//     amount: 165000,
//     duration: "Month",
//     orders: 200,
//     cratedAt: "2024-11-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "14",
//     amount: 175000,
//     duration: "Month",
//     orders: 1700,
//     cratedAt: "2024-10-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "15",
//     amount: 190000,
//     duration: "Month",
//     orders: 2341,
//     cratedAt: "2024-09-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "16",
//     amount: 182000,
//     duration: "Month",
//     orders: 2345,
//     cratedAt: "2024-08-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "17",
//     amount: 170000,
//     duration: "Month",
//     orders: 2100,
//     cratedAt: "2024-07-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "18",
//     amount: 155000,
//     duration: "Month",
//     orders: 2800,
//     cratedAt: "2024-06-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
//   {
//     id: "19",
//     amount: 160000,
//     duration: "Month",
//     orders: 756,
//     cratedAt: "2024-05-01T00:00:00.000Z",
//     restaurantId: "restaurant-123",
//   },
// ];

function Dashboard() {

     const { isAuthenticated , restaurantId } = useAppSelector((state) => state.auth);
        const {data , isLoading} = useGetDashboardDataQuery(restaurantId)

        console.log("Dashboard data",data);

        if(!data || isLoading){
          return <Loader/>
        }


     let dayData: number[] = [];
     let dayOrderData: number[] = [];
      const dayLabel: string[] = data.data?.saleSummary?.day.map((summary:any) => {
          dayData.push(summary.amount);
          dayOrderData.push(summary.orders);
          return getDayAndMonthName(summary.cratedAt).weekday;
      })
      
      let monthData:number[] = [];
      let monthOrderData: number[] = [];
      const monthLabel: string[] = data.data?.saleSummary?.month?.map((summary:any) => {
          monthData.push(summary.amount);
          monthOrderData.push(summary.orders);
          return getDayAndMonthName(summary.cratedAt).month;
      })

     
 

  return (
    <div className='w-full lg:overflow-hidden min-h-screen py-4 bg-[#E7E9E2] px-10'>
      
      <div className="flex flex-col items-start justify-between gap-1 my-2">
        <div className="w-full flex items-center justify-between py-2">
          <h2 className="text-3xl font-semibold text-gray-900">Dashboard</h2>
        
        </div>
        <div className="flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
          <Link href={"/"} className="hover:text-gray-600">
            Home
          </Link>
          {">"}
          <Link href={"/dashboard"} className="hover:text-gray-600">
            Dashboard
          </Link>
        </div>
      </div>
    
     

      <div className="grid grid-cols-1 w-full min-h-full md:grid-cols-2 xl:grid-cols-3 gap-10 mt-8 custom-grid-rows no-scrollbar">
       {/* <div className="row-span-2 bg-gray-500 xl:row-span-2 col-span-3 " /> */}
       <Stats/>
       {/* <div className="bg-gray-500 row-span-4 xl:row-span-7"/> */}
       <TrendingProduct/>
       {/* <div className="row-span-2 bg-gray-500 xl:row-span-4 col-span-2 " /> */}
       <SaleSummary dayData={dayData} dayLabel={dayLabel} monthData={monthData} monthLabel={monthLabel}/>
       {/* <div className="md:row-span-1 col-span-1 bg-gray-500 xl:row-span-3" /> */}
       <OrderSummary dayData={dayOrderData} dayLabel={dayLabel} monthData={monthOrderData.slice(0,6)} monthLabel={monthLabel.slice(0,6)}/>
       {/* <div className="md:row-span-1 bg-gray-500 xl:row-span-3" /> */}
       <TotalOrderChart />
    </div>

    </div>
  )
}

export default Dashboard