import { useRestaurantSignupMutation } from '@/redux/api/auth';
import { ArrowRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
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
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-5">
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
                value: signupData?.email || '',
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
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-foreground"
          >
            Password
            <sup className="ml-0.5 text-destructive">*</sup>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
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
              className={`w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.password
                  ? 'border-destructive bg-destructive/5'
                  : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
              }`}
              placeholder="Create a password"
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

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-[10px] uppercase tracking-wider font-bold">
                <span className="text-muted-foreground">Strength</span>
                <span
                  className={`${
                    passwordStrength.strength < 50
                      ? 'text-destructive'
                      : passwordStrength.strength < 75
                        ? 'text-yellow-600'
                        : 'text-green-600'
                  }`}
                >
                  {passwordStrength.text}
                </span>
              </div>
              <div className="h-1 w-full rounded-full bg-border overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${passwordStrength.strength}%` }}
                ></div>
              </div>
            </div>
          )}

          {errors.password && (
            <p className="text-xs text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label
            htmlFor="confirmPassword"
            className="text-sm font-medium text-foreground"
          >
            Confirm Password
            <sup className="ml-0.5 text-destructive">*</sup>
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <Lock className="h-4 w-4 text-muted-foreground" />
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
              className={`w-full rounded-lg border py-2.5 pl-10 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
                errors.confirmPassword
                  ? 'border-destructive bg-destructive/5'
                  : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
              }`}
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLoading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
              <span>Next</span>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-1">
              Next
              <ArrowRight className="h-4 w-4" />
            </div>
          )}
        </button>

        {/* Sign In Link */}
        <div className="pt-2 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href="/signin"
            className="font-semibold text-primary hover:underline"
          >
            Sign in
          </Link>
        </div>
      </form>
    </div>
  );
}

export default SignupForm1;
