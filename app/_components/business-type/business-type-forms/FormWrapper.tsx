import { ReactNode } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface FormWrapperProps {
  children: ReactNode;
  onBack?: () => void;
  onContinue?: () => void;
  isBackVisible?: boolean;
  isContinueVisible?: boolean;
  continueLabel?: string;
  backLabel?: string;
}

export default function FormWrapper({
  children,
  onBack,
  onContinue,
  isBackVisible = true,
  isContinueVisible = true,
  continueLabel = "Continue",
  backLabel = "Back",
}: FormWrapperProps) {
  return (
    <Card className="bg-background border border-border shadow-none rounded-2xl p-2">
      <CardContent className="p-4 space-y-6">
        {children}
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-0">
        {isBackVisible ? (
          <Button variant="ghost" onClick={onBack}>
            {backLabel}
          </Button>
        ) : <span />}
        {isContinueVisible && (
          <Button onClick={onContinue}>
            {continueLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}