'use client';
import ErrorComp from '@/components/common/ErrorComp';
import Loader from '@/components/common/Loader';
import {
  useResetPasswordMakerMutation,
  useVerifyTokenMutation,
} from '@/redux/api/auth';
import { Eye, EyeOff, Lock, User, X } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface ResetPasswordInterface {
  password: string;
  confirmPassword: string;
}

function CreatePassword() {
  const { token } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordInterface>();
  const password = watch('password', '');

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [resetPassword, { isLoading, isError }] =
    useResetPasswordMakerMutation();
  const [
    verifyToken,
    { isLoading: verifyTokenLoader, isError: verifyTokenError, isSuccess },
  ] = useVerifyTokenMutation();

  useEffect(() => {
    if (token) {
      console.log('token', token);
      verifyToken({
        token: token[0],
      });
    }
  }, [token]);
  if (isLoading || verifyTokenLoader) {
    return <Loader />;
  }

  const onSubmit = async (data: ResetPasswordInterface) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await resetPassword({
        password: data?.password,
        verificationToken: token,
      }).unwrap();
      if (!response || !response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }
      toast.success('Successed!');
    } catch (err: unknown) {
      console.error('Password reset failed:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Password Reset Failed!');
      }
    }
    toast.dismiss(toastId);
    reset();
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: '' };
    if (password.length < 6)
      return { strength: 25, text: 'Weak', color: 'bg-red-500' };
    if (password.length < 8)
      return { strength: 50, text: 'Fair', color: 'bg-yellow-500' };
    if (password.length < 12)
      return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

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

  if (isError || verifyTokenError) {
    return <ErrorComp />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-sky-50 to-blue-100 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-white/20 bg-white/95 shadow-2xl backdrop-blur-sm">
        {/* Header */}
        <div className="px-8 pb-6 pt-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Reset Password
          </h1>
          <p className="text-gray-600">
            Create a new strong password, for authentication.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${
                    errors.password
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  placeholder="Create a new password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sky-400 transition-colors hover:text-sky-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-600">Password strength</span>
                    <span
                      className={`font-medium ${
                        passwordStrength.strength < 50
                          ? 'text-red-600'
                          : passwordStrength.strength < 75
                            ? 'text-yellow-600'
                            : 'text-green-600'
                      }`}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.color}`}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {errors.password && (
                <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  <span>⚠️</span>
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className={`w-full rounded-lg border py-3 pl-10 pr-12 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${
                    errors.confirmPassword
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200 bg-white hover:border-gray-300'
                  }`}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-sky-400 transition-colors hover:text-sky-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
                  <span>⚠️</span>
                  <span>{errors.confirmPassword.message}</span>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="duration-400 w-full rounded-[8px] bg-blue-400 px-4 py-3 font-medium text-white shadow-lg transition-all hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-blue-300"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
