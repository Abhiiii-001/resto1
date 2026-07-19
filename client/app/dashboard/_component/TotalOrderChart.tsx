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
import { PieChart } from 'lucide-react';

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  data: OrderStatusSummary;
};

const options: ChartOptions<'doughnut'> = {
  responsive: true,
  maintainAspectRatio: false,
  layout: {
    padding: 0,
  },
  plugins: {
    legend: {
      display: true,
      position: 'bottom', // Changed from right to avoid UI breaking on small cards
      labels: {
        usePointStyle: true,
        padding: 15,
        color: '#6b7280',
        font: {
          size: 11,
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
  cutout: '70%',
};

function TotalOrderChart({ data }: Props) {
  const hasData =
    data?.data && data.data.length > 0 && data.data.some((v) => v > 0);

  const chartData = {
    labels: data.label,
    datasets: [
      {
        label: 'Orders',
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
    <div className="col-span-2 row-span-2 w-full rounded-xl border border-border bg-white shadow-sm xl:col-span-1 xl:row-span-3">
      <div className="flex w-full flex-row items-center justify-between border-b border-border px-5 py-4">
        <div className="text-base font-semibold text-foreground">
          Total Order Status
        </div>
      </div>

      <div className="flex h-[200px] w-full items-center justify-center px-4 py-4">
        {hasData ? (
          <Doughnut data={chartData} options={options} />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <PieChart className="h-8 w-8 opacity-20" />
            <p className="text-sm font-medium">No order status data</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TotalOrderChart;
