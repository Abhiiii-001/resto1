'use client';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";

interface LoginFormInput {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>();

  const onSubmit: SubmitHandler<LoginFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#E7E9E2] ">

      {/* Top Section on Mobile - Image */}
      <div 
        className="lg:hidden w-full h-96 bg-cover bg-center" 
        style={{ backgroundImage: 'url(https://tse3.mm.bing.net/th?id=OIG3.BU0cPMugoGKcYVCKh6n.&pid=ImgGn)' }}
      >
      </div>

      {/* Left Section on Desktop - Image */}
      <div 
        className="hidden lg:flex w-1/2 bg-cover bg-center " 
        style={{ backgroundImage: 'url(https://tse3.mm.bing.net/th?id=OIG3.BU0cPMugoGKcYVCKh6n.&pid=ImgGn)' }}
      >
      </div>

      {/* Right Section - Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8 ">
        <div className="bg-[#E7E9E2]   rounded-lg w-full max-w-md p-8 ">
          <h2 className="text-3xl font-bold text-center mb-6 text-black">Welcome To Restro</h2>
          <p className="text-center text-black mb-6">
            Log in to your account to continue.
          </p>

          <div className="flex justify-center space-x-4 mb-6 text-center">
            <button
              type="button"
              className="flex items-center justify-center w-full max-w-xs px-4 py-2 bg-[#E7E9E2] border border-black rounded-md text-black hover:bg-white hover:text-black shadow-sm"
            >
              <span className="mr-2">🌐</span> <b>Google</b>
            </button>
          </div>

          <div className="relative mb-6">
            <hr className="border-black" />
            <span className="absolute inset-x-0 top-0 mx-auto w-max -mt-2 bg-[#E7E9E2]  px-4 text-black">
              or
            </span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black">
                Email *
              </label>
              <input
                id="email"
                type="email"
                {...register("email", { required: "Email is required" })}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-[#E7E9E2]  text-black border-black  ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter email address"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-sm font-medium text-black ">
                Password *
              </label>
              <input
                id="password"
                type="password"
                {...register("password", { required: "Password is required" })}
                className={`mt-1 w-full px-4 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 bg-[#E7E9E2]  text-black border-black ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div className="flex justify-between items-center mb-6">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                Login
              </button>
            </div>
          </form>

          <div className="text-center">
            <a href="#" className="text-sm text-black hover:underline">
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
