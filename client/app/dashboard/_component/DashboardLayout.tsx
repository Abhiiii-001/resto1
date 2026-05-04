'use client';
import { useAppDispatch, useAppSelector } from '@/redux/redux';
import { setIsSidebarCollapsed } from '@/redux/states/globalSlice';
import { ProtectedRoute } from './ProtectedRoute';
import Sidebar from './Sidebar';
import { cn } from '@/lib/utils';
import { useEffect } from 'react';
import useSocket from '@/hooks/WebShocket';
import { useGetRestaurantDetailsQuery } from '@/redux/api/restaurant';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dispatch = useAppDispatch();
  const { isSidebarCollapsed } = useAppSelector((state) => state.global);
  const { restaurantId } = useAppSelector((state) => state.auth);

  const { data: restaurantDetails } = useGetRestaurantDetailsQuery(restaurantId, { 
    skip: !restaurantId 
  });
  
  const isShopOpen = restaurantDetails?.isOpen ?? false;

  // Only connect to socket if restaurantId is available AND shop is open
  const socketUrl = process.env.NEXT_PUBLIC_API_BASE_URL?.replace('/api', '') || 'http://localhost:8000';
  useSocket(restaurantId && isShopOpen ? restaurantId : null, socketUrl);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        dispatch(setIsSidebarCollapsed(true));
      }
    };
    
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-gray-50/50">
        <div
          className={cn(
            'fixed top-16 h-[calc(100vh-64px)] transition-all duration-300 z-40',
            isSidebarCollapsed ? 'w-0 lg:w-[60px]' : 'w-64'
          )}
        >
          <Sidebar />
        </div>

        {/* Main Wrapper */}
        <div className="flex flex-col w-full">
          {/* Main Content */}
          <main
            className={cn(
              'flex-1 transition-all duration-300',
              // On desktop, add padding based on sidebar
              isSidebarCollapsed ? 'lg:pl-[60px]' : 'lg:pl-64',
              // On mobile, no padding
              'pl-0'
            )}
          >
            <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
};
