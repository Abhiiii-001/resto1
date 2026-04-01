import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Filler,
);

type Props = {
  dayData: number[];
  dayLabel: string[];
  monthData: number[];
  monthLabel: string[];
};

function SaleSummary({ dayData, dayLabel, monthData, monthLabel }: Props) {
  const [selectedChart, setSelectedChart] = useState('Day');

  const dayChartData: ChartData<'line'> = {
    labels: dayLabel,
    datasets: [
      {
        label: 'Sales',
        data: dayData,
        borderColor: '#3b82f6',
        pointBackgroundColor: 'rgba(53, 162, 235, 0.8)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(53, 162, 235, 0.5) ',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  const monthChartData: ChartData<'line'> = {
    labels: monthLabel,
    datasets: [
      {
        label: 'Sales',
        data: monthData,
        borderColor: '#3b82f6',
        pointBackgroundColor: 'rgba(53, 162, 235, 0.8)',
        pointStyle: 'circle',
        pointRadius: 8,
        pointHoverRadius: 10,
        backgroundColor: 'rgba(53, 162, 235, 0.5) ',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="col-span-3 row-span-2 rounded-xl bg-white xl:col-span-2 xl:row-span-4">
      {/* heading */}
      <div className="my-2 flex w-full flex-row items-center justify-between px-4 py-3">
        <div className="text-xl font-semibold">Sales Details</div>
        <div className="flex items-center">
          <div
            className={`cursor-pointer rounded-l-xl border-2 border-gray-400 px-6 py-1 text-sm ${selectedChart === 'Day' ? 'bg-gray-400 font-semibold text-white' : ''}`}
            onClick={() => setSelectedChart('Day')}
          >
            Day
          </div>
          <div
            className={`cursor-pointer rounded-r-xl border-2 border-l-0 border-gray-400 px-4 py-1 text-sm ${selectedChart === 'Week' ? 'bg-gray-400 font-semibold text-white' : ''}`}
            onClick={() => setSelectedChart('Week')}
          >
            Month
          </div>
        </div>
      </div>

      {/* chart */}

      <div className="h-[250px] w-full px-4">
        <Line
          data={selectedChart === 'Day' ? dayChartData : monthChartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `₹${(context.raw as number).toLocaleString()} `;
                  },
                },
              },
            },
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
                    if (num >= 1000000) return `₹${num / 1000000} M`;
                    if (num >= 1000) return `₹${num / 1000} k`;
                    return `₹${num}`;
                  },
                  color: '#6b7280',
                  font: {
                    size: 16,
                    weight: 500,
                    family: 'Inter',
                  },
                },
                grid: {
                  color: '#e5e7eb',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default SaleSummary;
