import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip);

type Props = {
  dayData: number[];
  dayLabel: string[];
  monthData: number[];
  monthLabel: string[];
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    x: {
      ticks: {
        color: '#6b7280',
        font: {
          size: 16,
          family: 'Inter',
        },
      },
      grid: {
        display: false,
      },
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
          weight: 550,
          family: 'Inter',
        },
      },
      grid: {
        color: '#e5e7eb',
      },
    },
  },
};

export default function OrderSummary({
  dayData,
  dayLabel,
  monthData,
  monthLabel,
}: Props) {
  const [selectedDuration, setSelectedDuraiton] = useState('Day');

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
    <div className="col-span-3 row-span-2 w-full rounded-xl bg-white xl:col-span-1 xl:row-span-3">
      {/* heading */}
      <div className="flex w-full flex-row items-center justify-between px-4 py-2">
        <div className="text-xl font-semibold">Order Details</div>
        <div className="flex items-center">
          <div
            className={`cursor-pointer rounded-l-xl border-2 border-gray-400 px-6 py-1 text-sm ${selectedDuration === 'Day' ? 'bg-gray-400 font-semibold text-white' : ''}`}
            onClick={() => setSelectedDuraiton('Day')}
          >
            Day
          </div>
          <div
            className={`cursor-pointer rounded-r-xl border-2 border-l-0 border-gray-400 px-4 py-1 text-sm ${selectedDuration === 'Week' ? 'bg-gray-400 font-semibold text-white' : ''}`}
            onClick={() => setSelectedDuraiton('Week')}
          >
            Month
          </div>
        </div>
      </div>

      <div className="relative h-[200px] w-full px-2">
        {/* chart */}
        <Bar
          data={selectedDuration === 'Day' ? dayChartData : monthChartData}
          options={options}
        />
      </div>
    </div>
  );
}
