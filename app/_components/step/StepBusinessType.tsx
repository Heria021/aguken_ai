"use client";

import BusinessTypeHeader from "../business-type/header";
import BusinessTypeSelector from "../business-type/selector";
import { WelcomeFormValues } from "../welcome/welcomeform";
import { BusinessType } from "../../../lib/data";
import WelcomeHeader from "@/components/shared/welcome-header";

interface StepBusinessTypeProps {
  userData: WelcomeFormValues | null;
  onComplete: (type: BusinessType) => void;
  onBack: () => void;
}

export default function StepBusinessType({
  userData,
  onComplete,
  onBack,
}: StepBusinessTypeProps) {
  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <WelcomeHeader/>
        <BusinessTypeHeader userData={userData} />
      </div>
      <BusinessTypeSelector onContinue={onComplete} onBack={onBack} />
    </div>
  );
}