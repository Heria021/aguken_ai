"use client";

import HotelDetailsForm from "../details/HotelDetailsForm";
import BlankDetailsPage from "../details/BlankDetailsPage";
import { BusinessType } from "../../../lib/data";
import { WelcomeFormValues } from "../welcome/welcomeform";

interface StepDetailsProps {
  selectedBusinessType: BusinessType | null;
  userData?: WelcomeFormValues | null;
  onBack: () => void;
  onComplete?: (data: any) => void;
}

export default function StepDetails({
  selectedBusinessType,
  userData,
  onBack,
  onComplete,
}: StepDetailsProps) {
  const handleFormComplete = (formData: any) => {
    // Combine all data from previous steps
    const completeData = {
      userData,
      businessType: selectedBusinessType,
      formDetails: formData,
    };

    // Save the complete data to localStorage for persistence
    localStorage.setItem("completeFormData", JSON.stringify(completeData));

    // If onComplete is provided, call it with the data
    if (onComplete) {
      onComplete(completeData);
    }
    // The form component will handle redirection if onComplete is not provided
  };

  return (
    <div className="my-4">
      {selectedBusinessType?.label === "Hotels" ? (
        <HotelDetailsForm
          onBack={onBack}
          onContinue={handleFormComplete}
        />
      ) : (
        <BlankDetailsPage onBack={onBack} />
      )}
    </div>
  );
}