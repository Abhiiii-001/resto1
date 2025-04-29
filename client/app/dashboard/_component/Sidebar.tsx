"use client";

import { useAppDispatch, useAppSelector } from "@/redux/redux";
import { setIsSidebarCollapsed } from "@/redux/states/globalSlice";
import { addOrder } from "@/redux/states/orderSlice";
import {
  Archive,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  QrCode,
  Radio,
  SlidersHorizontal,
  User,
} from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { io } from 'socket.io-client'



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
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  const toggleSidebar = () => {
    dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
  };
  
  const [ newOrderModal , setNewOrderModal ] = useState(null);
     
  
    const {user , isAuthenticated } = useAppSelector((state) => state.auth)
    console.log("User data",user,isAuthenticated);

    //web socket configuration
  
    const socket = io('http://localhost:8000',{
      path:"/socket-server-path"
    })
    useEffect(() => {
       if(isAuthenticated){
          //join room
          socket.emit("joinRoom",user.role == "User" ? user?.restaurantId : user.id);
           
          //listen for new order
          socket.on('newOrder',(orderData) => {
            console.log("New Order Recieved",orderData);
            dispatch(addOrder(orderData));
            setNewOrderModal(orderData);
          });
  
          return () => {
            socket.off("newOrder");
          }
       }
    },[])

  const sidebarClassNames = `fixed flex flex-col  ${
    isSidebarCollapsed ? "w-10 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-50`;

  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
     

      {/* LINKS */}
      <div className="flex-grow mt-20">
        <SidebarLink
          href="/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
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
        <SidebarLink
          href="/dashboard/employee"
          icon={User}
          label="Team"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/qrcode"
          icon={QrCode}
          label="QR Code"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/dashboard/settings"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">&copy; 2025 Restro</p>
      </div>
    </div>
  );
};

export default Sidebar;