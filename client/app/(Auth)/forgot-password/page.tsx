"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import Link from "next/link";
import { Mail, ArrowLeft, CloudCog } from "lucide-react";
import { useResetPasswordMutation } from "@/redux/api/auth";

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [ resetPassword, {isLoading:resetPasswordLoader,isError}] = useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
     const toastId = toast.loading("Loading...");
     try {
        const response = await resetPassword({
          email: data?.email
        }).unwrap();
        if(!response?.success){
          throw new Error(response?.message || "Something went wrong!");
        }
        toast.success("Successed!")
        setIsSubmitted(true);
     } catch (err:unknown) {
               console.error("Forgot password:", err);
               if(err instanceof Error) {
                 toast.error(err.message)
               }
               else {
                 toast.error("Unable to send reset link!")
               }
      }
     toast.dismiss(toastId);
     reset();
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-sky-800 mb-4">
              Check Your Email
            </h1>
            <p className="text-sky-600 mb-8">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
            <Link href="/sigin">
              <button className="w-full bg-sky-600 hover:bg-sky-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl">
                Back to Sign In
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex items-center justify-center p-4">
      <Link href={"/signin"} className="absolute top-8 left-8">
        <div className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-xl font-semibold shadow-md">
          <ArrowLeft />
          Back
        </div>
      </Link>
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
        {/* Header */}
        <div className="px-8 pt-8 pb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
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
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
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
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 bg-red-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={resetPasswordLoader}
              className="w-full bg-blue-400  disabled:bg-blue-300 text-white font-medium py-3 px-4 rounded-[8px] transition-all duration-400 disabled:scale-100 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            {/* Back to Login */}
            <div className="text-center pt-4 border-t border-sky-100">
              <Link
                href="/signin"
                className="inline-flex items-center space-x-2 text-sky-600 hover:text-sky-800 transition-colors"
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
