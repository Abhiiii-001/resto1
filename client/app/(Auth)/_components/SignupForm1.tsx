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

interface Step1FormInterface {
    email: string;
    password: string;
    confirmPassword: string;
}

function SignupForm1({setSignupData,setStep}: any) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<Step1FormInterface>();

  const router = useRouter();
  const [signup , {isLoading}] = useRestaurantSignupMutation();

  const onSubmitHandler = async(data: Step1FormInterface) => {
     if(data.password !== data.confirmPassword){
       toast.error("Password should be same");
       return;
     }
     setSignupData({
      email: data.email,
      password: data.password
     })
     setStep(2);
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(onSubmitHandler)}>

       {/* EMail and password */}
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
              {errors.password?.message}
            </p>
          )}
        </div>
        <div className="mb-4 w-full">
          <label
            htmlFor="confirmPassword"
            className="block text-lg font-semibold text-gray-600 "
          >
            Confirm Password <span className="text-pink-800 pl-1">*</span>
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", { required: "Confirm password is required" })}
            className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2  focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black ${
              errors.confirmPassword ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Enter confirm password"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>


      {/* Submit Button */}
      <button disabled={isLoading} type="submit" className="w-full px-4 py-3 text-center bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-lg text-lg font-semibold mt-2 text-gray-50">Submit</button>
    </form>
  );
}

export default SignupForm1;
