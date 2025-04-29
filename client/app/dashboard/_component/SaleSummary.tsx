import { getDayAndMonthName } from '@/utils/DateExtracter';
import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Tooltip,
    ChartData,
    Filler,
  } from "chart.js";
  import { Line } from "react-chartjs-2";

  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip,Filler);

type Props = {
  dayData: number[],
  dayLabel: string[],
  monthData: number[],
  monthLabel: string[]
}

const saleSummaryByDay = [
    {
      id: "1",
      amount: 10500,
      duration: "Day",
      order: 10,
      cratedAt: "2025-04-17T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "2",
      amount: 8700,
      duration: "Day",
      order: 25,
      cratedAt: "2025-04-16T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "3",
      amount: 200,
      duration: "Day",
      order: 50,
      cratedAt: "2025-04-15T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "4",
      amount: 11000,
      duration: "Day",
      order: 35,
      cratedAt: "2025-04-14T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "5",
      amount: 1200,
      duration: "Day",
      order: 120,
      cratedAt: "2025-04-13T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "6",
      amount: 10200,
      duration: "Day",
      order: 100,
      cratedAt: "2025-04-12T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "7",
      amount: 600,
      duration: "Day",
      order: 88,
      cratedAt: "2025-04-11T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
  ];

  const saleSummaryByMonth = [
    {
      id: "8",
      amount: 200000,
      duration: "Month",
      orders: 2500,
      cratedAt: "2025-04-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "9",
      amount: 185000,
      duration: "Month",
      orders: 2000,
      cratedAt: "2025-03-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "10",
      amount: 192500,
      duration: "Month",
      orders: 1200,
      cratedAt: "2025-02-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "11",
      amount: 210000,
      duration: "Month",
      orders: 2800,
      cratedAt: "2025-01-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "12",
      amount: 178000,
      duration: "Month",
      orders: 1600,
      cratedAt: "2024-12-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "13",
      amount: 165000,
      duration: "Month",
      orders: 200,
      cratedAt: "2024-11-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "14",
      amount: 175000,
      duration: "Month",
      orders: 1700,
      cratedAt: "2024-10-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "15",
      amount: 190000,
      duration: "Month",
      orders: 2341,
      cratedAt: "2024-09-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "16",
      amount: 182000,
      duration: "Month",
      orders: 2345,
      cratedAt: "2024-08-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "17",
      amount: 170000,
      duration: "Month",
      orders: 2100,
      cratedAt: "2024-07-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "18",
      amount: 155000,
      duration: "Month",
      orders: 2800,
      cratedAt: "2024-06-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
    {
      id: "19",
      amount: 160000,
      duration: "Month",
      orders: 756,
      cratedAt: "2024-05-01T00:00:00.000Z",
      restaurantId: "restaurant-123",
    },
  ];
  

function SaleSummary({dayData,dayLabel,monthData,monthLabel}: Props) {
    const [selectedChart,setSelectedChart] = useState("Day");    

    const dayChartData:ChartData<"line"> = {
        labels: dayLabel,
        datasets: [
            {
                label: "Sales",
                data: dayData,
                borderColor: "#3b82f6",
                pointBackgroundColor: "rgba(53, 162, 235, 0.8)",
                pointStyle:  "circle",
                pointRadius: 8,
                pointHoverRadius: 10,
                backgroundColor: "rgba(53, 162, 235, 0.5) ",
                tension: 0.3,
                fill: true,
            }
        ]
    };

    const monthChartData:ChartData<"line"> = {
        labels: monthLabel,
        datasets: [
            {
                label: "Sales",
                data: monthData,
                borderColor: "#3b82f6",
                pointBackgroundColor: "rgba(53, 162, 235, 0.8)",
                pointStyle:  "circle",
                pointRadius: 8,
                pointHoverRadius: 10,
                backgroundColor: "rgba(53, 162, 235, 0.5) ",
                tension: 0.3,
                fill: true,
            }
        ]
    }
    

  return (
    <div className="row-span-2 col-span-3 bg-white xl:row-span-4 xl:col-span-2 rounded-xl">
        {/* heading */}
        <div className='w-full flex flex-row items-center justify-between px-4 py-3 my-2'>
            <div className='text-xl font-semibold' >Sales Details</div>
            <div className='flex items-center'>
                <div className={`px-6 py-1 border-2 border-gray-400 text-sm  rounded-l-xl cursor-pointer ${selectedChart === "Day" ? "bg-gray-400 text-white font-semibold": ""}`} onClick={() => setSelectedChart("Day")} >Day</div>
                <div className={`px-4 py-1 border-2 border-gray-400  border-l-0 text-sm  rounded-r-xl cursor-pointer ${selectedChart === "Week" ? "bg-gray-400 text-white font-semibold": ""}`} onClick={() => setSelectedChart("Week")}>Month</div>
            </div>
        </div>

        {/* chart */}

        <div className='w-full h-[250px] px-4'>
        <Line
        data={selectedChart === "Day" ? dayChartData : monthChartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
                callbacks: {
                  label: function (context) {
                    return `₹${context.raw.toLocaleString()} `;
                  },
                },
              },
          },
          scales: {
            x: {
              ticks: {
                color: '#6b7280', // Tailwind gray-500
                font: {
                  size: 16,
                  family: 'Inter'
                },
              },
              grid: {
                display: false, // optional
              }
            },
            y: {
              ticks: {
                callback: (value: number | string) => {
                  const num = Number(value);
                  if (num >= 1000000) return `₹${num / 1000000} M`;
                  if (num >= 1000) return `₹${num / 1000} k`;
                  return `₹${num}`;
                },
                color: '#6b7280',
                font: {
                  size: 16,
                  weight:500,
                  family: 'Inter',
                },
              },
              grid: {
                color: '#e5e7eb' // light gray lines
              }
            }
          }
          
        }}
      />
        </div>

    </div>
  )
}

export default SaleSummary