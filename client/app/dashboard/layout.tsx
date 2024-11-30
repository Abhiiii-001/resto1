"use client"
import Sidebar from "./_component/Sidebar";
import StoreProvider, { useAppSelector } from "@/redux/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed
    );
    return (
      <div
        className="min-h-screen flex"
      >
        <div className={`${isSidebarCollapsed ? "w-10 md:w-18" : "w-72"} sticky min-h-screen overflow-y-hidden`}>
          <Sidebar />
        </div>
        <main className={`w-full bg-[#E7E9E2] ${isSidebarCollapsed ? "pl-10 md:pl-20" : "pl-4 md:pl-12"} `}>
          {children}
        </main>
      </div>
    );
  };
  
 const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <DashboardLayout>{children}</DashboardLayout>
    );
  };

  export default DashboardWrapper;