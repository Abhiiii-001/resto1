"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyPaymentMutation } from "@/redux/api/subscription";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function VerifyPaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();
  const [status, setStatus] = useState<"verifying" | "success" | "failed">("verifying");

  const txnId = searchParams.get("txnId");
  const planId = searchParams.get("planId");

  useEffect(() => {
    const handleVerification = async () => {
      if (!txnId || !planId) {
        toast.error("Invalid verification parameters");
        setStatus("failed");
        return;
      }

      try {
        const res = await verifyPayment({ transactionId: txnId, planId }).unwrap();
        if (res.success) {
          setStatus("success");
          toast.success("Subscription activated successfully!");
          setTimeout(() => {
            router.push("/dashboard/subscription");
          }, 3000);
        } else {
          setStatus("failed");
        }
      } catch (error: any) {
        console.error("Verification Error:", error);
        setStatus("failed");
        toast.error(error?.data?.message || "Payment verification failed");
      }
    };

    handleVerification();
  }, [txnId, planId, verifyPayment, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
      {status === "verifying" && (
        <div className="text-center space-y-6">
          <Loader2 className="w-16 h-16 animate-spin text-blue-500 mx-auto" />
          <h2 className="text-2xl font-bold">Verifying your payment...</h2>
          <p className="text-zinc-500">Please do not close this window or press back.</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center space-y-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto" />
          <h2 className="text-3xl font-black">Payment Successful!</h2>
          <p className="text-zinc-400">Your subscription has been activated. Redirecting you to the dashboard...</p>
        </div>
      )}

      {status === "failed" && (
        <div className="text-center space-y-6 animate-in zoom-in duration-500">
          <XCircle className="w-20 h-20 text-red-500 mx-auto" />
          <h2 className="text-3xl font-black">Verification Failed</h2>
          <p className="text-zinc-400">We couldn&apos;t verify your payment. If the amount was deducted, it will be refunded or updated soon.</p>
          <button 
            onClick={() => router.push("/dashboard/subscription")}
            className="px-8 py-3 rounded-xl bg-white text-black font-bold"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
}
