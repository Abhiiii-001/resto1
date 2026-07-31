'use client';
import React, { useEffect, useState } from 'react';
import OrderCard from './_componenets/OrderCard';
import Link from 'next/link';
import { Search, Activity, ChevronRight } from 'lucide-react';
import { useAppSelector } from '@/redux/redux';
import { useGetAllOrdersQuery } from '@/redux/api/order';
import { Input } from '@/components/ui/input';
import { skipToken } from '@reduxjs/toolkit/query';
import { useGlobalDetails } from '@/hooks/useGlobalDetails';

function LiveOrders() {
  const { orders, socketConnected } = useAppSelector((state) => state.order);
  const { restaurantId, token } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState('');

  const { restaurantDetails } = useGlobalDetails();

  const isShopOpen = restaurantDetails?.isOpen ?? false;

  useGetAllOrdersQuery(restaurantId && token ? restaurantId : skipToken);
  
  const filteredOrders = React.useMemo(() => {
    let result = [...orders];
    
    // 1. Sort by newest first
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
    
    // 2. Filter by search query
    if (query && query.trim() !== '') {
      result = result.filter((ord: any) =>
        ord.orderCode.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    return result;
  }, [orders, query]);

  return (
    <div className="flex h-full w-full flex-col px-4 py-6 md:px-10 bg-gray-50/50 min-h-screen">
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              Live Orders
            </h2>
            <div className="flex items-center gap-2">
              <div className="relative flex h-3 w-3">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${socketConnected && isShopOpen ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${socketConnected && isShopOpen ? 'bg-green-500' : 'bg-red-500'}`}
                ></span>
              </div>
              <span
                className={`text-xs font-medium uppercase tracking-wider ${socketConnected && isShopOpen ? 'text-green-600' : 'text-red-600'}`}
              >
                {!isShopOpen
                  ? 'Shop Closed'
                  : socketConnected
                    ? 'Live'
                    : 'Offline'}
              </span>
            </div>
          </div>
          <div className="mt-2 flex items-center text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link
              href="/dashboard"
              className="transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">Live Orders</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <SearchForm query={query} setQuery={setQuery} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((data: any, index: number) => (
            <OrderCard data={data} key={index} />
          ))
        ) : (
          <div className="col-span-full flex h-[400px] w-full flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-gray-300 bg-white shadow-sm">
            <div className="rounded-full bg-gray-50 p-4 text-muted-foreground">
              <Activity className="h-8 w-8 opacity-50" />
            </div>
            <p className="text-lg font-medium text-muted-foreground">
              No active live orders
            </p>
            <p className="text-sm text-gray-400">
              New incoming orders will appear here instantly.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

const SearchForm = ({ query, setQuery }: any) => {
  return (
    <div className="relative w-full sm:w-[320px]">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-muted-foreground">
        <Search className="h-4 w-4" />
      </div>
      <Input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-10"
        placeholder="Search by Order ID..."
      />
    </div>
  );
};

export default LiveOrders;
