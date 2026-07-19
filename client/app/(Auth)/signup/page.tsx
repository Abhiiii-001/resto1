'use client';
import React, { useState } from 'react';
import SignupForm1 from '../_components/SignupForm1';
import SignupForm2 from '../_components/SignupForm2';
import { Check, ChefHat } from 'lucide-react';

function Signup() {
  const [step, setStep] = useState(1);
  const [signupData, setSignupData] = useState<{
    email: string;
    password: string;
  }>();
  return (
    <div className="flex flex-1 items-center justify-center h-[90%] bg-gray-50/50 p-4">
      <div className="w-full max-w-[500px] overflow-hidden rounded-xl border border-border bg-white shadow-sm">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-2 px-8 py-8">
          <div className="mb-2 flex items-center justify-center gap-2">
            <ChefHat className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold tracking-tight text-foreground">
              Restro
            </span>
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Create your account
          </h2>
          <p className="text-center text-sm text-muted-foreground">
            Grow your offline business with online utilities
          </p>

          <div className="mt-6 flex w-full items-center justify-center">
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                step === 1
                  ? 'border-primary bg-primary text-white'
                  : 'border-primary bg-primary text-white shadow-sm'
              }`}
              onClick={() => setStep(1)}
            >
              {step === 1 ? '1' : <Check className="h-5 w-5" />}
            </div>
            <div
              className={`h-[2px] w-16 transition-colors ${
                step === 2 ? 'bg-primary' : 'bg-border'
              }`}
            ></div>
            <div
              className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 text-sm font-bold transition-all ${
                step === 2
                  ? 'border-primary bg-primary text-white shadow-sm'
                  : 'border-border bg-white text-muted-foreground hover:border-muted-foreground/30'
              }`}
            >
              2
            </div>
          </div>
        </div>
        {step === 1 ? (
          <SignupForm1
            signupData={signupData}
            setSignupData={setSignupData}
            setStep={setStep}
          />
        ) : (
          <SignupForm2 signupData={signupData} setStep={setStep} />
        )}
      </div>
    </div>
  );
}

export default Signup;
