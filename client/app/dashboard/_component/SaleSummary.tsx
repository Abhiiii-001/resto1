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
import { FileQuestion } from 'lucide-react';

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

  const currentLabels = selectedChart === 'Day' ? dayLabel : monthLabel;
  const currentData = selectedChart === 'Day' ? dayData : monthData;
  const hasData = currentLabels && currentLabels.length > 0 && currentData.some(v => v > 0);

  const chartData: ChartData<'line'> = {
    labels: currentLabels,
    datasets: [
      {
        label: 'Sales',
        data: currentData,
        borderColor: 'hsl(24.6 95% 53.1%)',
        pointBackgroundColor: 'hsl(24.6 95% 53.1%)',
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        backgroundColor: 'hsla(24.6, 95%, 53.1%, 0.15)',
        tension: 0.3,
        fill: true,
      },
    ],
  };

  return (
    <div className="col-span-3 row-span-2 rounded-xl border border-border bg-white shadow-sm xl:col-span-2 xl:row-span-4">
      {/* heading */}
      <div className="flex w-full flex-row items-center justify-between border-b border-border px-5 py-4">
        <div className="text-base font-semibold text-foreground">Sales Details</div>
        <div className="flex overflow-hidden rounded-lg border border-border">
          <div
            className={`cursor-pointer px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedChart === 'Day'
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground hover:bg-gray-50'
            }`}
            onClick={() => setSelectedChart('Day')}
          >
            Day
          </div>
          <div
            className={`cursor-pointer border-l border-border px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedChart === 'Week'
                ? 'bg-primary text-white'
                : 'bg-white text-muted-foreground hover:bg-gray-50'
            }`}
            onClick={() => setSelectedChart('Week')}
          >
            Month
          </div>
        </div>
      </div>

      {/* chart container */}
      <div className="flex h-[250px] w-full items-center justify-center px-4">
        {hasData ? (
          <Line
            data={chartData}
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
                      if (num >= 1000000) return `₹${num / 1000000} M`;
                      if (num >= 1000) return `₹${num / 1000} k`;
                      return `₹${num}`;
                    },
                    color: '#6b7280',
                    font: {
                      size: 12,
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
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <FileQuestion className="h-8 w-8 opacity-20" />
            <p className="text-sm font-medium">No sales data recorded yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SaleSummary;
