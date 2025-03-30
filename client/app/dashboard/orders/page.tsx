"use client";
import Loader from "@/components/common/Loader";
import { useGetAllOrdersQuery } from "@/redux/api/order";
import { useAppSelector } from "@/redux/redux";
import { formatDate } from "@/utils/DateFormatter";
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
} from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

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
    name: "isPack",
    title: "Eating Location",
    modalTitle: "Select Eating Location",
    option: [
      { name: "Eat In", value: false },
      { name: "Take Out", value: true },
    ],
  },
  {
    name: "paymentOption",
    title: "Payment",
    modalTitle: "Select Payment Mode",
    option: [
      { name: "Online", value: "Online" },
      { name: "Cash", value: "Cash" },
    ],
  },
  {
    name: "status",
    title: "Order Status",
    modalTitle: "Select Order Status",
    option: [
      { name: "Ready", value: "Ready" },
      { name: "Pending", value: "Pending" },
      { name: "Cancelled", value: "Cancelled" },
      { name: "Completed", value: "Completed" },
    ],
  },
];

const SearchForm = ({ query, setQuery }) => {
  return (
    <form className="w-full mx-auto pb-2">
      <label
        htmlFor="search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none text-gray-400">
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
          className="block px-12 py-2 font-clash text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-gray-500 focus:border-gray-500 "
          placeholder="Search orders..."
          required
        />
      </div>
    </form>
  );
};

