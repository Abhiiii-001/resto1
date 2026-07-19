'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Mail, ArrowLeft, ChefHat } from 'lucide-react';
import { useResetPasswordMutation } from '@/redux/api/auth';
import { Button } from '@/components/ui/button';

interface ForgotPasswordFormData {
  email: string;
}

export default function ForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [resetPassword, { isLoading: resetPasswordLoader }] =
    useResetPasswordMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ForgotPasswordFormData>();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    const toastId = toast.loading('Sending reset link...');
    try {
      const response = await resetPassword({
        email: data?.email,
      }).unwrap();

      if (response?.success) {
        toast.success('Reset link sent to your email!');
        setIsSubmitted(true);
      } else {
        throw new Error(response?.message || 'Something went wrong!');
      }
    } catch (err) {
      toast.error('Unable to send reset link!');
    } finally {
      toast.dismiss(toastId);
      reset();
    }
  };

  if (isSubmitted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
        <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
          <div className="px-8 py-12 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="mb-4 text-2xl font-bold text-foreground">
              Check Your Email
            </h1>
            <p className="mb-8 text-sm text-muted-foreground">
              We've sent a password reset link to your email address. Please
              check your inbox and follow the instructions to reset your
              password.
            </p>
            <Link href="/signin" className="block w-full">
              <Button className="w-full py-6">Back to Sign In</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50/50 p-4">
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 px-8 pt-8 pb-6 text-center">
          <div className="mb-2 flex items-center justify-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Restro
            </span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">
            Forgot Password?
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your email address and we'll send you a link to reset your
            password.
          </p>
        </div>

        {/* Form */}
        <div className="px-8 pb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email Address
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
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={resetPasswordLoader}
              className="w-full py-6 text-base font-semibold"
            >
              {resetPasswordLoader ? 'Sending Link...' : 'Send Reset Link'}
            </Button>

            {/* Back to Login */}
            <div className="pt-2 text-center">
              <Link
                href="/signin"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline underline-offset-4"
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
