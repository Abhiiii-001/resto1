'use client';
import { LoginInterface, useLoginMutation } from '@/redux/api/auth';
import Image from 'next/image';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import png from "../../../public/restroLoginPNG-removebg-preview.png"
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/states/authSlice';
import Loader from '@/components/common/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';


const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } ,reset} = useForm<LoginInterface>();
 
  const [login,{isLoading,error}] = useLoginMutation();

  const onSubmit = async(data: LoginInterface) => {
    // console.log(data);
    const toastId = toast.loading("Loading...")
    try {
      const response = await login(data).unwrap();
      dispatch(setCredentials(response)); // Save user & token in Redux

      console.log(response);
      toast.success("Login Success!")
      router.push('/dashboard')
    } catch (err) {
      console.error("Login failed:", err);
      toast.error("Login Failed!")
    }
    reset();
    toast.dismiss(toastId)
  };
  if(isLoading){
    return <Loader/>
  }

  return (
    <div className="flex flex-col lg:flex-row lg:h-[93vh] bg-[#E7E9E2] overflow-y-scroll">

      {/* Top Section on Mobile - Image */}
      <div 
        className="lg:hidden w-full h-48 bg-cover bg-center bg-blue-400 mb-32" 
      >
         <Image src={png} alt='png' className=' absolute top-10 scale-75' />
      </div>

      {/* Left Section on Desktop - Image */}
      <div 
        className="hidden lg:flex w-1/3 bg-cover bg-center bg-blue-400 relative" 
      >
        <Image src={png} alt='png' className=' absolute -right-52 top-40 scale-150' />
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full lg:w-full items-center justify-center p-8 px-12">
        <div className="bg-[#E7E9E2]   rounded-lg w-full max-w-md p-8 ">
          <h2 className="text-3xl font-bold font-serif text-center mb-6 text-black">Welcome To <span className='text-blue-400 !text-4xl'>Restro</span></h2>
          <p className="text-center text-gray-800 mb-6">
            Log in to your account to continue.
          </p>

          <div className="flex justify-center space-x-4 mb-6 text-center">
            <button
              type="button"
              className="flex items-center justify-center w-full max-w-xs px-4 py-2 bg-[#E7E9E2] border border-black rounded-md text-black hover:bg-white hover:text-black shadow-sm"
            >
              <span className="mr-2">🌐</span> <b>Google</b>
            </button>
          </div>

          <div className="relative mb-6">
            <hr className="border-black" />
            <span className="absolute inset-x-0 top-0 mx-auto w-max -mt-2 bg-[#E7E9E2]  px-4 text-black">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-8">
              <label htmlFor="email" className="block text-lg font-semibold text-gray-600">
                Email 
                <span className='text-pink-800 pl-1'>*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-lg font-semibold text-gray-600 ">
                Password <span className='text-pink-800 pl-1'>*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2  focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-2 bg-blue-400 text-white rounded-md shadow hover:bg-blue-500 focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <a href="#" className="text-sm text-black hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
