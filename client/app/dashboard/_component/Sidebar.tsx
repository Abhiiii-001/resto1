'use client';

import { useAppDispatch, useAppSelector } from '@/redux/redux';
import { setIsSidebarCollapsed } from '@/redux/states/globalSlice';
import {
  Archive,
  Clipboard,
  Layout,
  LucideIcon,
  QrCode,
  Radio,
  SlidersHorizontal,
  User,
  ChevronLeft,
  ChevronRight,
  CreditCard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';
import { useGetRestaurantDetailsQuery } from '@/redux/api/restaurant';

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === '/' && href === '/dashboard');

  return (
    <Link href={href} className="block w-full">
      <div
        className={cn(
          'flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300',
          isActive
            ? 'bg-primary/10 text-primary'
            : 'text-muted-foreground hover:bg-gray-100 hover:text-foreground',
        )}
      >
        <div className="flex h-5 w-5 shrink-0 items-center justify-center">
          <Icon className={cn('h-5 w-5', isActive ? 'text-primary' : '')} />
        </div>
        <span className={cn(
          "transition-all duration-300 overflow-hidden whitespace-nowrap",
          isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"
        )}>
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const {canManage, role, restaurantId} = useAppSelector((state)=>state.auth)

  const { data: restaurantDetails } = useGetRestaurantDetailsQuery(restaurantId, { 
    skip: !restaurantId 
  });

  const plan = restaurantDetails?.subscription?.plan;
  const planType = plan?.type; // 1=DEMO, 2=PRO, 3=PREMIUM


  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };

  const sidebarClassNames = cn(
    'flex h-full w-full z-5 flex-col bg-white border-r border-border transition-all duration-300 overflow-hidden shadow-sm z-40',
    isSidebarCollapsed ? 'w-0 lg:w-[60px] -translate-x-full lg:translate-x-0' : 'w-64 translate-x-0',
  );

  return (
    <>
      {/* Mobile Overlay */}
      {!isSidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black/50 z-0 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}

      <div className={sidebarClassNames}>
      {/* LINKS */}
      <div className="flex-grow overflow-y-auto py-6 px-2 space-y-2">
        {role !== USER_ROLE_TYPE.EMPLOYEE && 
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />}
        <SidebarLink
          href="/dashboard/products"
          icon={Clipboard}
          label="Products"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/live-orders"
          icon={Radio}
          label="Live Orders"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/orders"
          icon={Archive}
          label="Order History"
          isCollapsed={isSidebarCollapsed}
        />
        {role !== USER_ROLE_TYPE.EMPLOYEE && 
        <SidebarLink
          href="/dashboard/employee"
          icon={User}
          label="Team"
          isCollapsed={isSidebarCollapsed}
        />}
        <SidebarLink
          href="/dashboard/qrcode"
          icon={QrCode}
          label="QR Code"
          isCollapsed={isSidebarCollapsed}
        />
        {canManage || role === USER_ROLE_TYPE.RESTAURANT && (
          <div className="relative">
            <SidebarLink
              href="/dashboard/subscription"
              icon={CreditCard}
              label="Subscription"
              isCollapsed={isSidebarCollapsed}
            />
            {planType && planType > 1 && !isSidebarCollapsed && (
              <span className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase",
                planType === 3 ? "bg-amber-100 text-amber-700" : "bg-indigo-100 text-indigo-700"
              )}>
                {planType === 3 ? "PREMIUM" : "PRO"}
              </span>
            )}
          </div>
        )}
        <SidebarLink
          href="/dashboard/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      {!isSidebarCollapsed && (
        <div className="mb-6 px-4">
          <p className="text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Restro</p>
        </div>
      )}
    </div>
</>
  );
};

export default Sidebar;
