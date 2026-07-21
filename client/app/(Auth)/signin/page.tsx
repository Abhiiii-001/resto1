'use client';
import { LoginPayload, useLoginMutation } from '@/redux/api/auth';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCredentials } from '@/redux/states/authSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChefHat, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAppSelector } from '@/redux/redux';
import { USER_ROLE_TYPE } from '@/constants/CommonConstant';

const SignIn: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { role } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const [login, { isLoading, error }] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const toastId = toast.loading('Loading...');
    try {
      const response = await login(data).unwrap();

      if (!response || !response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }

      dispatch(setCredentials(response)); // Save user & token in Redux

      toast.success('Login Success!');
      if (role === USER_ROLE_TYPE.RESTAURANT) {
        router.push('/dashboard');
      } else {
        router.push('/dashboard/live-orders');
      }
    } catch (err: any) {
      console.error('Login failed:', err.data.message);
      toast.error(err.data.message);
    }
    toast.dismiss(toastId);
  };

  return (
    <div className="flex flex-1 items-center justify-center h-[90%] bg-gray-50/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="px-8 pb-6 pt-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Restroo
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-foreground"
              >
                Email
                <sup className="ml-0.5 text-destructive">*</sup>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
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
                  className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.email
                      ? 'border-destructive bg-destructive/5'
                      : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-foreground"
                >
                  Password
                  <sup className="ml-0.5 text-destructive">*</sup>
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={`w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                    errors.password
                      ? 'border-destructive bg-destructive/5'
                      : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-destructive">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>

            {/* Sign Up Link */}
            <div className="pt-2 text-center text-sm text-muted-foreground">
              Don't have an account?{' '}
              <Link
                href="/signup"
                className="font-semibold text-primary hover:underline"
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
