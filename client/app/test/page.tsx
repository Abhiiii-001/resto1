"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, MoveLeft, AlignLeft, MoveLeftIcon } from 'lucide-react';
import Head from 'next/head';

type FormData = {
  email: string;
  password: string;
  rememberPassword: boolean;
};

const page: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [showPassword, setShowPassword] = React.useState(false);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Handle login logic here
  };

  return (
    <>
      <Head>
        <title>Login to Account</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-[url('/login_bg.png')]  bg-opacity-100 relative overflow-hidden">
        {/* Background shapes */}
          <img src='/oval1.png' className='absolute bottom-0 right-0' />
          <img src='/oval2.png' className='absolute top-0 right-0' />
          <img src='/oval3.png' className='absolute -top-12 -left-4' />
          <img src='/oval4.png' className='absolute -bottom-12 -left-4' />
        
        <div className='absolute top-12 left-8 px-4 py-2 rounded-xl flex items-center text-white gap-2 bg-blue-500 text-sm font-semibold'>
          <MoveLeftIcon/> Home
        </div>

        {/* Login Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg px-8 w-full max-w-md py-14 z-10"
        >
          <motion.h1 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-center text-gray-800 mb-2"
          >
            Login to Account
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center text-gray-600 text-sm mb-6"
          >
            Please enter your email and password to continue
          </motion.p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-4"
            >
              <label htmlFor="email" className="block text-sm text-gray-700 mb-1">
                Email address:
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="example_email@gmail.com"
                  className="w-full p-2.5 pl-3 border border-gray-300 rounded bg-gray-50 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">Valid email is required</p>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-sm text-gray-700">
                  Password
                </label>
                <Link href="/forgot-password" className="text-sm text-gray-500 hover:text-blue-500">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className="w-full p-2.5 pl-3 border border-gray-300 rounded bg-gray-50 text-gray-600 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                  {...register("password", { required: true, minLength: 6 })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">Password must be at least 6 characters</p>
              )}
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center mb-6"
            >
              <input
                id="remember"
                type="checkbox"
                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                {...register("rememberPassword")}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                Remember Password
              </label>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded font-medium text-sm transition-colors duration-200"
            >
              Sign In
            </motion.button>
          </form>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-4 text-sm text-gray-600"
          >
            Don't have an account? 
            <Link href="/signup" className="text-blue-500 hover:underline ml-1">
              Create Account
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default page;