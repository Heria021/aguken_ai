"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [typingComplete, setTypingComplete] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  // Handler for when typing animation completes in WelcomeHeader
  const handleTypingComplete = () => {
    setTypingComplete(true);
    // Show the header after a short delay
    setTimeout(() => setHeaderVisible(true), 300);
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-2">
        <WelcomeHeader onTypingComplete={handleTypingComplete} />

        <AnimatePresence>
          {headerVisible && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.1, ease: "easeOut" }}
            >
              <BusinessTypeHeader userData={userData} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <BusinessTypeSelector onContinue={onComplete} onBack={onBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}