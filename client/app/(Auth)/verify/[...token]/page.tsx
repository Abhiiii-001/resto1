'use client';
import { useVerifyTokenMutation } from '@/redux/api/auth';
import { X, CheckCircle2, ChefHat } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';

function Verify() {
  const { token } = useParams();
  const [verifyToken, { isLoading, isError, isSuccess }] =
    useVerifyTokenMutation();

  useEffect(() => {
    if (token) {
      verifyToken({
        token: token[0],
      });
    }
  }, [token, verifyToken]);

  if (isLoading) {
    return <Loader />;
  }

  if (!isSuccess && !isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <X className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Verification Failed
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              The verification link is invalid or has expired. Please try
              signing up again or contact support.
            </p>
            <Link href="/signin" className="block w-full">
              <Button variant="outline" className="w-full py-6">
                Back to Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 px-8 pt-8 pb-4 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Restroo
            </span>
          </div>
        </div>

        <div className="px-8 py-8 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircle2 className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-foreground">
            Email Verified!
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Your account has been successfully verified. You can now sign in to
            your dashboard.
          </p>
          <Link href="/signin" className="block w-full">
            <Button className="w-full py-6 text-base font-semibold">
              Sign In Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Verify;
