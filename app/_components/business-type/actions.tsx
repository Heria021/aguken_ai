"use client";

import { Button } from "@/components/ui/button";

export default function BusinessTypeActions({ 
  onBack, 
  onContinue, 
  continueDisabled 
}: { 
  onBack: () => void; 
  onContinue: () => void; 
  continueDisabled: boolean;
}) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button 
        variant="ghost" 
        className="text-muted-foreground hover:text-white hover:bg-[#2A2F3A]"
        onClick={onBack}
      >
        Back
      </Button>
      <Button 
        className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none"
        onClick={onContinue}
        disabled={continueDisabled}
      >
        Continue
      </Button>
    </div>
  );
}
