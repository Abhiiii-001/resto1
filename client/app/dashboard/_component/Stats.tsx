import { StatsSummary } from '@/types/dashboard';
import {
  Box,
  LineChart,
  LucideIcon,
  QrCode,
  TimerReset,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import React from 'react';

type Props = {
  data: StatsSummary;
};

type StatsCardProps = {
  title: string;
  content: string | number;
  gain: number | null;
  icon: LucideIcon;
  color: string;
};

function StatsCard({ title, content, gain, icon, color }: StatsCardProps) {
  const Icon = icon;
  return (
    <div className="flex w-full flex-col items-start justify-between gap-8 rounded-xl bg-white px-4 py-3 lg:max-w-[270px]">
      <div className="flex w-full flex-row items-center justify-between lg:gap-12">
        <div className="flex flex-col items-start justify-center gap-2">
          <p className="text-[0.95rem] font-medium text-gray-800">{title}</p>
          <p className="text-[1.4rem] font-semibold">
            {title === 'Total Earning' ? '₹ ' : ''}
            {content}
          </p>
        </div>

        <div className={` ${color} rounded-2xl p-2`}>
          <Icon width={28} height={28} />
        </div>
      </div>

      {gain ? (
        <div className={`flex items-center gap-1`}>
          <div
            className={`${gain > 0 ? 'text-green-400' : 'text-red-400'} flex gap-1`}
          >
            {gain > 0 ? <TrendingUp /> : <TrendingDown />} {gain}%{' '}
          </div>
          {gain > 0 ? 'up ' : 'down'} from yesterday
        </div>
      ) : (
        <div className="text-sm">
          <sup className="text-pink-500">*</sup>
          Check live product for more details
        </div>
      )}
    </div>
  );
}

const mockdata = {
  pendingOrder: 12,
  earningGain: -1.3,
  ordersGain: 2.5,
  qrGain: 4,
};
//w-full grid grid-cols-2 lg:grid-cols-4  justify-between gap-8
function Stats(props: Props) {
  const { data } = props;
  return (
    <div className="col-span-3 row-span-2 xl:row-span-2 2xl:col-span-2">
      <div className="grid w-full grid-cols-2 justify-between gap-8 lg:grid-cols-4 lg:gap-4">
        <StatsCard
          title={'Total Earning'}
          content={data.totalEarning}
          gain={mockdata.earningGain}
          icon={LineChart}
          color={'bg-purple-300 text-purple-700'}
        />
        <StatsCard
          title={'Total Orders'}
          content={data.totalOrders}
          gain={mockdata.ordersGain}
          icon={Box}
          color={'bg-yellow-300 text-yellow-700'}
        />
        <StatsCard
          title={'Total QR Scan'}
          content={data.totalQRScan}
          gain={mockdata.qrGain}
          icon={QrCode}
          color={'bg-green-300 text-green-700'}
        />
        <StatsCard
          title={'Total Pending'}
          content={mockdata.pendingOrder}
          gain={null}
          icon={TimerReset}
          color={'bg-orange-300 text-orange-700'}
        />
      </div>
    </div>
  );
}

export default Stats;
