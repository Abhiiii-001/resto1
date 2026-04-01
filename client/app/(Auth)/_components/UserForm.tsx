import { UserSignupInterface } from '@/app/Interfaces/Auth';
import Loader from '@/components/common/Loader';
import { useUserSignupMutation } from '@/redux/api/auth';
import {
  RestaurantIdInterface,
  useGetAllRestaurantIdQuery,
} from '@/redux/api/restaurant';
import { Mail, Phone, Store, User } from 'lucide-react';
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

  const { data, isLoading, isSuccess } = useGetAllRestaurantIdQuery(null);
  const [signup, { isLoading: userSignupLoader, isSuccess: isSucc }] =
    useUserSignupMutation();
  let restaurants: any = [];
  if (isSuccess) {
    restaurants = data?.restaurant;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<UserSignupInterface>();

  const onSubmitHandler = async (data: UserSignupInterface) => {
    const toastId = toast.loading('Loading...');
    try {
      data.email = prevFormData.email;
      data.password = prevFormData.password;
      const res = await signup(data).unwrap();
      console.log('User signup res', res);
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
    <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="space-y-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Name
          <sup className="pl-1 text-red-500">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <User className="h-5 w-5 text-sky-400" />
          </div>
          <input
            {...register('name', {
              required: 'Name is required',
            })}
            type="name"
            id="name"
            className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${
              errors.name
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            placeholder="Enter your name"
          />
        </div>
        {errors.name && (
          <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
            <span>⚠️</span>
            <span>{errors.name.message}</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="number"
          className="block text-sm font-medium text-gray-700"
        >
          Number
          <sup className="pl-1 text-red-500">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Phone className="h-5 w-5 text-sky-400" />
          </div>
          <input
            {...register('number', {
              required: 'Number is required',
            })}
            type="number"
            id="number"
            className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-gray-500 ${
              errors.number
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
            placeholder="Enter your number"
          />
        </div>
        {errors.number && (
          <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
            <span>⚠️</span>
            <span>{errors.number.message}</span>
          </div>
        )}
      </div>
      <div className="mb-4 space-y-2">
        <label
          htmlFor="restaurantId"
          className="block text-sm font-medium text-gray-700"
        >
          Select Restaurant ID
          <sup className="pl-1 text-red-500">*</sup>
        </label>

        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Store className="h-5 w-5 text-sky-400" />
          </div>
          <select
            {...register('restaurantId', {
              required: 'Restaurant Id is required',
            })}
            id="restaurantId"
            className={`w-full rounded-lg border py-3 pl-10 pr-4 transition-all duration-200 focus:border-transparent focus:ring-2 focus:ring-blue-500 ${
              errors.restaurantId
                ? 'border-red-300 bg-red-50'
                : 'border-gray-200 bg-white hover:border-gray-300'
            }`}
          >
            <option
              value={''}
              disabled
              selected
              hidden
              className="text-sm text-gray-200"
            >
              Select your restaurant
            </option>
            {isSuccess &&
              restaurants?.map((res: any) => {
                return (
                  <option value={res.id} key={res.id}>
                    {res.resCode}-{res.name}
                  </option>
                );
              })}
          </select>
        </div>
        {errors.restaurantId && (
          <div className="flex items-center space-x-2 rounded-md bg-red-50 p-2 text-sm text-red-600">
            <span>⚠️</span>
            <span>{errors.restaurantId.message}</span>
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={userSignupLoader}
        className="mt-4 w-full rounded-lg bg-blue-400 px-4 py-3 text-center text-lg font-semibold text-gray-50 transition-all duration-200 hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        Submit
      </button>
    </form>
  );
}

export default UserForm;
