import React, { useState } from 'react';
import UserForm from './UserForm';
import RestaurantForm from './RestaurantForm';

type Props = {};

function SignupForm2({ signupData }: any) {
  const [isUser, setIsUser] = useState(false);
  return (
    <div className="w-full px-8 pb-8">
      <div className="mb-6 flex w-fit items-center gap-1 rounded-lg bg-secondary p-1 text-xs font-semibold">
        <button
          className={`rounded-md px-4 py-1.5 transition-all ${
            isUser 
              ? 'bg-white text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setIsUser(true)}
        >
          Employee
        </button>
        <button
          className={`rounded-md px-4 py-1.5 transition-all ${
            !isUser 
              ? 'bg-white text-foreground shadow-sm' 
              : 'text-muted-foreground hover:text-foreground'
          }`}
          onClick={() => setIsUser(false)}
        >
          Restaurant
        </button>
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
