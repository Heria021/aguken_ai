"use client";

import WelcomeHeader from "@/components/shared/welcome-header";
import WelcomeForm, { WelcomeFormValues } from "../welcome/welcomeform";

interface StepWelcomeProps {
  onComplete: (data: WelcomeFormValues) => void;
}

export default function StepWelcome({ onComplete }: StepWelcomeProps) {
  return (
    <div className="flex flex-col gap-4">
      <WelcomeHeader />
      <WelcomeForm onSubmit={onComplete} />
    </div>
  );
}