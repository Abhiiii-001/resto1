'use client';
import React, { useEffect, useState } from 'react';
import OrderCard from './_componenets/OrderCard';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { useAppSelector } from '@/redux/redux';
import {
  useGetAllOrdersQuery,
  useUpdateOrderStatusMutation,
} from '@/redux/api/order';

type Props = {};

const dummyData = [
  {
    id: 'ajlkal',
    orderCode: '234561',
    name: null,
    status: 'Pending',
    amount: 345,
    isPack: false,
    isVerified: true,
    invoice: ' jsjfla',
    paymentOption: 'Cash',
    createdAt: '',
    restaurantId: 'fjdalk',
    orders: [
      {
        id: 'jkdsfk',
        name: 'Paneer Burger',
        variant: 'small',
        quantity: 2,
        unitPrice: 50,
      },
      {
        id: 'jkdsfkbhb',
        name: 'Paneer Burger',
        variant: 'small',
        quantity: 2,
        unitPrice: 50,
      },
    ],
  },
];

function LiveOrders({}: Props) {
  const { orders } = useAppSelector((state) => state.order);
  const { restaurantId } = useAppSelector((state) => state.auth);

  const [query, setQuery] = useState('');
  const [filteredOrders, setFilteredOrders] = useState(orders);

  useGetAllOrdersQuery(restaurantId);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  useEffect(() => {
    const data = orders.filter(
      (ord) =>
        !query || query == '' || ord.orderCode.toLowerCase().includes(query),
    );
    setFilteredOrders(data);
  }, [query]);

  return (
    <div className="mx-4 my-8 px-6">
      {/* Heading */}
      <div className="mb-4 flex flex-col items-start justify-between">
        <div className="mb-4 flex w-full flex-row items-center justify-between">
          <div className="flex items-center gap-2 text-3xl font-semibold text-black">
            Live Orders
          </div>
          <div className="">
            {/* Search Form */}
            <SearchForm query={query} setQuery={setQuery} />
          </div>
        </div>

        <div className="flex flex-row gap-2 pb-4 text-[16px] font-semibold text-gray-400">
          <Link href={'/'} className="hover:text-gray-600">
            Home
          </Link>
          {'>'}
          <Link href={'/dashboard'} className="hover:text-gray-600">
            Dashboard
          </Link>
          {'>'}
          <Link href={'/dashboard/live-orders'} className="hover:text-gray-600">
            Live Order
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 justify-center gap-8 xl:grid-cols-2 2xl:grid-cols-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((data, index) => (
            <OrderCard data={data} key={index} />
          ))
        ) : (
          <div className="flex h-[50vh] w-[80vw] items-center justify-center text-2xl font-medium text-black">
            No order available
          </div>
        )}
      </div>
    </div>
  );
}

const SearchForm = ({ query, setQuery }) => {
  return (
    <form className="mx-auto w-full pb-2">
      <label
        htmlFor="search"
        className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-gray-400">
          <Search width={16} height={16} />
        </div>
        <input
          type="search"
          id="search"
          value={query}
          onChange={(e) => {
            e.preventDefault();
            setQuery(e.target.value);
          }}
          className="block rounded-xl border border-gray-300 bg-gray-50 px-12 py-2 font-clash text-sm text-gray-900 focus:border-gray-500 focus:ring-gray-500"
          placeholder="Search orders..."
          required
        />
      </div>
    </form>
  );
};

export default LiveOrders;
