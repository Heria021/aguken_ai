"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeHeader from "@/components/shared/welcome-header";
import WelcomeForm, { WelcomeFormValues } from "../welcome/welcomeform";

interface StepWelcomeProps {
  onComplete: (data: WelcomeFormValues) => void;
}

export default function StepWelcome({ onComplete }: StepWelcomeProps) {
  const [typingComplete, setTypingComplete] = useState(false);

  // Handler for when typing animation completes
  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  return (
    <div className="flex flex-col gap-4">
      <WelcomeHeader onTypingComplete={handleTypingComplete} />

      <AnimatePresence>
        {typingComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <WelcomeForm onSubmit={onComplete} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}