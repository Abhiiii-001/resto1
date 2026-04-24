import { UserSignupInterface } from '@/app/Interfaces/Auth';
import Loader from '@/components/common/Loader';
import { UserSignupPayload, useUserSignupMutation } from '@/redux/api/auth';
import {
  useGetAllRestaurantIdQuery,
} from '@/redux/api/restaurant';
import { Phone, Store, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  prevFormData: {
    email: string;
    password: string;
  };
};

function UserForm({ prevFormData }: Props) {
  const router = useRouter();

  const { data: restaurants, isLoading, isSuccess } = useGetAllRestaurantIdQuery();
  const [signup, { isLoading: userSignupLoader, isSuccess: isSucc }] =
    useUserSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UserSignupInterface>();

  const onSubmitHandler = async (data: UserSignupInterface) => {
    const toastId = toast.loading('Loading...');
    try {
      data.email = prevFormData.email;
      data.password = prevFormData.password;
      const res = await signup(data as unknown as UserSignupPayload).unwrap();
      //console.log('User signup res', res);
      if (!res || !res?.success) {
        throw new Error(res?.message || 'Something went wrong!');
      }
      toast.success(
        'User signup successfully, Waiting for Admin verification!',
      );
      router.push('/signin');
    } catch (err: any) {
      console.error('Signup failed:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error(err?.data?.message || 'Signup Failed!');
      }
    }
    reset();
    toast.dismiss(toastId);
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="space-y-1.5">
        <label
          htmlFor="name"
          className="text-sm font-medium text-foreground"
        >
          Name
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <User className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            {...register('name', {
              required: 'Name is required',
            })}
            type="text"
            id="name"
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.name
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
            }`}
            placeholder="Enter your name"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="number"
          className="text-sm font-medium text-foreground"
        >
          Number
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Phone className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            {...register('number', {
              required: 'Number is required',
            })}
            type="number"
            id="number"
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.number
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
            }`}
            placeholder="Enter your number"
          />
        </div>
        {errors.number && (
          <p className="text-xs text-destructive">{errors.number.message}</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label
          htmlFor="restaurantId"
          className="text-sm font-medium text-foreground"
        >
          Select Restaurant
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Store className="h-4 w-4 text-muted-foreground" />
          </div>
          <select
            {...register('restaurantId', {
              required: 'Restaurant is required',
            })}
            id="restaurantId"
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 appearance-none bg-white ${
              errors.restaurantId
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
            }`}
            defaultValue=""
          >
            <option value="" disabled hidden>
              Select your restaurant
            </option>
            {isSuccess &&
              restaurants?.map((res: any) => {
                return (
                  <option value={res.id} key={res.id}>
                    {res.resCode} - {res.name}
                  </option>
                );
              })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.restaurantId && (
          <p className="text-xs text-destructive">{errors.restaurantId.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={userSignupLoader}
        className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {userSignupLoader ? (
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
            <span>Submitting...</span>
          </div>
        ) : (
          'Submit'
        )}
      </button>
    </form>
  );
}

export default UserForm;
