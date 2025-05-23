"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Lovely from "../../../components/shared/lovely";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";

interface StepCompleteProps {
  typingComplete?: boolean;
}

export default function StepComplete({ typingComplete = false }: StepCompleteProps) {
  const [showContent, setShowContent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typingComplete) {
      setShowContent(true);
    }
  }, [typingComplete]);

  const handleGoToDashboard = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Lovely
              introText="Setup Complete!"
              onComplete={() => setShowContent(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="flex flex-col gap-4">
              <Card className="border-border bg-background text-foreground p-2 shadow-none">
                <CardContent className="p-2">
                  <p className="text-base leading-relaxed">
                    Your hotel is now configured for AI voice receptionist and support. I'll use this data
                    to assist your guests with bookings, inquiries, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border bg-background text-foreground p-2 shadow-none">
                <CardContent className="p-2">
                  <p className="text-base leading-relaxed">
                    You can always update your information or settings from your dashboard.
                  </p>
                </CardContent>
              </Card>

              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleGoToDashboard}
                  className="font-medium px-6"
                  variant="default"
                >
                  Go to Dashboard
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}