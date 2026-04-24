'use client';

import ErrorComp from '@/components/common/ErrorComp';
import Loader from '@/components/common/Loader';
import {
  useResetPasswordMakerMutation,
  useVerifyTokenMutation,
} from '@/redux/api/auth';
import { Eye, EyeOff, Lock, X, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface ResetPasswordInterface {
  password: string;
  confirmPassword: string;
}

function CreatePassword() {
  const { token } = useParams();
  const [isSuccessReset, setIsSuccessReset] = useState(false);

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
      verifyToken({
        token: token[0],
      });
    }
  }, [token]);

  if (isLoading || verifyTokenLoader) {
    return <Loader />;
  }

  const onSubmit = async (data: ResetPasswordInterface) => {
    const toastId = toast.loading('Resetting password...');
    try {
      const response = await resetPassword({
        password: data?.password,
        verificationToken: token?.[0] || '',
      }).unwrap();
      
      if (response?.success) {
        toast.success('Password reset successfully!');
        setIsSuccessReset(true);
      } else {
        throw new Error(response?.message || 'Something went wrong!');
      }
    } catch (err: any) {
      console.error('Password reset failed:', err);
      toast.error(err?.data?.message || err.message || 'Password Reset Failed!');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, text: '', color: 'bg-gray-200' };
    if (password.length < 6)
      return { strength: 25, text: 'Weak', color: 'bg-destructive' };
    if (password.length < 8)
      return { strength: 50, text: 'Fair', color: 'bg-amber-500' };
    if (password.length < 12)
      return { strength: 75, text: 'Good', color: 'bg-blue-500' };
    return { strength: 100, text: 'Strong', color: 'bg-green-500' };
  };

  const passwordStrength = getPasswordStrength(password);

  if (!isSuccess && !verifyTokenLoader) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <X className="h-8 w-8 text-destructive" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Invalid or Expired Link
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              This password reset link is invalid or has expired. Please request a new one.
            </p>
            <Link href="/forgot-password">
              <Button variant="outline" className="w-full py-6">
                Request New Link
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccessReset) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Password Reset Complete
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              Your password has been successfully reset. You can now sign in with your new password.
            </p>
            <Link href="/signin" className="block w-full">
              <Button className="w-full py-6">
                Sign In Now
              </Button>
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
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 px-8 pt-8 pb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="text-2xl font-bold tracking-tight text-foreground">
              🍽️ Restro
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Reset Password
          </h1>
          <p className="text-sm text-muted-foreground">
            Please enter your new password below.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                New Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
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
                  className={cn(
                    "w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                    errors.password
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-white hover:border-muted-foreground/30 focus:border-primary"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Indicator */}
              {password && (
                <div className="mt-2 space-y-1.5">
                  <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold">
                    <span className="text-muted-foreground">Strength</span>
                    <span
                      className={cn(
                        passwordStrength.strength < 50
                          ? 'text-destructive'
                          : passwordStrength.strength < 75
                            ? 'text-amber-500'
                            : 'text-green-600'
                      )}
                    >
                      {passwordStrength.text}
                    </span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={cn("h-full transition-all duration-500", passwordStrength.color)}
                      style={{ width: `${passwordStrength.strength}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {errors.password && (
                <p className="text-xs text-destructive">{errors.password.message}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value === password || 'Passwords do not match',
                  })}
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  className={cn(
                    "w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20",
                    errors.confirmPassword
                      ? "border-destructive bg-destructive/5"
                      : "border-border bg-white hover:border-muted-foreground/30 focus:border-primary"
                  )}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                >
                  {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full py-6 text-base font-semibold"
            >
              {isLoading ? 'Resetting...' : 'Reset Password'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePassword;
