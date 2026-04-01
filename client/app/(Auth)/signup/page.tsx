'use client';
import React, { useState } from 'react';
import SignupForm1 from '../_components/SignupForm1';
import SignupForm2 from '../_components/SignupForm2';
import { ArrowLeft, Check } from 'lucide-react';
import Link from 'next/link';

function Signup() {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
  }>();
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <Link href={'/'} className="absolute left-8 top-8">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold shadow-md">
          <ArrowLeft />
          Back
        </div>
      </Link>
      <div className="w-full max-w-[500px] overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="flex flex-col items-start justify-center gap-2 px-8 py-6">
          <h2 className="w-full text-center font-serif text-3xl font-bold leading-7 text-gray-950">
            Welcome to <span className="text-4xl text-blue-400">Restro!</span>
          </h2>
          <p className="w-full text-center text-[16px] font-semibold text-gray-600 opacity-80">
            Grow your offline bussiness with online utilites
          </p>

          <div className="mt-4 flex w-full items-center justify-center">
            <div
              className={`flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-blue-400 bg-blue-400 text-lg text-white ${
                step === 1 ? '' : 'scale-90'
              }`}
              onClick={() => setStep(1)}
            >
              {step === 1 ? '1' : <Check />}
            </div>
            <div
              className={`h-[1px] w-20 border-2 border-dashed ${
                step === 2 ? 'border-sky-600' : 'border-gray-600'
              }`}
            ></div>
            <div
              className={`flex aspect-square h-12 w-12 cursor-pointer items-center justify-center rounded-full border text-lg ${
                step === 2 ? 'border-blue-400 bg-blue-400 text-white' : ''
              }`}
            >
              2
            </div>
          </div>
        </div>
        {step === 1 ? (
          <SignupForm1
            signupData={signupData}
            setSignupData={setSignupData}
            setStep={setStep}
          />
        ) : (
          <SignupForm2 signupData={signupData} setStep={setStep} />
        )}
      </div>
    </div>
  );
}

export default Signup;
