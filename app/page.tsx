"use client";

import { useState } from "react";
import WelcomeFooter from "./_components/welcome/footer";
import WelcomeHeader from "../components/shared/welcome-header";
import WelcomeForm, { WelcomeFormValues } from "./_components/welcome/welcomeform";
import BusinessTypeHeader from "./_components/business-type/header";
import BusinessTypeSelector from "./_components/business-type/selector";
import HotelDetailsForm from "./_components/details/HotelDetailsForm";
import BlankDetailsPage from "./_components/details/BlankDetailsPage";
import { BusinessType } from "../lib/data";

// Define the steps in our form flow
enum FormStep {
  WELCOME = 1,
  BUSINESS_TYPE = 2,
  DETAILS = 3
}

export default function Home() {
  // State to track the current step
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.WELCOME);

  // State to store user data from step 1
  const [userData, setUserData] = useState<WelcomeFormValues | null>(null);

  // State to store the selected business type
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null);

  // Handler for when step 1 (welcome form) is completed
  const handleWelcomeComplete = (data: WelcomeFormValues) => {
    setUserData(data);
    setCurrentStep(FormStep.BUSINESS_TYPE);
  };

  // Handler for when step 2 (business type selection) is completed
  const handleBusinessTypeComplete = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    setCurrentStep(FormStep.DETAILS);
  };

  // Handler for going back to the previous step
  const handleBack = () => {
    if (currentStep === FormStep.BUSINESS_TYPE) {
      setCurrentStep(FormStep.WELCOME);
    } else if (currentStep === FormStep.DETAILS) {
      setCurrentStep(FormStep.BUSINESS_TYPE);
    }
  };

  // Render the appropriate step based on currentStep
  return (
    <div className="container mx-auto max-w-3xl py-8">
      {currentStep === FormStep.WELCOME ? (
        // Step 1: Welcome Form
        <div className="flex flex-col gap-4">
          <WelcomeHeader />
          <WelcomeForm onSubmit={handleWelcomeComplete} />
        </div>
      ) : currentStep === FormStep.BUSINESS_TYPE ? (
        // Step 2: Business Type Selection
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <WelcomeHeader />
            <BusinessTypeHeader userData={userData} />
          </div>
          <BusinessTypeSelector onContinue={handleBusinessTypeComplete} onBack={handleBack} />
        </div>
      ) : (
        // Step 3: Details Form based on selected business type
        <div className="my-4">
          {selectedBusinessType?.label === "Hotels" ? (
            <HotelDetailsForm onBack={handleBack} />
          ) : (
            <BlankDetailsPage onBack={handleBack} />
          )}
        </div>
      )}
    </div>
  );
}
