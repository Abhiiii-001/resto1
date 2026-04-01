import React, { useState } from 'react';
import UserForm from './UserForm';
import RestaurantForm from './RestaurantForm';

type Props = {};

function SignupForm2({ signupData }: any) {
  const [isUser, setIsUser] = useState(false);
  return (
    <div className="w-full px-8 pb-8">
      <div className="mb-3 flex w-fit items-center justify-between gap-4 rounded-2xl bg-gray-300 text-sm">
        <div
          className={`rounded-xl px-3 py-2 ${
            isUser ? 'bg-blue-400 text-gray-50' : ''
          } cursor-pointer`}
          onClick={() => setIsUser(true)}
        >
          Emplyee
        </div>
        <div
          className={`rounded-xl px-3 py-2 ${
            isUser ? '' : 'bg-blue-400 text-gray-50'
          } cursor-pointer`}
          onClick={() => setIsUser(false)}
        >
          Restaurant
        </div>
      </div>
      {isUser ? (
        <UserForm prevFormData={signupData} />
      ) : (
        <RestaurantForm prevFormData={signupData} />
      )}
    </div>
  );
}

export default SignupForm2;
