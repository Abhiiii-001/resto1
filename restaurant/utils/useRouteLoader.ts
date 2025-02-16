"use client";

import { useState, useTransition, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import NProgress from "nprogress"
import "nprogress/nprogress.css"; // Import styles

export function useRouteLoader() {
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => {
      NProgress.start();
      setLoading(true);
    };

    const handleStop = () => {
      NProgress.done();
      setLoading(false);
    };

    handleStart();
    startTransition(() => handleStop());

    return () => handleStop(); // Cleanup
  }, [pathname]);

  return isPending || loading;
}
