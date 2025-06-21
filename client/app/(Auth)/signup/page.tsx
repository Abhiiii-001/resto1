"use client";
import React, { useState } from "react";
import SignupForm1 from "../_components/SignupForm1";
import SignupForm2 from "../_components/SignupForm2";
import { ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

function Signup() {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
  }>();
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <Link href={"/"} className="absolute top-8 left-8">
        <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl font-semibold shadow-md">
          <ArrowLeft />
          Back
        </div>
      </Link>
      <div className="w-full max-w-[500px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className=" flex flex-col items-start justify-center gap-2 py-6 px-8">
          <h2 className="text-gray-950 text-3xl font-bold leading-7 font-serif w-full text-center">
            Welcome to <span className="text-4xl text-blue-400 ">Restro!</span>
          </h2>
          <p className="text-[16px] w-full font-semibold text-gray-600 opacity-80 text-center">
            Grow your offline bussiness with online utilites
          </p>

          <div className="flex items-center w-full justify-center mt-4">
            <div
              className={`w-12 h-12 aspect-square rounded-full border border-blue-400 flex items-center justify-center text-lg cursor-pointer text-white bg-blue-400 ${
                step === 1 ? "" : "scale-90"
              }`}
              onClick={() => setStep(1)}
            >
              {step === 1 ? "1" : <Check />}
            </div>
            <div
              className={`w-20 h-[1px] border-dashed border-2 ${
                step === 2 ? "border-sky-600" : "border-gray-600"
              }`}
            ></div>
            <div
              className={`w-12 h-12 aspect-square rounded-full border flex items-center justify-center text-lg cursor-pointer ${
                step === 2 ? "text-white bg-blue-400 border-blue-400" : ""
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
