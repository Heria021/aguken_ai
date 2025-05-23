"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CallRoutingForm, { PhoneEntry } from "../call-routing/call-routing-form";
import Lovely from "../../../components/shared/lovely";
import { WelcomeFormValues } from "../welcome/welcomeform";

interface StepCallRoutingProps {
  onComplete: (data: PhoneEntry[]) => void;
  onBack: () => void;
  userData?: WelcomeFormValues | null;
  typingComplete?: boolean;
}

export default function StepCallRouting({
  onComplete,
  onBack,
  typingComplete = false
}: StepCallRoutingProps) {
  const [showForm, setShowForm] = useState(false);

  // Show form when typing is complete
  useEffect(() => {
    if (typingComplete) {
      // Show the lovely component after a delay
      setTimeout(() => {
        setShowForm(true);
      }, 500);
    }
  }, [typingComplete]);

  return (
    <div className="flex flex-col gap-2">
      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <Lovely
              introText="Call Routing Setup"
              onComplete={() => setShowForm(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <CallRoutingForm onSubmit={onComplete} onBack={onBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
