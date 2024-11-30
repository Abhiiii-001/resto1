import { RestaturantSignupInterface } from "@/app/Interfaces/Auth";
import FileUploader from "@/components/common/FileUploader";
import Loader from "@/components/common/Loader";
import { useRestaurantSignupMutation } from "@/redux/api/auth";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type Props = {};

function RestaurantForm({}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<RestaturantSignupInterface>();

  const router = useRouter();
  const [signup , {isLoading}] = useRestaurantSignupMutation();

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

  const onSubmitHandler = async(data: RestaturantSignupInterface) => {
    const toastId = toast.loading("Loading...")
    try {
      const form = new FormData();
      form.append("name",data.name);
      form.append("slogan",data.slogan || "");
      form.append("thumbnail",thumbnail);
      form.append("number",data.number);
      form.append("email",data.email);
      form.append("password",data.password);
      form.append("address",data.address);

      const response = await signup(form).unwrap();

      console.log(response);
      toast.success("Signup Success!")
      router.push('/signin')
      toast.info("Login Now!")

    } catch (err) {
      console.error("Signup failed:", err);
      toast.error("Signup Failed!")
    }
    reset();
    toast.dismiss(toastId)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>
        {/* Name & Number */}
      <div className="flex items-center w-full gap-4">
        <div className="mb-4 w-full">
          <label
            htmlFor="name"
            className="block text-lg font-semibold text-gray-600"
          >
            Name
            <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="name"
            type="name"
            {...register("name", { required: "name is required" })}
            className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black  ${
              errors.name ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="number"
            className="block text-lg font-semibold text-gray-600"
          >
            Number
            <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="number"
            type="number"
            {...register("number", { required: "number is required" })}
            className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black  ${
              errors.number ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter contact number"
          />
          {errors.number && (
            <p className="text-red-500 text-sm mt-1">{errors.number.message}</p>
          )}
        </div>
      </div>
      {/* Slogan */}
      <div className="mb-4">
        <label
          htmlFor="slogan"
          className="block text-lg font-semibold text-gray-600"
        >
          Slogan
        </label>
        <input
          id="slogan"
          type="slogan"
          {...register("slogan")}
          className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black`}
          placeholder="Enter slogan of your restaurant"
        />
      </div>
       {/* EMail and password */}
      <div className="flex items-center gap-4 w-full">
        <div className="mb-4 w-full">
          <label
            htmlFor="email"
            className="block text-lg font-semibold text-gray-600"
          >
            Email
            <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="email"
            type="email"
            {...register("email", { required: "Email is required" })}
            className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black  ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter email address "
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">
              {errors.email.message}
            </p>
          )}
        </div>

        <div className="mb-4 w-full">
          <label
            htmlFor="password"
            className="block text-lg font-semibold text-gray-600 "
          >
            Password <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="password"
            type="password"
            {...register("password", { required: "Password is required" })}
            className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2  focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter your password"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}

      <div className="mb-4">
        <label
          htmlFor="address"
          className="block text-lg font-semibold text-gray-600"
        >
          Address
          <span className="text-pink-800 pl-1">*</span>
        </label>
        <textarea
          id="address"
          {...register("address", { required: "address is required" })}
          className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2 focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black  ${
            errors.address ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Enter full address"
        />
        {errors.address && (
          <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>
        )}
      </div>

      {/* Thumbnail */}
      <label
            htmlFor="thumnail"
            className="block text-lg font-semibold text-gray-600 "
          >
            Thumbnail <span className="text-pink-800 pl-1">*</span>
          </label>
      <FileUploader thumbnail={thumbnail} setValue={setValue} />

      {/* Submit Button */}
      <button disabled={isLoading} type="submit" className="w-full px-4 py-3 text-center bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-lg text-lg font-semibold mt-2 text-gray-50">Submit</button>
    </form>
  );
}

export default RestaurantForm;
