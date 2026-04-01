'use client';
import { useVerifyTokenMutation } from '@/redux/api/auth';
import { User, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

function Verify({}: Props) {
  const { token } = useParams();
  const [verifyToken, { isLoading, isError, isSuccess }] =
    useVerifyTokenMutation();
  useEffect(() => {
    if (token) {
      console.log('token', token);
      verifyToken({
        token: token[0],
      });
    }
  }, [token]);
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isSuccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
              <X className="h-8 w-8 text-red-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-red-500">
              Invaild Token!!
            </h1>
            <p className="mb-8 text-sky-600">
              This token may be invalid or expired, check again.
            </p>
            <Link href="/signin">
              <button className="w-full transform rounded-lg bg-sky-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-sky-700 hover:shadow-xl">
                Back to Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        <div className="px-8 py-12 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
            {/* <Mail className="h-8 w-8 text-green-600" /> */}
            <User className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="mb-4 text-2xl font-bold text-sky-800">
            User is verified now!
          </h1>
          <p className="mb-8 text-sky-600">
            Your account is verified now, You can signin to your account with
            associated email and password.
          </p>
          <Link href="/sigin">
            <button className="w-full transform rounded-lg bg-sky-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-sky-700 hover:shadow-xl">
              Back to Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Verify;
