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
import { ShoppingBag } from 'lucide-react';

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
          size: 12,
          family: 'Inter',
        },
      },
      grid: {
        display: false,
      },
    },
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value: number | string) => {
          const num = Number(value);
          if (num >= 1000000) return `${num / 1000000} M`;
          if (num >= 1000) return `${num / 1000} k`;
          return `${num}`;
        },
        color: '#6b7280',
        font: {
          size: 12,
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

  const currentLabels = selectedDuration === 'Day' ? dayLabel : monthLabel;
  const currentData = selectedDuration === 'Day' ? dayData : monthData;
  const hasData =
    currentLabels && currentLabels.length > 0 && currentData.some((v) => v > 0);

  const dayChartData = {
    labels: currentLabels,
    datasets: [
      {
        label: 'Orders',
        data: currentData,
        backgroundColor: 'hsla(24.6, 95%, 53.1%, 0.7)',
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="col-span-3 row-span-2 w-full rounded-xl border border-border bg-white shadow-sm xl:col-span-1 xl:row-span-3">
      {/* heading */}
      <div className="flex w-full flex-row items-center justify-between border-b border-border px-5 py-4">
        <div className="text-base font-semibold text-foreground">
          Order Details
        </div>
        <div className="flex overflow-hidden rounded-lg border border-border">
          <div
            className={`cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedDuration === 'Day'
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground hover:bg-gray-50'
            }`}
            onClick={() => setSelectedDuraiton('Day')}
          >
            Day
          </div>
          <div
            className={`cursor-pointer border-l border-border px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedDuration === 'Week'
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground hover:bg-gray-50'
            }`}
            onClick={() => setSelectedDuraiton('Week')}
          >
            Month
          </div>
        </div>
      </div>

      <div className="relative flex h-[200px] w-full items-center justify-center px-2 py-4">
        {hasData ? (
          <Bar data={dayChartData} options={options} />
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <ShoppingBag className="h-8 w-8 opacity-20" />
            <p className="text-sm font-medium">No orders recorded</p>
          </div>
        )}
      </div>
    </div>
  );
}
