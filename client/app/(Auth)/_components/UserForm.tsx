
import { UserSignupInterface } from '@/app/Interfaces/Auth';
import Loader from '@/components/common/Loader';
import { useUserSignupMutation } from '@/redux/api/auth';
import { RestaurantIdInterface, useGetAllRestaurantIdQuery } from '@/redux/api/restaurant';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type Props = {
  prevFormData: {
    email: string;
    password: string;
  }
}

function UserForm({prevFormData}: Props) {

    const router = useRouter();

    const {data,isLoading,isSuccess} = useGetAllRestaurantIdQuery(null);
    const [signup,{isLoading:isLoad , isSuccess: isSucc}] = useUserSignupMutation();
    let restaurants: any = [];
    if(isSuccess){
      restaurants = data?.restaurant;
    }

    const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<UserSignupInterface>();

  const onSubmitHandler = async(data:UserSignupInterface) => {
      const toastId =  toast.loading("Loading...")
       try {
        data.email = prevFormData.email;
        data.password = prevFormData.password;
          const res = await signup(data).unwrap();
          console.log(res);
          toast.success("User signup successfully, Waiting for Admin verification!");
          router.push("/signin")

       } catch (error) {
         toast.error("Signup failed!")
         console.log("Error while signup the emplyoeee")
       }
       reset();
       toast.dismiss(toastId);
  }

  if(isLoading){
    return <Loader/>
  }

  return (
    <form className='w-full' onSubmit={handleSubmit(onSubmitHandler)}>
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
        <div>
           <label
            htmlFor="restaurantId"
            className="block text-lg font-semibold text-gray-600 "
            >
            Select Restaurant  ID <span className="text-pink-800 pl-1">*</span>
           </label>
           <select
           id="restaurantId"
           {...register("restaurantId", { required: "Restaurant ID is required" })}
           className={`mt-1 w-full px-4 py-2 border rounded-md shadow-xl focus:ring-2  focus:ring-blue-400 bg-[#E7E9E2]  text-black border-black ${
             errors.restaurantId ? "border-red-500" : "border-gray-300"
           }`}
           >
             <option value={""} disabled selected hidden className='text-sm text-gray-200'>Select your restaurant</option>
             {
              isSuccess && restaurants?.map((res:any) => {
                return <option value={res.id} key={res.id}>
                    {res.resCode}-{res.name}
                </option>
               })
             }
           </select>
        </div>
      <button type="submit" disabled={isLoad} className="w-full px-4 py-3 text-center bg-blue-400 hover:bg-blue-500 transition-all duration-200 rounded-lg text-lg font-semibold mt-6 text-gray-50">Submit</button>
    </form>
  )
}

export default UserForm