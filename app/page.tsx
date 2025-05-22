"use client";

import { useState } from "react";
import { WelcomeFormValues } from "./_components/welcome/welcomeform";
import { BusinessType } from "../lib/data";
import StepWelcome from "./_components/step/StepWelcome";
import StepBusinessType from "./_components/step/StepBusinessType";
import StepDetails from "./_components/step/StepDetails";

enum FormStep {
  WELCOME = 1,
  BUSINESS_TYPE = 2,
  DETAILS = 3
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.WELCOME);
  const [userData, setUserData] = useState<WelcomeFormValues | null>(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null);

  const handleWelcomeComplete = (data: WelcomeFormValues) => {
    setUserData(data);
    setCurrentStep(FormStep.BUSINESS_TYPE);
  };

  const handleBusinessTypeComplete = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    setCurrentStep(FormStep.DETAILS);
  };

  const handleBack = () => {
    if (currentStep === FormStep.BUSINESS_TYPE) {
      setCurrentStep(FormStep.WELCOME);
    } else if (currentStep === FormStep.DETAILS) {
      setCurrentStep(FormStep.BUSINESS_TYPE);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 md:px-8 lg:px-0 py-2 lg:py-8">
      {currentStep === FormStep.WELCOME && (
        <StepWelcome onComplete={handleWelcomeComplete} />
      )}

      {currentStep === FormStep.BUSINESS_TYPE && (
        <StepBusinessType
          userData={userData}
          onComplete={handleBusinessTypeComplete}
          onBack={handleBack}
        />
      )}

      {currentStep === FormStep.DETAILS && (
        <StepDetails
          selectedBusinessType={selectedBusinessType}
          userData={userData}
          onBack={handleBack}
          onComplete={(data) => {
            // Save the complete data to localStorage
            localStorage.setItem("finalSubmissionData", JSON.stringify(data));
            // Reset to the welcome step (home)
            setCurrentStep(FormStep.WELCOME);
          }}
        />
      )}
    </div>
  );
}