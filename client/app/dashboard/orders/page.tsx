'use client';
import Loader from '@/components/common/Loader';
import { useGetAllOrdersQuery } from '@/redux/api/order';
import { useAppSelector } from '@/redux/redux';
import { skipToken } from '@reduxjs/toolkit/query';
import { formatDate } from '@/utils/DateFormatter';
import {
  AlertTriangle,
  ChevronDown,
  ChevronRight,
  DownloadIcon,
  EyeIcon,
  Filter,
  History,
  RotateCcw,
  Search,
  Trash2,
} from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const filtersData = [
  {
    name: 'isPack',
    title: 'Eating Location',
    modalTitle: 'Select Eating Location',
    option: [
      { name: 'Eat In', value: false },
      { name: 'Take Out', value: true },
    ],
  },
  {
    name: 'paymentOption',
    title: 'Payment',
    modalTitle: 'Select Payment Mode',
    option: [
      { name: 'Online', value: 'Online' },
      { name: 'Cash', value: 'Cash' },
    ],
  },
  {
    name: 'status',
    title: 'Order Status',
    modalTitle: 'Select Order Status',
    option: [
      { name: 'Ready', value: 'Ready' },
      { name: 'Pending', value: 'Pending' },
      { name: 'Cancelled', value: 'Cancelled' },
      { name: 'Completed', value: 'Completed' },
    ],
  },
];

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

