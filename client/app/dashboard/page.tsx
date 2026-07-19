'use client';
import Link from 'next/link';
import React from 'react';
import Stats from './_component/Stats';
import TrendingProduct from './_component/TrendingProduct';
import SaleSummary from './_component/SaleSummary';
import { getDayAndMonthName } from '@/utils/DateExtracter';
import OrderSummary from './_component/OrderSummary';
import TotalOrderChart from './_component/TotalOrderChart';
import { useAppSelector } from '@/redux/redux';
import { useGetDashboardDataQuery } from '@/redux/api/dashboard';
import Loader from '@/components/common/Loader';
import { skipToken } from '@reduxjs/toolkit/query';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';
import { redirect } from 'next/navigation';
import { Summary } from '@/types/dashboard';

function Dashboard() {
  const { isAuthenticated, restaurantId, role, token } = useAppSelector(
    (state) => state.auth,
  );
  const { data: dashboardData, isLoading } = useGetDashboardDataQuery(
    restaurantId && token ? restaurantId : skipToken,
  );

  const dayData: number[] = [];
  const dayOrderData: number[] = [];
  const dayLabel = dashboardData?.saleSummary?.day.map((summary: Summary) => {
    dayData.push(summary.amount);
    dayOrderData.push(summary.orders);
    return getDayAndMonthName(summary.createdAt).weekday;
  });

  const monthData: number[] = [];
  const monthOrderData: number[] = [];
  const monthLabel = dashboardData?.saleSummary?.month?.map(
    (summary: Summary) => {
      monthData.push(summary.amount);
      monthOrderData.push(summary.orders);
      return getDayAndMonthName(summary.createdAt).month;
    },
  );

  if (!dashboardData || isLoading) {
    return <Loader />;
  }
  if (!isAuthenticated || role !== USER_ROLE_TYPE.RESTAURANT) {
    redirect('/');
  }

  return (
    <div className="min-h-screen w-full bg-gray-50/50 px-4 py-6 md:px-10">
      <div className="mb-6 flex flex-col items-start justify-between gap-1">
        <div className="flex w-full items-center justify-between py-2">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground">
          <Link href={'/'} className="transition-colors hover:text-foreground">
            Home
          </Link>
          <span>/</span>
          <span className="text-foreground">Dashboard</span>
        </div>
      </div>

      <div className="custom-grid-rows no-scrollbar mt-8 grid min-h-full w-full grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-3">
        <Stats data={dashboardData?.stats} />
        <TrendingProduct data={dashboardData?.products} />
        <SaleSummary
          dayData={dayData}
          dayLabel={dayLabel || []}
          monthData={monthData}
          monthLabel={monthLabel || []}
        />
        <OrderSummary
          dayData={dayOrderData}
          dayLabel={dayLabel || []}
          monthData={monthOrderData.slice(0, 6)}
          monthLabel={monthLabel?.slice(0, 6) || []}
        />
        <TotalOrderChart data={dashboardData?.status} />
      </div>
    </div>
  );
}

export default Dashboard;
