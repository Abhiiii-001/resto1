import React, { useState } from 'react'
import UserForm from './UserForm'
import RestaurantForm from './RestaurantForm'

type Props = {}

function SignupForm2({signupData}: any) {
    const [isUser,setIsUser] = useState(false)
  return (
    <div className='w-full'>
        <div className='flex w-fit items-center justify-between gap-4 rounded-2xl bg-gray-300 mt-3 mb-6'>
                <div className={`py-3 px-4 rounded-2xl ${isUser ? "bg-blue-400 text-gray-50" : ""} cursor-pointer`} onClick={() => setIsUser(true)}>Emplyee</div>
                <div className={`py-3 px-4 rounded-2xl ${isUser ? "" : "bg-blue-400 text-gray-50"} cursor-pointer`} onClick={() => setIsUser(false)}>Restaurant</div>
        </div>
        {
            isUser ? <UserForm prevFormData={signupData}/> : <RestaurantForm prevFormData={signupData}/>
        }
    </div>
  )
}

export default SignupForm2