"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HotelDetailsForm from "../details/HotelDetailsForm";
import BlankDetailsPage from "../details/BlankDetailsPage";
import { BusinessType } from "../../../lib/data";
import { WelcomeFormValues } from "../welcome/welcomeform";
import Lovely from "../../../components/shared/lovely";

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
  const [showForm, setShowForm] = useState(false);

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
        <div className="space-y-4">
          <AnimatePresence>
            (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Lovely
                introText={"Details to personalize call handling for your hotel"}
                onComplete={() => setShowForm(true)}
              />
            </motion.div>
            )
          </AnimatePresence>

          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <HotelDetailsForm
                onBack={onBack}
                onContinue={handleFormComplete}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        <BlankDetailsPage onBack={onBack} />
      )}
    </div>
  );
}