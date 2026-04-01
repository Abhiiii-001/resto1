'use client';
import {
  BellIcon,
  ChefHat,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
} from 'lucide-react';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getPersistor, useAppDispatch, useAppSelector } from '@/redux/redux';
import { setIsSidebarCollapsed } from '@/redux/states/globalSlice';
import Image from 'next/image';
import { useLogoutMutation } from '@/redux/api/auth';
import { toast } from 'react-toastify';
import { setLogout } from '@/redux/states/authSlice';
import { usePathname } from 'next/navigation';
import {
  useGetRestaurantDetailsQuery,
  useUpdateRestuarantDetailsMutation,
} from '@/redux/api/restaurant';
import Loader from '@/components/common/Loader';
import { skipToken } from '@reduxjs/toolkit/query';

type Props = {};

function Navbar({}: Props) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { isSidebarCollapsed } = useAppSelector((state) => state.global);
  const { user, token, isAuthenticated, restaurantId } = useAppSelector(
    (state) => state.auth,
  );

  const { data: RestaurantDetails } = useGetRestaurantDetailsQuery(
    restaurantId ?? skipToken,
  );

  const [isModal, setIsModal] = useState(false);
  const [isOpen, setIsOpen] = useState(
    RestaurantDetails?.data?.isOpen || false,
  );

  console.log('nav-data', RestaurantDetails);

  const [logout, { isLoading: logoutLoader }] = useLogoutMutation();
  const [updateRestaurantStatus, { isLoading: updateRestaurantStatusLoader }] =
    useUpdateRestuarantDetailsMutation();

  const logoutHandler = async () => {
    try {
      const res = await logout(token || '')
        .unwrap()
        .then(() => {
          dispatch(setLogout());
          toast.success('User logout successfully!');
          getPersistor()?.purge();
        });
    } catch (error) {
      toast.error('Something wrong');
    }
  };

  const shopOpenCloseHandler = async () => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await updateRestaurantStatus({
        restaurantId,
        isOpen: !isOpen,
      }).unwrap();
      console.log(response);
      if (!response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }

      setIsOpen(!isOpen);

      toast.success('Store status updated!');
    } catch (error) {
      console.log('Update store status error', error);
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error('Something went wrong!');
    }
    toast.dismiss(toastId);
  };

  // if (logoutLoader || updateRestaurantStatusLoader) {
  //   return <Loader />;
  // }

  return (
    <nav
      className={`fixed z-50 flex h-16 w-screen flex-row items-center justify-between border-b bg-white/80 px-5 backdrop-blur-sm ${
        !pathname.includes('/dashboard') ? 'px-52' : ''
      }`}
    >
      <div className="flex flex-row items-center gap-6">
        {/* Logo and name */}
        {pathname.includes('/dashboard') && (
          <Menu
            className={`h-6 w-6 cursor-pointer rounded-full text-primary hover:opacity-75 ${
              isSidebarCollapsed ? '-ml-2 md:ml-0' : 'ml-4'
            }`}
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          />
        )}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <Link href={'/'} className="flex items-center space-x-2">
            <ChefHat className="h-6 w-6 text-blue-500 text-primary" />
            <span className={`text-2xl font-bold`}>Restro</span>
          </Link>
        </motion.div>
      </div>

      {!pathname.includes('/dashboard') && (
        <div className="hidden items-center gap-8 font-semibold text-gray-600 md:flex">
          <Link href="/">
            <button className="transition-all duration-300 hover:text-blue-400">
              Home
            </button>
          </Link>
          <Link href="/about">
            <button className="transition-all duration-300 hover:text-blue-400">
              About
            </button>
          </Link>
          <Link href="/contact">
            <button className="transition-all duration-300 hover:text-blue-400">
              Contact
            </button>
          </Link>
        </div>
      )}

      {isAuthenticated ? (
        <div className="flex h-full items-center gap-4 py-2">
          <div onClick={shopOpenCloseHandler}>
            {isOpen ? (
              <Image
                src={'/openSignBoard1.png'}
                alt="open-sign"
                width={70}
                height={50}
                className="mr-8 cursor-pointer transition-all duration-200 hover:scale-110"
                onClick={() => setIsOpen(false)}
              />
            ) : (
              <Image
                src={'/closeSignBoard1.png'}
                alt="close-sign"
                width={65}
                height={50}
                className="mr-10 mt-3 cursor-pointer transition-all duration-200 hover:scale-110"
                onClick={() => setIsOpen(true)}
              />
            )}
          </div>
          <div className="cursor-not-allowed">
            <BellIcon color="#4b5563" />
          </div>
          <div className="h-2/3 w-[2px] bg-gray-400" />
          <div className="flex items-center gap-2">
            {/* user iamge & name */}
            <Image
              src={user?.thumbnail}
              alt="user-img"
              width={40}
              height={40}
              className="rounded-full bg-blue-400"
            />
            <div className="hidden text-lg font-semibold text-gray-700 md:block">
              {user?.name}
            </div>
          </div>
          <div className="relative">
            <Settings
              color="#4b5563"
              className="cursor-pointer"
              onClick={() => setIsModal(!isModal)}
            />
            {isModal && (
              <div className="absolute right-0 top-10 flex w-36 flex-col items-center justify-center rounded-xl bg-gray-200 shadow-xl">
                <Link
                  href={'/dashboard'}
                  className="flex cursor-pointer items-center gap-2 rounded-t-xl px-4 py-3 hover:bg-gray-300"
                  onClick={() => setIsModal(false)}
                >
                  <LayoutDashboard scale={60} />
                  <p className="font-semibold">Dashboard</p>
                </Link>
                <div
                  className="flex w-full cursor-pointer items-center gap-6 rounded-b-xl px-4 py-3 hover:bg-gray-300"
                  onClick={logoutHandler}
                >
                  <LogOut scale={60} color="#ef4444 " />
                  <p className="font-semibold">Log out</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center space-x-4">
          <Link href="/signin">
            <button className="rounded-[8px] border-2 border-blue-700 bg-blue-700 px-6 py-2 font-semibold text-white transition-all duration-200 hover:border-blue-500 hover:bg-blue-500">
              Login
            </button>
          </Link>
          <Link href="/signup">
            <button className="rounded-[8px] border-2 border-blue-700 px-6 py-2 font-semibold text-blue-700 transition-all duration-200 hover:bg-blue-700 hover:text-white">
              Signup
            </button>
          </Link>
        </div>
      )}
      {(logoutLoader || updateRestaurantStatusLoader) && <Loader />}
    </nav>
  );
}

export default Navbar;
