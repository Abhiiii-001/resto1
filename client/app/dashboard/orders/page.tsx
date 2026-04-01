'use client';
import Loader from '@/components/common/Loader';
import { useGetAllOrdersQuery } from '@/redux/api/order';
import { useAppSelector } from '@/redux/redux';
import { formatDate } from '@/utils/DateFormatter';
import {
  AlertTriangle,
  ChevronDown,
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

// const initialOrders = [
//   {
//     orderCode: "00001",
//     name: "A",
//     isPack: false,
//     paymentOption: "Cash",
//     status: "Completed",
//     createdAt: "2025-03-03",
//   },
//   {
//     orderCode: "00002",
//     name: "B",
//     isPack: true,
//     paymentOption: "Online",
//     status: "Pending",
//     createdAt: "2025-03-03",
//   },
//   {
//     orderCode: "00003",
//     name: "C",
//     isPack: false,
//     paymentOption: "Online",
//     status: "Cancelled",
//     createdAt: "2025-03-03",
//   },
//   {
//     orderCode: "00004",
//     name: "D",
//     isPack: false,
//     paymentOption: "Online",
//     status: "Completed",
//     createdAt: "2025-03-03",
//   },
//   {
//     orderCode: "00005",
//     name: "E",
//     isPack: true,
//     paymentOption: "Cash",
//     status: "Pending",
//     createdAt: "2025-03-03",
//   },
//   {
//     orderCode: "00006",
//     name: "F",
//     isPack: true,
//     paymentOption: "Online",
//     status: "Completed",
//     createdAt: "2025-03-03",
//   },
// ];

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

const OrderList = () => {
  const { restaurantId } = useAppSelector((state) => state.auth);

  const [orderRes, setOrderRes] = useState([]);
  const [orders, setOrders] = useState([]);
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
  } = useGetAllOrdersQuery(restaurantId);
  useEffect(() => {
    if (OrderApiResponse?.success) {
      setOrderRes(OrderApiResponse?.data);
      setOrders(OrderApiResponse?.data);
    } else {
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
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log('Filters', filters);
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
    <div className="mt-6 w-full px-8 pb-10">
      {/* Heading */}
      <div className="flex flex-col items-start justify-between">
        <div className="mb-4 flex w-full flex-row items-center justify-between pr-4">
          <div className="flex items-center gap-2 text-3xl font-semibold text-black">
            Order History <History size={28} color="#3b82f6" />
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
          <Link href={'/dashboard/orders'} className="hover:text-gray-600">
            Orders History
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex w-full flex-row items-center justify-between gap-16">
        <div className="my-6 flex w-fit flex-row rounded-xl border border-gray-200 bg-white text-[0.90rem] font-semibold leading-4 text-gray-700">
          <div className="border-r border-gray-200 px-6 py-4 text-gray-600">
            <Filter />
          </div>

          <div className="flex cursor-default items-center justify-center border-r border-gray-200 px-6 py-4">
            <p> Filter By</p>
          </div>

          {/*Date filter  */}
          <div
            className="relative cursor-pointer border-r border-gray-200 px-6 py-4"
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
              <ChevronDown height={20} width={20} className="mt-1" />
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
                className="relative flex cursor-pointer flex-row items-center justify-center gap-2 border-r border-gray-200 px-6 py-4"
              >
                <p
                  className={`${
                    filterModal === data.name
                      ? 'text-gray-500'
                      : 'text-gray-700'
                  }`}
                >
                  {data.title}
                </p>
                <ChevronDown height={20} width={20} className="mt-1" />

                {/* filter indicator */}
                {filters[data.name].length > 0 && (
                  <div className="absolute right-3 top-3 h-2 w-2 rounded-full bg-red-500 text-xs font-semibold text-white"></div>
                )}

                {/* Modal trigger */}
                {filterModal === data.name && (
                  <div className="absolute top-16 z-10">
                    <FilterModal
                      title={data.modalTitle}
                      name={data.name}
                      options={data.option}
                      filters={filters}
                      submitHandler={handleFilterChange}
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
            className="flex cursor-pointer flex-row items-center justify-center gap-2 border-r border-gray-200 px-4 py-4 text-red-400"
          >
            <RotateCcw width={16} height={16} />
            <p> Reset Filter</p>
          </div>
        </div>

        {/* multiple delete button */}
        {selectedOrders.length > 0 && (
          <button className="flex h-fit items-center gap-2 rounded-xl bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-400">
            <Trash2 size={20} />
            Delete
          </button>
        )}
      </div>

      {/* Table */}
      <div className="overflow-auto">
        {orders && orders.length > 0 ? (
          <div className="h-full w-full min-w-[900px]">
            {/* header */}
            <div className="grid grid-cols-11 rounded-t-xl border border-gray-300 bg-white py-3 text-[0.90rem] font-semibold text-gray-800">
              <div className="col-span-2 flex h-full flex-row gap-16 pl-8">
                <input
                  type="checkbox"
                  checked={orders.length === selectedOrders.length}
                  onChange={() => selectOrderHandler('all')}
                  className="w-4 cursor-pointer rounded-xl"
                />
                <p>Order ID</p>
              </div>
              <div className="col-span-1">Name</div>
              <div className="col-span-1 text-center">Date</div>
              <div className="col-span-2 text-center">Eating Location</div>
              <div className="col-span-2 text-center">Payment Mode</div>
              <div className="col-span-1 text-center">Status</div>
              <div className="col-span-2 text-center">Invoice</div>
            </div>

            {orders.map((order, index) => (
              <div
                key={index}
                className="grid grid-cols-11 border border-gray-300 bg-white py-4 text-[0.90rem] text-gray-600"
              >
                <div className="col-span-2 flex h-full flex-row items-center justify-start gap-6 pl-8">
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.orderCode)}
                    onChange={() => selectOrderHandler(order.orderCode)}
                    className="w-4 cursor-pointer rounded-xl"
                  />
                  <p className="text-sm">{order.orderCode}</p>
                </div>
                <div className="col-span-1 flex items-center justify-start">
                  {order.name == '' ? 'Anoymous' : order.name}
                </div>
                <div className="col-span-1 flex items-center justify-center">
                  {formatDate(order.createdAt)}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {order.isPack == true ? 'Take Out' : 'Eat In'}
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  {order.paymentOption}
                </div>
                <div
                  className={`col-span-1 flex w-full items-center justify-center`}
                >
                  <div
                    className={`flex w-[100px] items-center justify-center rounded-[8px] border px-4 py-1 text-sm font-semibold ${
                      order.status == 'Ready'
                        ? 'bg-green-200 text-green-500'
                        : order.status == 'Pending'
                          ? 'bg-purple-200 text-purple-500'
                          : order.status == 'Cancelled'
                            ? 'bg-red-200 text-red-500'
                            : 'bg-blue-200 text-blue-500'
                    }`}
                  >
                    {order.status}
                  </div>
                </div>
                <div className="col-span-2 flex items-center justify-center">
                  <div className="flex w-fit flex-row rounded-xl border">
                    <button
                      className="border-r p-1 px-3 text-blue-400 hover:text-blue-500"
                      onClick={() =>
                        window.open(
                          `${order?.invoice}?fl_attachment=false`,
                          '_blank',
                        )
                      }
                    >
                      <EyeIcon />
                    </button>
                    <button
                      onClick={() => handleDownload(order?.invoice)}
                      className="p-1 px-3 text-red-400 hover:text-red-500"
                    >
                      <DownloadIcon />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-56 flex h-full w-full items-center justify-center gap-2 text-xl text-red-500">
            <AlertTriangle size={24} />
            <p>No Order found</p>
          </div>
        )}
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
}: {
  title: string;
  name: string;
  options: string[];
  filters: any;
  submitHandler: any;
}) => {
  const [selectedOption, setSelectedOption] = useState<any[]>([]);

  useEffect(() => {
    setSelectedOption(filters[name]);
  }, []);

  const onSelectHandler = (opt: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedOption.includes(opt)) {
      setSelectedOption((prev) => {
        let updatedOption = [...prev];
        updatedOption = updatedOption.filter((op: string) => op !== opt);
        return updatedOption;
      });
    } else {
      const arr = [...selectedOption, opt];
      console.log(arr);
      setSelectedOption(arr);
    }
    console.log('Selected Option', selectedOption);
  };

  return (
    <div className="flex w-[350px] flex-col items-start rounded-2xl bg-white py-4 shadow-lg">
      <div className="px-5 text-xl font-semibold">{title}</div>

      <div className="my-6 grid grid-cols-3 gap-3 px-5">
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={(e) => onSelectHandler(opt.value, e)}
            className={`cursor-pointer rounded-xl border border-gray-400 px-3 py-1 text-center text-sm font-semibold ${
              selectedOption.includes(opt.value)
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-700'
            } transition-all duration-100 hover:bg-blue-400 hover:text-white`}
          >
            {opt.name}
          </div>
        ))}
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      <p className="mt-3 px-5 text-sm text-gray-400">
        *You can choose multiple options
      </p>

      <div className="mb-2 mt-6 flex w-full items-center justify-center">
        <button
          onClick={() => submitHandler(name, selectedOption)}
          className="rounded-[8px] bg-blue-500 px-8 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-blue-400"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default OrderList;
