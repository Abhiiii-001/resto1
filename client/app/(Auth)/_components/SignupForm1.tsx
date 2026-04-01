import { RestaturantSignupInterface } from '@/app/Interfaces/Auth';
import FileUploader from '@/components/common/FileUploader';
import Loader from '@/components/common/Loader';
import { useRestaurantSignupMutation } from '@/redux/api/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {};

interface Step1FormInterface {
  email: string;
  password: string;
  confirmPassword: string;
}

function SignupForm1({ setSignupData, setStep, signupData }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<Step1FormInterface>();

  const router = useRouter();
  const [signup, { isLoading }] = useRestaurantSignupMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmitHandler = async (data: Step1FormInterface) => {
    if (data.password !== data.confirmPassword) {
      toast.error('Password should be same');
      return;
    }
    setSignupData({
      email: data.email,
      password: data.password,
    });
    setStep(2);
  };

  const password = watch(
    'password',
    signupData?.password ? signupData.password : '',
  );

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

  return (
    <div className="px-8 pb-8">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-6">
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
              <Mail className="h-5 w-5 text-sky-400" />
            </div>
            <input
              {...register('email', {
                required: 'Email is required',
                value: signupData?.email || '',
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

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-5 w-5 text-sky-400" />
            </div>
            <input
              {...register('password', {
                required: 'Password is required',
                value: signupData?.password || '',
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
              placeholder="Create a password"
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
                value: signupData?.password || '',
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

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-[8px] bg-blue-400 px-4 py-3 font-medium text-white shadow-lg transition-all duration-200 hover:bg-blue-500 hover:shadow-xl disabled:scale-100 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Next</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              Next
              <ArrowRight width={20} height={20} />
            </div>
          )}
        </button>

        {/* Sign In Link */}
        <div className="border-t border-sky-100 pt-4 text-center">
          <span className="text-sky-600">Already have an account? </span>
          <Link
            href="/signin"
            className="font-medium text-sky-700 transition-colors hover:text-sky-900 hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm1;
