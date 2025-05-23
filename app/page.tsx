"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { WelcomeFormValues } from "./_components/welcome/welcomeform";
import { BusinessType } from "../lib/data";
import StepWelcome from "./_components/step/StepWelcome";
import StepBusinessType from "./_components/step/StepBusinessType";
import StepDetails from "./_components/step/StepDetails";
import StepCallRouting from "./_components/step/StepCallRouting";
import StepSop from "./_components/step/StepSop";
import StepComplete from "./_components/step/StepComplete";
import { PhoneEntry } from "./_components/call-routing/call-routing-form";
import { FileUploadGroup, RoomTypeEntry } from "./_components/sop/sop-form";
import WelcomeHeader from "@/components/shared/welcome-header";
import BusinessTypeHeader from "./_components/business-type/header";

enum FormStep {
  WELCOME = 1,
  BUSINESS_TYPE = 2,
  DETAILS = 3,
  CALL_ROUTING = 4,
  SOP = 5,
  COMPLETE = 6
}

export default function Home() {
  const [currentStep, setCurrentStep] = useState<FormStep>(FormStep.WELCOME);
  const [userData, setUserData] = useState<WelcomeFormValues | null>(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState<BusinessType | null>(null);
  const [phoneEntries, setPhoneEntries] = useState<PhoneEntry[]>([]);
  const [sopData, setSopData] = useState<{
    fileGroups: FileUploadGroup[];
    roomTypes: RoomTypeEntry[];
  } | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Handler for when typing animation completes
  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  // Show header immediately after typing is complete
  useEffect(() => {
    if (typingComplete && currentStep !== FormStep.WELCOME) {
      // Set header visible immediately without delay
      setHeaderVisible(true);
    } else {
      setHeaderVisible(false);
    }
  }, [typingComplete, currentStep]);

  const handleWelcomeComplete = (data: WelcomeFormValues) => {
    setUserData(data);
    setCurrentStep(FormStep.BUSINESS_TYPE);
  };

  const handleBusinessTypeComplete = (businessType: BusinessType) => {
    setSelectedBusinessType(businessType);
    setCurrentStep(FormStep.DETAILS);
  };

  const handleDetailsComplete = (data: any) => {
    // Save the details data
    localStorage.setItem("detailsData", JSON.stringify(data));
    // Move to call routing step
    setCurrentStep(FormStep.CALL_ROUTING);
  };

  const handleCallRoutingComplete = (data: PhoneEntry[]) => {
    setPhoneEntries(data);
    // Move to SOP step
    setCurrentStep(FormStep.SOP);
  };

  const handleSopComplete = (data: {
    fileGroups: FileUploadGroup[];
    roomTypes: RoomTypeEntry[];
  }) => {
    setSopData(data);
    // Save the complete data to localStorage
    const completeData = {
      userData,
      businessType: selectedBusinessType,
      details: JSON.parse(localStorage.getItem("detailsData") || "{}"),
      callRouting: phoneEntries,
      sop: data
    };
    localStorage.setItem("finalSubmissionData", JSON.stringify(completeData));
    // Move to the completion step
    setCurrentStep(FormStep.COMPLETE);
  };

  const handleBack = () => {
    if (currentStep === FormStep.BUSINESS_TYPE) {
      setCurrentStep(FormStep.WELCOME);
    } else if (currentStep === FormStep.DETAILS) {
      setCurrentStep(FormStep.BUSINESS_TYPE);
    } else if (currentStep === FormStep.CALL_ROUTING) {
      setCurrentStep(FormStep.DETAILS);
    } else if (currentStep === FormStep.SOP) {
      setCurrentStep(FormStep.CALL_ROUTING);
    }
  };

  return (
    <div className="container mx-auto max-w-3xl px-4 sm:px-6 md:px-8 lg:px-0 py-2 lg:py-8">
      {/* Common welcome header for all steps */}
      <WelcomeHeader onTypingComplete={handleTypingComplete} />

      {/* Common business type header for steps after welcome */}
      <div className="mt-4">
        <AnimatePresence>
          {headerVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
                delay: -0.1 // Negative delay to prioritize this animation
              }}
            >
              <BusinessTypeHeader userData={userData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-8">
        {currentStep === FormStep.WELCOME && (
          <StepWelcome
            onComplete={handleWelcomeComplete}
            typingComplete={typingComplete}
          />
        )}

        {currentStep === FormStep.BUSINESS_TYPE && (
          <StepBusinessType
            onComplete={handleBusinessTypeComplete}
            onBack={handleBack}
            typingComplete={typingComplete}
          />
        )}

        {currentStep === FormStep.DETAILS && (
          <StepDetails
            selectedBusinessType={selectedBusinessType}
            userData={userData}
            onBack={handleBack}
            onComplete={handleDetailsComplete}
          />
        )}

        {currentStep === FormStep.CALL_ROUTING && (
          <StepCallRouting
            onComplete={handleCallRoutingComplete}
            onBack={handleBack}
            typingComplete={typingComplete}
          />
        )}

        {currentStep === FormStep.SOP && (
          <StepSop
            onComplete={handleSopComplete}
            onBack={handleBack}
            typingComplete={typingComplete}
          />
        )}

        {currentStep === FormStep.COMPLETE && (
          <StepComplete
            typingComplete={typingComplete}
          />
        )}
      </div>
    </div>
  );
}