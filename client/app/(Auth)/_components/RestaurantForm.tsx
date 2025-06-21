import { RestaturantSignupInterface } from "@/app/Interfaces/Auth";
import FileUploader from "@/components/common/FileUploader";
import Loader from "@/components/common/Loader";
import { useRestaurantSignupMutation } from "@/redux/api/auth";
import { Mail, MapPin, Phone, SquareMenu, User } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {
  prevFormData : {
    number: string;
    password: string;
  }
};

interface RestaurantFormInterface {
    name: string;
    slogan ?: string;
    thumbnail : File;
    number: string;
    address: string;
}

function RestaurantForm({prevFormData}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<RestaurantFormInterface>();

  const router = useRouter();
  const [signup , {isLoading: restaurantSignupLoader}] = useRestaurantSignupMutation();

  // Watch thumbnail field to display a preview
  const thumbnail = watch("thumbnail");

  // const onDrop = useCallback(
  //   (acceptedFiles: File[]) => {
  //     // Update the thumbnail value in the form
  //     setValue("thumbnail", acceptedFiles[0]);
  //   },
  //   [setValue]
  // );

  // const { getRootProps, getInputProps, isDragActive } = useDropzone({
  //   onDrop,
  //   multiple: false,
  //   accept: { "image/*": [] }, // Accept only image files
  // });

  const onSubmitHandler = async(data: RestaurantFormInterface) => {
    const toastId = toast.loading("Loading...")
    try {
      const form = new FormData();
      form.append("name",data.name);
      form.append("slogan",data.slogan || "");
      form.append("thumbnail",thumbnail);
      form.append("number",data.number);
      form.append("email",prevFormData.email);
      form.append("password",prevFormData.password);
      form.append("address",data.address);

      const response = await signup(form).unwrap();
      if (!response || !response?.success) {
        throw new Error(response?.message || "Something went wrong!");
      }

      console.log(response);
      toast.success("Signup Success!")
      router.push('/signin')
      toast.info("Login Now!")

    } catch (err:unknown) {
              console.error("Signup failed:", err);
              if(err instanceof Error) {
                toast.error(err.message)
              }
              else {
                toast.error(err?.data?.message || "Signup Failed!")
              }
        }
    reset();
    toast.dismiss(toastId)
  }

  return (
    <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmitHandler)}>
        {/* Name & Number */}

        <div className="space-y-2">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
                <sup className="text-red-500 pl-1">*</sup>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  {...register("name", {
                    required: "Name is required",
                  })}
                  type="name"
                  id="name"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${
                    errors.name ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  placeholder="Enter your name"
                />
              </div>
              {errors.name && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.name.message}</span>
                </div>
              )}
        </div>

        <div className="space-y-2">
              <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                Number
                <sup className="text-red-500 pl-1">*</sup>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  {...register("number", {
                    required: "Number is required",
                  })}
                  type="number"
                  id="number"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${
                    errors.number ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  placeholder="Enter your number"
                />
              </div>
              {errors.number && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.number.message}</span>
                </div>
              )}
        </div>

      {/* Slogan */}
      <div className="space-y-2">
              <label htmlFor="slogan" className="block text-sm font-medium text-gray-700">
                Slogan
                <sup className="text-red-500 pl-1">*</sup>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SquareMenu className="h-5 w-5 text-sky-400" />
                </div>
                <input
                  {...register("slogan", {
                    required: "Slogan is required",
                  })}
                  type="slogan"
                  id="slogan"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${
                    errors.slogan ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  placeholder="Enter your slogan"
                />
              </div>
              {errors.slogan && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.slogan.message}</span>
                </div>
              )}
        </div>

      {/* Address */}

      <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Address
                <sup className="text-red-500 pl-1">*</sup>
              </label>
              <div className="relative">
                <div className="absolute  left-0 top-4 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-sky-400" />
                </div>
                <textarea
                  {...register("address", {
                    required: "Address is required",
                  })}
                  id="address"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200 ${
                    errors.address ? "border-red-300 bg-red-50" : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  placeholder="Enter your address"
                />
              </div>
              {errors.address && (
                <div className="flex items-center space-x-2 text-red-600 text-sm bg-red-50 p-2 rounded-md">
                  <span>⚠️</span>
                  <span>{errors.address.message}</span>
                </div>
              )}
        </div>

      {/* Thumbnail */}
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Thumbnail
                <sup className="text-red-500 pl-1">*</sup>
              </label>
      <FileUploader thumbnail={thumbnail} setValue={setValue} />

      {/* Submit Button */}
      <button disabled={restaurantSignupLoader} type="submit" className="w-full px-4 py-3 text-center bg-blue-400 hover:bg-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-200 rounded-lg text-lg font-semibold mt-2 text-gray-50">Submit</button>
    </form>
  );
}

export default RestaurantForm;
