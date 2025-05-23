"use client";

import { AnimatePresence, motion } from "framer-motion";
import WelcomeForm, { WelcomeFormValues } from "../welcome/welcomeform";

interface StepWelcomeProps {
  onComplete: (data: WelcomeFormValues) => void;
  typingComplete?: boolean;
}

export default function StepWelcome({ onComplete, typingComplete = false }: StepWelcomeProps) {
  return (
    <div className="flex flex-col gap-4">
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