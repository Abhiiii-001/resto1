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
  gain?: number | null;
  description?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
};

function StatsCard({ title, content, gain, description, icon: Icon, iconBg, iconColor }: StatsCardProps) {
  return (
    <div className="flex w-full flex-col items-start justify-between gap-6 rounded-xl border border-border bg-white px-5 py-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex w-full flex-row items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground">
            {title === 'Total Earning' ? '₹' : ''}{content}
          </p>
        </div>

        <div className={`${iconBg} rounded-xl p-2.5`}>
          <Icon className={`h-6 w-6 ${iconColor}`} />
        </div>
      </div>

      {gain ? (
        <div className="flex items-center gap-1.5 text-sm">
          <div
            className={`flex items-center gap-1 font-semibold ${gain > 0 ? 'text-green-600' : 'text-red-500'}`}
          >
            {gain > 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
            {Math.abs(gain)}%
          </div>
          <span className="text-muted-foreground">{gain > 0 ? 'up' : 'down'} from yesterday</span>
        </div>
      ) : description ? (
        <div className="text-xs font-medium text-muted-foreground/80">
          {description}
        </div>
      ) : null}
    </div>
  );
}

function Stats(props: Props) {
  const { data } = props;
  return (
    <div className="col-span-3 row-span-2 xl:row-span-2 2xl:col-span-2">
      <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4">
        <StatsCard
          title="Total Earning"
          content={data.totalEarning}
          description="Total revenue generated"
          icon={LineChart}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />
        <StatsCard
          title="Total Orders"
          content={data.totalOrders}
          description="Lifetime orders processed"
          icon={Box}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
        <StatsCard
          title="Total QR Scan"
          content={data.totalQRScan}
          description="Direct customer engagement"
          icon={QrCode}
          iconBg="bg-green-50"
          iconColor="text-green-600"
        />
        <StatsCard
          title="Total Pending"
          content={data.totalPending || 0}
          description="Orders awaiting action"
          icon={TimerReset}
          iconBg="bg-primary/10"
          iconColor="text-primary"
        />
      </div>
    </div>
  );
}

export default Stats;
