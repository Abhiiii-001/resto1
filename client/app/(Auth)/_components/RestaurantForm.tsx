import FileUploader from '@/components/common/FileUploader';
import {
  RestaurantSignupPayload,
  useRestaurantSignupMutation,
} from '@/redux/api/auth';
import { MapPin, Phone, SquareMenu, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  prevFormData: {
    number: string;
    password: string;
    email: string;
  };
};

interface RestaurantFormInterface {
  name: string;
  slogan?: string;
  thumbnail: File;
  number: string;
  address: string;
}

function RestaurantForm({ prevFormData }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<RestaurantFormInterface>();

  const router = useRouter();
  const [signup, { isLoading: restaurantSignupLoader }] =
    useRestaurantSignupMutation();

  // Watch thumbnail field to display a preview
  const thumbnail = watch('thumbnail');

  const onSubmitHandler = async (data: RestaurantFormInterface) => {
    const toastId = toast.loading('Loading...');
    try {
      const form = new FormData();
      form.append('name', data.name);
      form.append('slogan', data.slogan || '');
      form.append('thumbnail', thumbnail);
      form.append('number', data.number);
      form.append('email', prevFormData.email);
      form.append('password', prevFormData.password);
      form.append('address', data.address);

      const response = await signup(
        form as unknown as RestaurantSignupPayload,
      ).unwrap();
      if (!response || !response?.success) {
        throw new Error(response?.message || 'Something went wrong!');
      }

      toast.success('Signup Success!');
      router.push('/signin');
      toast.info('Verification Email is sent to your email!');
    } catch (err: unknown) {
      console.error('Signup failed:', err);
      if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error('Signup Failed!');
      }
    }
    reset();
    toast.dismiss(toastId);
  };

  return (
    <form className="w-full space-y-4" onSubmit={handleSubmit(onSubmitHandler)}>
      {/* Name */}
      <div className="space-y-1.5">
        <label htmlFor="name" className="text-sm font-medium text-foreground">
          Restaurant Name
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
            placeholder="Enter restaurant name"
          />
        </div>
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>

      {/* Number */}
      <div className="space-y-1.5">
        <label htmlFor="number" className="text-sm font-medium text-foreground">
          Contact Number
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
            placeholder="Enter contact number"
          />
        </div>
        {errors.number && (
          <p className="text-xs text-destructive">{errors.number.message}</p>
        )}
      </div>

      {/* Slogan */}
      <div className="space-y-1.5">
        <label htmlFor="slogan" className="text-sm font-medium text-foreground">
          Slogan
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <SquareMenu className="h-4 w-4 text-muted-foreground" />
          </div>
          <input
            {...register('slogan', {
              required: 'Slogan is required',
            })}
            type="text"
            id="slogan"
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.slogan
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
            }`}
            placeholder="Enter restaurant slogan"
          />
        </div>
        {errors.slogan && (
          <p className="text-xs text-destructive">{errors.slogan.message}</p>
        )}
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label
          htmlFor="address"
          className="text-sm font-medium text-foreground"
        >
          Address
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute left-0 top-3 flex items-center pl-3">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <textarea
            {...register('address', {
              required: 'Address is required',
            })}
            id="address"
            rows={3}
            className={`w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 ${
              errors.address
                ? 'border-destructive bg-destructive/5'
                : 'border-border bg-white hover:border-muted-foreground/30 focus:border-primary'
            }`}
            placeholder="Enter restaurant address"
          />
        </div>
        {errors.address && (
          <p className="text-xs text-destructive">{errors.address.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">
          Thumbnail
          <sup className="ml-0.5 text-destructive">*</sup>
        </label>
        <FileUploader thumbnail={thumbnail} setValue={setValue} />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={restaurantSignupLoader}
        className="mt-2 w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {restaurantSignupLoader ? (
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

export default RestaurantForm;
