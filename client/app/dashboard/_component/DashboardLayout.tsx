'use client';
import { useAppSelector } from '@/redux/redux';
import { ProtectedRoute } from './ProtectedRoute';
import Sidebar from './Sidebar';

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div
          className={`${
            isSidebarCollapsed ? 'w-10 lg:w-16' : 'w-72 lg:w-64'
          } fixed top-0 h-screen flex-shrink-0 overflow-y-auto`}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <main
          className={`flex-1 bg-[#E7E9E2] ${
            isSidebarCollapsed ? 'pl-10 lg:pl-16' : 'pl-10 lg:pl-64'
          } overflow-hidden pt-16`}
        >
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
};