const OrderList = () => {

  const { restaurantId } = useAppSelector((state) => state.auth)

  const [orderRes, setOrderRes] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filters, setFilters] = useState<any>({
    createdAt: "",
    isPack: [],
    paymentOption: [],
    status: [],
  });

  const [filterModal, setFilterModal] = useState(""); // use for open filter modal a/c to the name of modal
  const [query, setQuery] = useState(""); // use for filter items using search
  const [selectedOrders , setSelectedOrders] = useState<string[]>([]);

  const dateInputRef = useRef<HTMLInputElement>(null);

  const {data:OrderApiResponse,isLoading,isError} = useGetAllOrdersQuery(restaurantId);
  useEffect(() => {
    if(OrderApiResponse?.success){
       setOrderRes(OrderApiResponse?.data);
       setOrders(OrderApiResponse?.data);
    }
    else{
      toast.error(OrderApiResponse?.message);
    }
  },[OrderApiResponse])

  useEffect(() => {
    const filteredOrders = orderRes.filter((order) => {
      return (
        (filters.createdAt == "" || filters.createdAt == order.createdAt) &&
        (filters.isPack.length == 0 || filters.isPack.includes(order.isPack)) &&
        (filters.paymentOption.length == 0 ||
          filters.paymentOption.includes(order.paymentOption)) &&
        (filters.status.length == 0 || filters.status.includes(order.status)) &&
        (!query ||query == "" || order.orderCode.toLowerCase().includes(query.toLowerCase()))
      );
    });
    setOrders(filteredOrders);
  }, [filters, query,orderRes]);


  //select order handler
  const selectOrderHandler = (orderId: string) => {
     if(orderId == "all"){
        if(selectedOrders.length != orders.length){
            let t: string[] = [];
            orders.forEach((ord) => t.push(ord.orderCode));
            setSelectedOrders(t);
        }
        else{
          setSelectedOrders([]);
        }
     }
     else{
        setSelectedOrders((prev) => {
           let currSelectOrder = [...prev];
           if(currSelectOrder.includes(orderId)){
             currSelectOrder = currSelectOrder.filter((ord) => ord !== orderId)
           }
           else{
            currSelectOrder.push(orderId);
           }
           return currSelectOrder;
        })
     }
  }

  // Handle filter changes
  const handleFilterChange = (name: string, value: string[] | string) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));

    console.log("Filters", filters);
  };

  // Reset Filters
  const resetFilters = () =>
    setFilters({ createdAt: "", isPack: [], paymentOption: [], status: [] });


  //download handler
  const handleDownload = (url:string) => {
    fetch(url)
    .then(response => response.blob())
    .then(blob => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "invoice.pdf"; // Sets the correct file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    })
    .catch(error => console.error("Download failed", error));
  };

  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="w-full mt-6 px-8 pb-10">

      {/* Heading */}
      <div className="flex flex-col justify-between items-start">
        <div className="flex flex-row justify-between items-center mb-4 w-full pr-4">
          <div className="text-3xl text-black font-semibold flex items-center gap-2">Order History <History size={28} color="#3b82f6"/></div>
          <div className="">
            {/* Search Form */}
            <SearchForm query={query} setQuery={setQuery} />
          </div>
        </div>

        <div className="pb-4 flex flex-row gap-2 text-[16px] font-semibold text-gray-400">
          <Link href={"/"} className="hover:text-gray-600">
            Home
          </Link>
          {">"}
          <Link href={"/dashboard"} className="hover:text-gray-600">
            Dashboard
          </Link>
          {">"}
          <Link href={"/dashboard/orders"} className="hover:text-gray-600">
            Orders History
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-row items-center justify-between gap-16 w-full">

        <div className="flex flex-row w-fit my-6 rounded-xl border font-semibold text-gray-700 border-gray-200 bg-white text-[0.90rem] leading-4">
          <div className="px-6 py-4 border-r border-gray-200 text-gray-600">
            <Filter />
          </div>

          <div className="px-6 py-4 flex items-center justify-center border-r border-gray-200 cursor-default">
            <p> Filter By</p>
          </div>

          {/*Date filter  */}
          <div
            className=" cursor-pointer relative py-4 px-6 border-r border-gray-200"
            onClick={() => {
              setFilterModal("date");
              dateInputRef.current?.showPicker();
            }}
          >
            <div className="w-full flex flex-row items-center justify-center gap-2">
              <p>
                {filters.createdAt.length == 0
                  ? "Date"
                  : formatDate(filters.createdAt)}
              </p>
              <ChevronDown height={20} width={20} className="mt-1" />
            </div>
            <input
              ref={dateInputRef}
              type="date"
              name="createdAt"
              value={filters.createdAt}
              onChange={(e) => handleFilterChange(e.target.name, e.target.value)}
              className={"absolute w-full h-full opacity-0"}
            />
          </div>

          {filtersData.map((data, index) => {
            return (
              <div
                key={index}
                onClick={() =>
                  setFilterModal((prev) => {
                    if (prev == data.name) return "";
                    else return data.name;
                  })
                }
                className="px-6 py-4 border-r relative border-gray-200 flex flex-row items-center justify-center gap-2 cursor-pointer"
              >
                <p
                  className={`${
                    filterModal === data.name ? "text-gray-500" : "text-gray-700"
                  }`}
                >
                  {data.title}
                </p>
                <ChevronDown height={20} width={20} className="mt-1" />

                {/* filter indicator */}
                {  
                  filters[data.name].length > 0 && 
                  <div className="text-xs font-semibold w-2 h-2 rounded-full absolute right-3 top-3 bg-red-500 text-white"></div>
                }

                {/* Modal trigger */}
                {filterModal === data.name && (
                  <div className="absolute top-16">
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
              setFilterModal("Reset");
              resetFilters();
            }}
            className="px-4 py-4 border-r border-gray-200 text-red-400 flex flex-row items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw width={16} height={16} />
            <p> Reset Filter</p>
          </div>
        </div>
        
        {/* multiple delete button */}
        {
          selectedOrders.length > 0 && <button className=" px-8 py-3 text-white font-semibold h-fit flex gap-2 items-center bg-red-500 hover:bg-red-400 rounded-xl">
          <Trash2 size={20}/>
          Delete
        </button>
        }

      </div>

      {/* Table */}
      {orders && orders.length > 0 ? (
        <div>
          {/* header */}
          <div className="grid grid-cols-11 py-3 font-semibold text-[0.90rem] text-gray-800 rounded-t-xl border border-gray-300 bg-white ">
            <div className="col-span-2 h-full flex flex-row gap-16 pl-8">
              <input
              type="checkbox"
              checked = {orders.length === selectedOrders.length}
              onChange={() => selectOrderHandler("all")}
              className="w-4 rounded-xl cursor-pointer" />
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
              className="grid grid-cols-11 py-4  text-[0.90rem] text-gray-600 border border-gray-300 bg-white "
            >
              <div className="col-span-2 h-full flex flex-row gap-6 pl-8 items-center justify-start">
                <input
                type="checkbox" 
                checked={selectedOrders.includes(order.orderCode)}
                onChange={() => selectOrderHandler(order.orderCode)}
                className="w-4 rounded-xl cursor-pointer" />
                <p className="text-sm">{order.orderCode}</p>
              </div>
              <div className="col-span-1 flex items-center justify-start">
                {order.name == "" ? "Anoymous" : order.name}
              </div>
              <div className="col-span-1 flex items-center justify-center">
                {formatDate(order.createdAt)}
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {order.isPack == true ? "Take Out" : "Eat In"}
              </div>
              <div className="col-span-2 flex items-center justify-center">
                {order.paymentOption}
              </div>
              <div
                className={`col-span-1 flex justify-center items-center w-full `}
              >
                <div
                  className={` flex justify-center items-center text-sm font-semibold px-4 w-[100px] py-1 rounded-[8px] border
                ${
                  order.status == "Ready"
                    ? "bg-green-200 text-green-500"
                    : order.status == "Pending"
                    ? "bg-purple-200 text-purple-500"
                    : order.status == "Cancelled"
                    ? "bg-red-200 text-red-500"
                    : "bg-blue-200 text-blue-500"
                }`}
                >
                  {order.status}
                </div>
              </div>
              <div className="col-span-2 flex items-center justify-center">
                <div className="flex flex-row border w-fit rounded-xl">
                  <button
                  className="border-r p-1 px-3 text-blue-400 hover:text-blue-500"
                  onClick={() => window.open(`${order?.invoice}?fl_attachment=false`,"_blank")}
                  >
                    <EyeIcon />
                  </button>
                  <button
                  onClick={() => handleDownload(order?.invoice)}
                  className="p-1 px-3 text-red-400 hover:text-red-500">
                    <DownloadIcon />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center gap-2 mt-56 text-xl text-red-500">
          <AlertTriangle size={24}/> 
          <p>No Order found</p>
        </div>
      )}
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
    console.log("Selected Option", selectedOption);
  };

  return (
    <div className="py-4 rounded-2xl flex flex-col items-start w-[350px] bg-white shadow-lg">
      <div className="text-xl font-semibold px-5">{title}</div>

      <div className="grid grid-cols-3 gap-3 px-5 my-6">
        {options.map((opt, index) => (
          <div
            key={index}
            onClick={(e) => onSelectHandler(opt.value, e)}
            className={`px-3 py-1 rounded-xl cursor-pointer text-center text-sm font-semibold border border-gray-400 ${
              selectedOption.includes(opt.value)
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700"
            } hover:bg-blue-400 hover:text-white transition-all duration-100`}
          >
            {opt.name}
          </div>
        ))}
      </div>

      <div className="w-full h-[1px] bg-gray-200" />

      <p className="text-sm text-gray-400 px-5 mt-3">
        *You can choose multiple options
      </p>

      <div className="w-full flex items-center justify-center mt-6 mb-2">
        <button
          onClick={() => submitHandler(name, selectedOption)}
          className="px-8 py-2 bg-blue-500 text-white text-sm rounded-[8px] font-semibold hover:bg-blue-400 transition-all duration-200"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default OrderList;
