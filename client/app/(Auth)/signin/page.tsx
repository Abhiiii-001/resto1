'use client';
import { LoginInterface, useLoginMutation } from '@/redux/api/auth';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/states/authSlice';
import Loader from '@/components/common/Loader';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Eye, EyeOff, Lock, Mail } from 'lucide-react';


const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [showPassword,setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } ,reset} = useForm<LoginInterface>();
 
  const [login,{isLoading,error}] = useLoginMutation();

  const onSubmit = async(data: LoginInterface) => {
    // console.log(data);
    const toastId = toast.loading("Loading...")
    try {
      const response = await login(data).unwrap();

      if(!response || !response?.success){
        throw new Error(response?.message || "Something went wrong!")
      }

      dispatch(setCredentials(response)); // Save user & token in Redux

      console.log(response);
      toast.success("Login Success!")
      router.push('/dashboard')
    } catch (err:any) {
      console.error("Login failed:", err.data.message);
      // if(err instanceof Error) {
      //   toast.error(err.message)
      // }
      // else {
        toast.error(err.data.message)
      // }
    }
    // reset();
    toast.dismiss(toastId)
  };
  // if(isLoading){
  //   return <Loader/>
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <Link href = {'/'} className='absolute top-8 left-8'>
        <div className='flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl font-semibold shadow-md'>
          <ArrowLeft/>
        Back
        </div>
      </Link>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
            <h2 className="text-gray-950 text-3xl font-bold leading-7 font-serif w-full text-center">
            Welcome Back <span className="text-4xl text-blue-400 ">!!</span>
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
                <sup className='text-red-500 pl-1'>*</sup>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email address",
                    },
                  })}
                  type="email"
                  id="email"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent transition-all duration-200 ${
                    errors.email ? "border-red-300 bg-red-50" : "border-black-200 bg-white hover:border-black-300"
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-black-700">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-blue-400" />
                </div>
                <input
                  {...register("password", {
                    required: "Password is required",
                    
                  })}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-black-500 focus:border-transparent transition-all duration-200 ${
                    errors.password ? "border-red-300 bg-red-50" : "border-black-200 bg-white hover:border-black-300"
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-blue-400 hover:text-blue-500 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-sm text-black-600 hover:text-black-800 hover:underline transition-colors italic"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-[8px] transition-all duration-200 transform  disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-t border-black-100">
              <span className="text-black-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-black-700 font-medium hover:text-black-900 hover:underline transition-colors"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
