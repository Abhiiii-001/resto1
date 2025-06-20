"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import RestaurantForm from "../_components/RestaurantForm";
import UserForm from "../_components/UserForm";
import png from "@/public/signup-removebg-preview.png";
import Image from "next/image";
import SignupForm1 from "../_components/SignupForm1";
import {
  RestaturantSignupInterface,
  UserSignupInterface,
} from "@/app/Interfaces/Auth";
import SignupForm2 from "../_components/SignupForm2";

function Signup() {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
  }>();
  return (
    <div className="w-screen lg:h-screen lg:overflow-hidden flex flex-col-reverse  lg:flex-row ">
      {/* Left section */}
      <div className="w-full lg:w-3/4 h-full  lg:overflow-hidden flex items-center justify-center ">
        <div className="lg:min-w-[750px] flex flex-col items-start justify-between gap-2 py-6 px-8">
          <h2 className="text-gray-950 text-3xl font-bold leading-7 font-serif">
            Welcome to <span className="text-4xl text-blue-400 ">Restro!</span>
          </h2>
          <p className="text-[16px] font-semibold text-gray-600 opacity-80">
            Grow your offline bussiness with online utilites
          </p>

          {step === 1 ? (
            <SignupForm1 setSignupData={setSignupData} setStep={setStep} />
          ) : (
            <SignupForm2 signupData={signupData} setStep={setStep} />
          )}

        </div>
      </div>

      {/* Right section */}
      <div className="w-full lg:w-1/4 lg:h-screen h-[20vh] bg-blue-400 text-4xl text-black mb-28 relative">
        {/* <Image src={png} alt='signup-png' className='absolute -left-[50%] top-[20%] scale-125 text-red-300'/> */}
      </div>
    </div>
  );
}

export default Signup;
