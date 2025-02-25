"use client";
import React, { useState } from "react";

const initialOrders = [
  { id: "00001", name: "A", location: "Table 5", payment: "Paid", status: "Completed", date: "2024-02-10" },
  { id: "00002", name: "B", location: "Takeaway", payment: "Pending", status: "Processing", date: "2024-02-11" },
  { id: "00003", name: "C", location: "Table 2", payment: "Paid", status: "Rejected", date: "2024-02-12" },
  { id: "00004", name: "D", location: "Table 8", payment: "Paid", status: "Completed", date: "2024-02-10" },
  { id: "00005", name: "E", location: "Eatin", payment: "Pending", status: "Processing", date: "2024-02-11" },
  { id: "00006", name: "F", location: "Table 1", payment: "Paid", status: "Completed", date: "2024-02-12" },
];

const SearchForm = ({ query, setQuery }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Searching for:", query);
  };

  return (
    <form onSubmit={handleSearch} className="max-w-md mx-auto w-[50%] pb-2">
      <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input
          type="search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search orders..."
          required
        />
        <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-400 hover:bg-blue-500 transition-all duration-200 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Search
        </button>
      </div>
    </form>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [filters, setFilters] = useState({ date: "", location: "", payment: "", status: "" });
  const [query, setQuery] = useState("");

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  // Reset Filters
  const resetFilters = () => setFilters({ date: "", location: "", payment: "", status: "" });

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    return (
      (!filters.date || order.date === filters.date) &&
      (!filters.location || order.location === filters.location) &&
      (!filters.payment || order.payment === filters.payment) &&
      (!filters.status || order.status === filters.status) &&
      (!query || order.name.toLowerCase().includes(query.toLowerCase()))
    );
  });

  return (
    <div className="w-[80%] mx-auto mt-6">
      <div className="flex justify-between items-center">
      <h2 className="text-2xl font-semibold mb-4 w-[50%]">Order Lists</h2>

{/* Search Form */}
<SearchForm query={query} setQuery={setQuery} />

      </div>
      {/* Filters */}
      <div className="flex flex-wrap gap-4 bg-gray-100 p-4 rounded-md shadow-md mb-4">
        <input
          type="date"
          name="date"
          value={filters.date}
          onChange={handleFilterChange}
          className="border p-2 rounded-md  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary"
        />
        <input
          type="text"
          placeholder="Eating Location"
          name="location"
          value={filters.location}
          onChange={handleFilterChange}
          className="border p-2 rounded-md  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary"
        />
        <select name="payment" value={filters.payment} onChange={handleFilterChange} className="border p-2 rounded-md  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">
          <option value="">Payment Status</option>
          <option value="Paid">Paid</option>
          <option value="Pending">Pending</option>
        </select>
        <select name="status" value={filters.status} onChange={handleFilterChange} className="border p-2 rounded-md  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">
          <option value="">Order Status</option>
          <option value="Completed">Completed</option>
          <option value="Processing">Processing</option>
          <option value="Rejected">Rejected</option>
        </select>
        <button onClick={resetFilters} className="bg-red-400 hover:bg-red-500 transition-all duration-300 text-white px-4 py-2 rounded-md  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">
          Reset Filters
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800">
              <th className="py-2 px-4 text-left text-gray-800  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">ID</th>
              <th className="py-2 px-4 text-left text-gray-800  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">Name</th>
              <th className="py-2 px-4 text-left text-gray-800  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">Eating Location</th>
              <th className="py-2 px-4 text-left text-gray-800  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">Payment</th>
              <th className="py-2 px-4 text-left text-gray-800  text-sm font-medium text-lc-text-primary dark:text-dark-lc-text-primary">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order, index) => (
                <tr
                  key={index}
                  className={`${index !== filteredOrders.length - 1 ? "border-b border-black" : ""} hover:bg-gray-50`}
                >
                  <td className="py-2 px-4 text-xs border-gray-300 border-y-[1px]">{order.id}</td>
                  <td className="py-4 px-4 text-xs border-gray-300 border-y-[1px]">{order.name}</td>
                  <td className="py-2 px-4 text-xs border-gray-300 border-y-[1px]">{order.location}</td>
                  <td className="py-2 px-4 text-xs border-gray-300 border-y-[1px]">{order.payment}</td>
                  <td className="py-2 px-4 text-xs border-gray-300 border-y-[1px]">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs ${
                        order.status === "Completed" ? "bg-green-400" : order.status === "Processing" ? "bg-purple-400" : "bg-red-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-500">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
