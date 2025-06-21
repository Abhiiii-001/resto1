"use client"
import { useVerifyTokenMutation } from '@/redux/api/auth';
import { User, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'

type Props = {}

function Verify({}: Props) {
  const { token } = useParams();
  const [verifyToken , {isLoading , isError,isSuccess}] = useVerifyTokenMutation();
  useEffect(() => {
    if(token){
        console.log("token",token);
        verifyToken({
          token: token[0]
        });
    }
  },[token])
  if(isLoading){
     return <div>Loading...</div>
  }

  if(!isSuccess) {
    return  <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
              <X  className="h-8 w-8 text-red-600"/>
            </div>
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Invaild Token!!
            </h1>
            <p className="text-sky-600 mb-8">
              This token may be invalid or expired, check again.
            </p>
            <Link href="/signin">
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Back to Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              {/* <Mail className="h-8 w-8 text-green-600" /> */}
              <User className="h-8 w-8 text-green-600"/>
            </div>
            <h1 className="text-2xl font-bold text-sky-800 mb-4">
              User is verified now!
            </h1>
            <p className="text-sky-600 mb-8">
              Your account is verified now, You can signin to your account with associated email and password.
            </p>
            <Link href="/sigin">
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Back to Sign In
              </button>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Verify