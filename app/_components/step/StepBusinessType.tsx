"use client";

import { AnimatePresence, motion } from "framer-motion";
import BusinessTypeSelector from "../business-type/selector";
import { WelcomeFormValues } from "../welcome/welcomeform";
import { BusinessType } from "../../../lib/data";

interface StepBusinessTypeProps {
  onComplete: (type: BusinessType) => void;
  onBack: () => void;
  typingComplete?: boolean;
}

export default function StepBusinessType({
  onComplete,
  onBack,
  typingComplete = false
}: StepBusinessTypeProps) {
  return (
    <div className="flex flex-col gap-10">
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