const OrderList = () => {
  const { restaurantId, token } = useAppSelector((state) => state.auth);

  const [orderRes, setOrderRes] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    createdAt: '',
    isPack: [],
    paymentOption: [],
    status: [],
  });

  const [filterModal, setFilterModal] = useState(''); // use for open filter modal a/c to the name of modal
  const [query, setQuery] = useState(''); // use for filter items using search
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const {
    data: OrderApiResponse,
    isLoading,
    isError,
  } = useGetAllOrdersQuery(restaurantId && token ? restaurantId : skipToken);
  
  useEffect(() => {
    if (OrderApiResponse?.success) {
      setOrderRes(OrderApiResponse?.data);
      setOrders(OrderApiResponse?.data);
    } else if (OrderApiResponse?.success === false) {
      toast.error(OrderApiResponse?.message);
    }
  }, [OrderApiResponse]);

  useEffect(() => {
    const filteredOrders = orderRes.filter((order) => {
      return (
        (filters.createdAt == '' || filters.createdAt == order.createdAt) &&
        (filters.isPack.length == 0 || filters.isPack.includes(order.isPack)) &&
        (filters.paymentOption.length == 0 ||
          filters.paymentOption.includes(order.paymentOption)) &&
        (filters.status.length == 0 || filters.status.includes(order.status)) &&
        (!query ||
          query == '' ||
          order.orderCode.toLowerCase().includes(query.toLowerCase()))
      );
    });
    setOrders(filteredOrders);
  }, [filters, query, orderRes]);

  //select order handler
  const selectOrderHandler = (orderId: string) => {
    if (orderId == 'all') {
      if (selectedOrders.length != orders.length) {
        let t: string[] = [];
        orders.forEach((ord) => t.push(ord.orderCode));
        setSelectedOrders(t);
      } else {
        setSelectedOrders([]);
      }
    } else {
      setSelectedOrders((prev) => {
        let currSelectOrder = [...prev];
        if (currSelectOrder.includes(orderId)) {
          currSelectOrder = currSelectOrder.filter((ord) => ord !== orderId);
        } else {
          currSelectOrder.push(orderId);
        }
        return currSelectOrder;
      });
    }
  };

  // Handle filter changes
  const handleFilterChange = (name: string, value: string[] | string) => {
    setFilters((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset Filters
  const resetFilters = () =>
    setFilters({ createdAt: '', isPack: [], paymentOption: [], status: [] });

  //download handler
  const handleDownload = (url: string) => {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'invoice.pdf'; // Sets the correct file name
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error('Download failed', error));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col p-6 md:p-10 bg-gray-50/50 min-h-screen">
      {/* Header section */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">Order History</h2>
            <History className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-2 flex items-center text-sm font-medium text-muted-foreground">
            <Link href="/" className="transition-colors hover:text-foreground">Home</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <Link href="/dashboard" className="transition-colors hover:text-foreground">Dashboard</Link>
            <ChevronRight className="mx-1 h-4 w-4" />
            <span className="text-foreground">Orders History</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <SearchForm query={query} setQuery={setQuery} />
        </div>
      </div>

      {/* Filters Bar (Keeping original design as requested, just updating colors) */}
      <div className="mb-6 flex w-full flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex w-full sm:w-fit flex-row rounded-xl border border-border bg-background text-[0.90rem] font-semibold leading-4 text-foreground shadow-sm overflow-x-auto no-scrollbar">
          <div className="border-r border-border px-6 py-4 text-muted-foreground">
            <Filter className="h-4 w-4" />
          </div>

          <div className="flex cursor-default items-center justify-center border-r border-border px-6 py-4">
            <p>Filter By</p>
          </div>

          {/*Date filter  */}
          <div
            className="relative cursor-pointer border-r border-border px-6 py-4 transition-colors hover:bg-gray-50"
            onClick={() => {
              setFilterModal('date');
              dateInputRef.current?.showPicker();
            }}
          >
            <div className="flex w-full flex-row items-center justify-center gap-2">
              <p>
                {filters.createdAt.length == 0
                  ? 'Date'
                  : formatDate(filters.createdAt)}
              </p>
              <ChevronDown height={16} width={16} className="text-muted-foreground" />
            </div>
            <input
              ref={dateInputRef}
              type="date"
              name="createdAt"
              value={filters.createdAt}
              onChange={(e) =>
                handleFilterChange(e.target.name, e.target.value)
              }
              className={'absolute h-full w-full opacity-0'}
            />
          </div>

          {filtersData.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setFilterModal((prev) => {
                    if (prev == data.name) return '';
                    else return data.name;
                  })
                }
                className="relative flex cursor-pointer flex-row items-center justify-center gap-2 border-r border-border px-6 py-4 transition-colors hover:bg-gray-50"
              >
                <p
                  className={`${
                    filterModal === data.name
                      ? 'text-primary'
                      : 'text-foreground'
                  }`}
                >
                  {data.title}
                </p>
                <ChevronDown height={16} width={16} className="text-muted-foreground" />

                {/* filter indicator */}
                {filters[data.name].length > 0 && (
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-primary ring-2 ring-white"></div>
                )}

                {/* Modal trigger */}
                {filterModal === data.name && (
                  <div className="absolute top-[110%] z-10 left-0" onClick={(e) => e.stopPropagation()}>
                    <FilterModal
                      title={data.modalTitle}
                      name={data.name}
                      options={data.option}
                      filters={filters}
                      submitHandler={handleFilterChange}
                      closeModal={() => setFilterModal('')}
                    />
                  </div>
                )}
              </div>
            );
          })}

          {/* Reset filter */}
          <div
            onClick={() => {
              setFilterModal('Reset');
              resetFilters();
            }}
            className="flex cursor-pointer flex-row items-center justify-center gap-2 px-4 py-4 text-destructive transition-colors hover:bg-red-50"
          >
            <RotateCcw width={14} height={14} />
            <p>Reset</p>
          </div>
        </div>

        {/* multiple delete button */}
        {selectedOrders.length > 0 && (
          <Button variant="destructive" className="gap-2 shadow-sm">
            <Trash2 className="h-4 w-4" />
            Delete Selected ({selectedOrders.length})
          </Button>
        )}
      </div>

      {/* Table Section */}
      <div className="flex-1 overflow-hidden rounded-xl border border-border bg-background shadow-sm">
        <div className="w-full overflow-x-auto no-scrollbar">
          {orders && orders.length > 0 ? (
            <div className="min-w-[1000px]">
              {/* header */}
              <div className="grid grid-cols-11 border-b border-border bg-gray-50/80 px-6 py-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <div className="col-span-2 flex h-full flex-row items-center gap-4">
                  <input
                    type="checkbox"
                    checked={orders.length > 0 && orders.length === selectedOrders.length}
                    onChange={() => selectOrderHandler('all')}
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                  />
                  <p>Order ID</p>
                </div>
                <div className="col-span-2">Customer</div>
                <div className="col-span-1 text-center">Date</div>
                <div className="col-span-2 text-center">Location</div>
                <div className="col-span-1 text-center">Payment</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-1 text-right pr-4">Invoice</div>
              </div>

              {/* Table Body */}
              <div className="divide-y divide-gray-100">
                {orders.map((order, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-11 items-center px-6 py-4 text-sm transition-colors hover:bg-gray-50/50"
                  >
                    <div className="col-span-2 flex flex-row items-center gap-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.orderCode)}
                        onChange={() => selectOrderHandler(order.orderCode)}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
                      />
                      <span className="font-medium text-foreground">#{order.orderCode}</span>
                    </div>
                    
                    <div className="col-span-2 flex items-center font-medium text-gray-700">
                      {order.name === '' ? 'Anonymous' : order.name}
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-center text-muted-foreground">
                      {formatDate(order.createdAt)}
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-center">
                      <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.isPack 
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20' 
                          : 'bg-purple-50 text-purple-700 ring-1 ring-inset ring-purple-600/20'
                      }`}>
                        {order.isPack ? 'Take Out' : 'Eat In'}
                      </span>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-center font-medium text-gray-700">
                      {order.paymentOption}
                    </div>
                    
                    <div className="col-span-2 flex items-center justify-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${
                          order.status == 'Ready'
                            ? 'bg-green-50 text-green-700 ring-green-600/20'
                            : order.status == 'Pending'
                              ? 'bg-amber-50 text-amber-700 ring-amber-600/20'
                              : order.status == 'Cancelled'
                                ? 'bg-red-50 text-red-700 ring-red-600/20'
                                : 'bg-primary/10 text-primary ring-primary/20'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    
                    <div className="col-span-1 flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                        title="View Invoice"
                        onClick={() =>
                          window.open(
                            `${order?.invoice}?fl_attachment=false`,
                            '_blank',
                          )
                        }
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-primary hover:bg-primary/10 hover:text-primary"
                        title="Download Invoice"
                        onClick={() => handleDownload(order?.invoice)}
                      >
                        <DownloadIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex h-[400px] w-full flex-col items-center justify-center gap-3">
              <div className="rounded-full bg-red-50 p-4 text-red-500">
                <AlertTriangle className="h-8 w-8" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">No orders found</p>
              <p className="text-sm text-muted-foreground">Try adjusting your filters or search query.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FilterModal = ({
  title,
  name,
  options,
  filters,
  submitHandler,
  closeModal,
}: {
  title: string;
  name: string;
  options: any[];
  filters: any;
  submitHandler: any;
  closeModal: () => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<any[]>([]);

  useEffect(() => {
    setSelectedOption(filters[name] || []);
  }, [filters, name]);

  const onSelectHandler = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedOption.includes(opt)) {
      setSelectedOption((prev) => prev.filter((op: string) => op !== opt));
    } else {
      setSelectedOption([...selectedOption, opt]);
    }
  };

  return (
    <div className="flex w-[350px] flex-col items-start rounded-xl border border-border bg-white py-4 shadow-lg cursor-default" onClick={(e) => e.stopPropagation()}>
      <div className="px-5 text-lg font-semibold text-foreground">{title}</div>

      <div className="my-5 grid grid-cols-2 gap-3 px-5 w-full">
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={(e) => onSelectHandler(opt.value, e)}
            className={`cursor-pointer rounded-lg border px-3 py-2 text-center text-sm font-semibold transition-all duration-150 ${
              selectedOption.includes(opt.value)
                ? 'border-primary bg-primary text-primary-foreground'
                : 'border-border bg-white text-muted-foreground hover:border-primary/50 hover:bg-gray-50'
            }`}
          >
            {opt.name}
          </div>
        ))}
      </div>

      <div className="h-[1px] w-full bg-border" />

      <p className="mt-3 px-5 text-xs text-muted-foreground">
        *You can choose multiple options
      </p>

      <div className="mt-4 flex w-full items-center justify-end px-5 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            closeModal();
          }}
        >
          Cancel
        </Button>
        <Button
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            submitHandler(name, selectedOption);
            closeModal();
          }}
        >
          Apply Filter
        </Button>
      </div>
    </div>
  );
};

export default OrderList;
