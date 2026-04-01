'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import Link from 'next/link';
import { Mail, ArrowLeft, CloudCog } from 'lucide-react';
import { useResetPasswordMutation } from '@/redux/api/auth';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [resetPassword, { isLoading: resetPasswordLoader, isError }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await resetPassword({
        email: data?.email,
      }).unwrap();
      if (!response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }
      toast.success('Successed!');
      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error('Forgot password:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Unable to send reset link!');
      }
    }
    toast.dismiss(toastId);
    reset();
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-sky-800">
              Check Your Email
            </h1>
            <p className="mb-8 text-sky-600">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
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

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <Link href={'/signin'} className="absolute left-8 top-8">
        <div className="flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2 font-semibold shadow-md">
          <ArrowLeft />
          Back
        </div>
      </Link>
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="px-8 pb-6 pt-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Forgot Password?
          </h1>
          <p className="text-gray-600">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
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
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-5 w-5 text-gray-400" />
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
                  className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${
                    errors.email
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={resetPasswordLoader}
              className="duration-400 w-full rounded-[8px] bg-blue-400 px-4 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </button>

            {/* Back to Login */}
            <div className="border-t border-sky-100 pt-4 text-center">
              <Link
                href="/signin"
                className="inline-flex items-center space-x-2 text-sky-600 transition-colors hover:text-sky-800"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Sign In</span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
