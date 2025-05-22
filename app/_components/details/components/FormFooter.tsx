"use client";

import { Button } from "@/components/ui/button";

interface FormFooterProps {
  onBack?: () => void;
  onFillLater: () => void;
}

export function FormFooter({ onBack, onFillLater }: FormFooterProps) {
  return (
    <div className="flex justify-between pt-4 border-t border-border gap-2">
      <Button variant="ghost" onClick={onBack}>
        Back
      </Button>
      <div className="flex gap-2">
        <Button variant="secondary" onClick={onFillLater}>
          Fill Later
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </div>
  );
}
