import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useAppSelector } from "@/redux/redux";
import { useGetDashboardDataQuery } from "@/redux/api/dashboard";
import { Loader } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {};

const TotalOrderDetails =  {
    label: ["Ready","Pending","Cancelled","Completed"],
    data:  [5,12,120,500]
}


  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false, // 🔥 Let chart fill container
    layout: {
      padding: 0 
    },
    plugins: {
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#374151', // Tailwind gray-700
          font: {
            size: 14,
            weight: 500,
            family: 'Inter'
          }
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          }
        }
      }
    },
    cutout: '60%' // Optional: how much of the center is cut out
  };

function TotalOrderChart({}: Props) {

    const { isAuthenticated , restaurantId } = useAppSelector((state) => state.auth);
    const {data: DashboardDataResponse , isLoading} = useGetDashboardDataQuery(restaurantId)

    if(isLoading) return <Loader/>

    const data = {
      labels: DashboardDataResponse.data.status.label,
      datasets: [
        {
          label: '# of Votes',
          data: DashboardDataResponse.data.status.data,
          backgroundColor: [
            'rgba(34, 197, 94, 0.6)',
            'rgba(168, 85, 247, 0.6)',
            'rgba(239, 68, 68, 0.6)',
            'rgba(59, 130, 246, 0.6)',
          ],
          borderColor: [
            'rgba(34, 197, 94,1)',
            'rgba(168, 85, 247, 1)',
            'rgba(239, 68, 68, 1)',
            'rgba(59, 130, 246, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
  

  return (
    <div className="row-span-2 col-span-2 xl:col-span-1 bg-white rounded-xl xl:row-span-3 w-full">
      <div className="w-full flex flex-row items-center justify-between px-4 py-2 ">
        <div className="text-xl font-semibold">Total Order Status</div>
      </div>

    <div className="w-full h-[180px] px-12 py-2">
        {/* chart */}
        <Doughnut data={data} options={options}/>
    </div>

    </div>
  );
}

export default TotalOrderChart;
