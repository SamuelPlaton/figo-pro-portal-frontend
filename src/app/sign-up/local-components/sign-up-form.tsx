'use client';

import { Button } from '@/components';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

type FormData = {
  postalAddress: string;
  email: string;
  phoneIndicative: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  password: string;
};

export default function SignUpForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    console.log('DATA', data);
  };

  return (
    <div className="flex-grow flex flex-col justify-center gap-4 max-w-[392px]">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {currentStep === 1 && <span>Step 1</span>}
        {currentStep === 2 && <span>Step 2</span>}
        {currentStep === 3 && <span>Step 3</span>}
        {/* Navigation Buttons */}
        <div className="flex flex-row gap-4">
          <Button
            prependIcon="arrowLeft"
            className="p-3.5! border-primary"
            disabled={currentStep <= 1}
            onClick={() => setCurrentStep(currentStep - 1)}
            variant="outline"
            size="lg"
          />
          <Button
            appendIcon="arrowRight"
            className="flex-grow"
            onClick={() => setCurrentStep(currentStep + 1)}
            label="Suivant"
            size="lg"
          />
        </div>
      </form>
    </div>
  );
}
