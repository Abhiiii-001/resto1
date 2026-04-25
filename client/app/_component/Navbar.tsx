'use client';
import {
  BellIcon,
  ChefHat,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  ChevronDown,
} from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
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
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

function Navbar() {
  const dispatch = useAppDispatch();
  const pathname = usePathname();

  const { isSidebarCollapsed } = useAppSelector((state) => state.global);
  const { user, token, isAuthenticated, restaurantId, canManage } = useAppSelector(
    (state) => state.auth,
  );

  const { data: RestaurantDetails } = useGetRestaurantDetailsQuery(
    restaurantId && token ? restaurantId : skipToken,
  );

  const canToggleStoreStatus = user?.role === USER_ROLE_TYPE.RESTAURANT || canManage;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(
    RestaurantDetails?.data?.isOpen || false,
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (RestaurantDetails?.data !== undefined) {
      setIsOpen(RestaurantDetails.data.isOpen);
    }
  }, [RestaurantDetails]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [logout, { isLoading: logoutLoader }] = useLogoutMutation();
  const [updateRestaurantStatus, { isLoading: updateRestaurantStatusLoader }] =
    useUpdateRestuarantDetailsMutation();

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const logoutHandler = async () => {
    try {
      await logout(token || '')
        .unwrap()
        .then(() => {
          dispatch(setLogout());
          toast.success('Logged out successfully!');
          getPersistor()?.purge();
        });
    } catch (error) {
      toast.error('Something went wrong');
    }
    setIsDropdownOpen(false);
  };

  const shopOpenCloseHandler = async () => {
    const toastId = toast.loading('Updating...');
    try {
      const response = await updateRestaurantStatus({
        restaurantId,
        isOpen: !isOpen,
      }).unwrap();
      if (!response) {
        throw new Error('Something went wrong!');
      }
      setIsOpen(!isOpen);
      toast.success('Store status updated!');
    } catch (error) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error('Something went wrong!');
    }
    toast.dismiss(toastId);
  };

  const avatarUrl = user?.thumbnail
    ? user.thumbnail
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.name || 'User')}&background=f97316&color=fff&size=80`;

  const isDashboard = pathname.includes('/dashboard');

  return (
    <nav
      className={`fixed z-50 flex h-16 w-full flex-row items-center justify-between border-b border-border bg-white ${isDashboard ? 'px-4' : 'px-8'} shadow-sm transition-all duration-300`}
    >
      {/* LEFT — Logo + sidebar toggle */}
      <div className="flex flex-row items-center gap-4">
        {isDashboard && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}
          >
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <Link href="/" className="flex items-center gap-2">
          <ChefHat className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold tracking-tight text-foreground">Restro</span>
        </Link>
      </div>

      {/* CENTER — Nav links (public pages only) */}
      {!isDashboard && (
        <div className="hidden items-center gap-8 md:flex">
          {['/', '/about', '/contact'].map((href, i) => {
            const labels = ['Home', 'About', 'Contact'];
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'text-sm font-semibold transition-colors hover:text-primary',
                  pathname === href ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {labels[i]}
              </Link>
            );
          })}
        </div>
      )}

      {/* RIGHT */}
      {mounted && (
        isAuthenticated ? (
          <div className="flex h-full items-center gap-3 py-2">
            {/* Open / Close Sign Board */}
            {canToggleStoreStatus && 
            <button
              onClick={shopOpenCloseHandler}
              title={isOpen ? 'Click to close store' : 'Click to open store'}
              className="relative flex items-center"
            >
              <Image
                src={isOpen ? '/openSignBoard1.png' : '/closeSignBoard1.png'}
                alt={isOpen ? 'open-sign' : 'close-sign'}
                width={65}
                height={48}
                className="cursor-pointer transition-transform duration-200 hover:scale-105"
              />
            </button>}

            {/* Bell */}
            <Button variant="ghost" size="icon" className="relative h-9 w-9 text-muted-foreground hover:text-foreground">
              <BellIcon className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-white" />
            </Button>

            {/* Divider */}
            <div className="h-6 w-px bg-border" />

            {/* User Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition-colors hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full border border-border">
                  <img src={avatarUrl} alt={user?.name || 'User'} className="h-full w-full object-cover" />
                </div>
                <div className="hidden flex-col items-start sm:flex">
                  <span className="text-sm font-semibold leading-tight text-foreground">{user?.name || 'User'}</span>
                  <span className="text-[11px] leading-tight text-muted-foreground">{user?.role || 'Restaurant'}</span>
                </div>
                <ChevronDown
                  className={cn(
                    'hidden h-4 w-4 text-muted-foreground transition-transform duration-200 sm:block',
                    isDropdownOpen && 'rotate-180',
                  )}
                />
              </button>

              {/* Dropdown Panel */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-[calc(100%+8px)] w-64 rounded-xl border border-border bg-white shadow-lg">
                  {/* Profile info */}
                  <div className="flex items-center gap-3 border-b border-border px-4 py-4">
                    <div className="h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                      <img src={avatarUrl} alt={user?.name || 'User'} className="h-full w-full object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground">{user?.name || 'User'}</p>
                      <p className="truncate text-xs text-muted-foreground">{user?.email || ''}</p>
                      <span className="mt-1 inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                        {user?.role || 'Restaurant'}
                      </span>
                    </div>
                  </div>

                  {/* Menu items */}
                  <div className="p-2">
                    <Link
                      href="/dashboard"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Dashboard
                    </Link>
                    <Link
                      href="/dashboard/settings"
                      onClick={() => setIsDropdownOpen(false)}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-primary/5 hover:text-primary"
                    >
                      <Settings className="h-4 w-4" />
                      Account Settings
                    </Link>
                  </div>

                  {/* Logout */}
                  <div className="border-t border-border p-2">
                    <button
                      onClick={logoutHandler}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Not authenticated — Login/Signup */
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <Button variant="outline">Login</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        )
      )}

    </nav>
  );
}

export default Navbar;
