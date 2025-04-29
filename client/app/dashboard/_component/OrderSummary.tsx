import React, { useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip
  );

type Props = {
    dayData: number[],
    dayLabel: string[],
    monthData: number[],
    monthLabel: string[]
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
                if (num >= 1000000) return `${num / 1000000} M`;
                if (num >= 1000) return `${num / 1000} k`;
                return `${num}`;
              },
            color: '#6b7280',
            font: {
              size: 16,
              weight:550,
              family: 'Inter',
            },
          },
          grid: {
            color: '#e5e7eb', // light gray lines
          }
        }
      },
}

export default function OrderSummary({dayData,dayLabel,monthData,monthLabel}: Props) {

  const [selectedDuration,setSelectedDuraiton] = useState("Day");

 const dayChartData = {
    labels: dayLabel,
    datasets: [
      {
        label: 'Orders',
        data: dayData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
 const monthChartData = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Orders',
        data: monthData,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  return (
    <div className="row-span-2 col-span-3 xl:col-span-1 bg-white rounded-xl xl:row-span-3 w-full">
         {/* heading */}
         <div className='w-full flex flex-row items-center justify-between px-4 py-2 '>
            <div className='text-xl font-semibold' >Order Details</div>
            <div className='flex items-center'>
                <div className={`px-6 py-1 border-2 border-gray-400 text-sm  rounded-l-xl cursor-pointer ${selectedDuration === "Day" ? "bg-gray-400 text-white font-semibold": ""}`} onClick={() => setSelectedDuraiton("Day")} >Day</div>
                <div className={`px-4 py-1 border-2 border-gray-400  border-l-0 text-sm  rounded-r-xl cursor-pointer ${selectedDuration === "Week" ? "bg-gray-400 text-white font-semibold": ""}`} onClick={() => setSelectedDuraiton("Week")}>Month</div>
            </div>
        </div>

        <div className='w-full relative px-2 h-[200px]'>
            {/* chart */}
            <Bar data={selectedDuration === "Day" ? dayChartData : monthChartData} options={options}/>
        </div>

    </div>
  )
}