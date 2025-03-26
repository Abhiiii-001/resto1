"use client";
import Sidebar from "./_component/Sidebar";
import StoreProvider, { useAppSelector } from "@/redux/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed
  );

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarCollapsed ? "w-10 md:w-16" : "w-72 md:w-64"
        } h-screen sticky top-0 flex-shrink-0 overflow-y-auto`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <main
        className={`flex-1 bg-[#E7E9E2] ${
          isSidebarCollapsed ? "pl-10 md:pl-16" : "pl-4 "
        }`}
      >
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
