"use client"
import { useRouteLoader } from "@/utils/useRouteLoader";
import { Suspense } from "react";

const RestaurantLayout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useRouteLoader();
  console.log("isLoading",isLoading);
  return (
    <div className="min-h-screen flex">
      <main className={`w-full`}>
        {isLoading && (
          <div className="fixed top-20 left-0 w-full h-4 bg-rGreen transition-all duration-500" />
        )}
          
          {children}
      </main>
    </div>
  );
};

export default RestaurantLayout
