import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { OrderStatusSummary } from '@/types/dashboard';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: OrderStatusSummary;
};

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false, // 🔥 Let chart fill container
  layout: {
    padding: 0,
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
          family: 'Inter',
        },
      },
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.label || '';
          const value = context.parsed || 0;
          return `${label}: ${value}`;
        },
      },
    },
  },
  cutout: '60%', // Optional: how much of the center is cut out
};

function TotalOrderChart({ data }: Props) {
  const chartData = {
    labels: data.label,
    datasets: [
      {
        label: '# of Votes',
        data: data?.data,
        backgroundColor: [
          'rgba(34, 197, 94, 0.6)',
          'rgba(168, 85, 247, 0.6)',
          'rgba(239, 68, 68, 0.6)',
          'rgba(59, 130, 246, 0.6)',
        ],
        borderColor: [
          'rgba(34, 197, 94,1)',
          'rgba(168, 85, 247, 1)',
          'rgba(239, 68, 68,   1)',
          'rgba(59, 130, 246, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-span-2 row-span-2 w-full rounded-xl bg-white xl:col-span-1 xl:row-span-3">
      <div className="flex w-full flex-row items-center justify-between px-4 py-2">
        <div className="text-xl font-semibold">Total Order Status</div>
      </div>

      <div className="h-[180px] w-full px-12 py-2">
        {/* chart */}
        <Doughnut data={chartData} options={options} />
      </div>
    </div>
  );
}

export default TotalOrderChart;
