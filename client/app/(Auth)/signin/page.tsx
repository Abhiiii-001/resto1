'use client';
import { LoginInterface, useLoginMutation } from '@/redux/api/auth';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
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

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginInterface>();

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: LoginInterface) => {
    // console.log(data);
    const toastId = toast.loading('Loading...');
    try {
      const response = await login(data).unwrap();

      if (!response || !response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }

      dispatch(setCredentials(response)); // Save user & token in Redux

      console.log(response);
      toast.success('Login Success!');
      router.push('/dashboard');
    } catch (err: any) {
      console.error('Login failed:', err.data.message);
      // if(err instanceof Error) {
      //   toast.error(err.message)
      // }
      // else {
      toast.error(err.data.message);
      // }
    }
    // reset();
    toast.dismiss(toastId);
  };
  // if(isLoading){
  //   return <Loader/>
  // }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="px-8 pb-6 pt-8 text-center">
          <h2 className="w-full text-center font-serif text-3xl font-bold leading-7 text-gray-950">
            Welcome Back <span className="text-4xl text-blue-700">!!</span>
          </h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
                <sup className="pl-1 text-red-500">*</sup>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-blue-700" />
                </div>
                <input
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Please enter a valid email address',
                    },
                  })}
                  type="email"
                  id="email"
                  className={`focus:ring-black-500 w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 ${
                    errors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-black-200 hover:border-black-300 bg-white'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  <span>⚠️</span>
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-black-700 block text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-blue-700" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`focus:ring-black-500 w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 ${
                    errors.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-black-200 hover:border-black-300 bg-white'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-blue-700 transition-colors hover:text-blue-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  <span>⚠️</span>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                href="/forgot-password"
                className="text-black-600 hover:text-black-800 text-sm italic transition-colors hover:underline"
              >
                Forgot your password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full transform rounded-[8px] bg-blue-700 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-500 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Sign Up Link */}
            <div className="border-black-100 border-t pt-4 text-center">
              <span className="text-black-600">Don't have an account? </span>
              <Link
                href="/signup"
                className="text-black-700 hover:text-black-900 font-medium transition-colors hover:underline"
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
