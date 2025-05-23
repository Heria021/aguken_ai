"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface LovelyProps {
  introText: string;
  descriptionText?: string;
  onComplete?: () => void;
}

export default function Lovely({ introText, descriptionText, onComplete }: LovelyProps) {
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);

  // When the first typing animation is done
  const handleFirstTypingEnd = () => {
    setFirstDone(true);

    // If there's no description text, call onComplete immediately
    if (!descriptionText) {
      if (onComplete) {
        onComplete();
      }
    }
  };

  // When the second typing animation is done
  const handleSecondTypingEnd = () => {
    setSecondDone(true);
    if (onComplete) {
      onComplete();
    }
  };

  return (
    <motion.div
      className="flex flex-col gap-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.05 }}
    >
      <TypingAnimation
        duration={20}
        className="text-xl font-semibold tracking-tight text-foreground"
        onTypingEnd={handleFirstTypingEnd}
        stop={firstDone}
      >
        {introText}
      </TypingAnimation>

      {firstDone && descriptionText && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.05 }}
        >
          <TypingAnimation
            duration={20}
            className="text-sm text-muted-foreground font-semibold"
            onTypingEnd={handleSecondTypingEnd}
            stop={secondDone}
          >
            {descriptionText}
          </TypingAnimation>
        </motion.div>
      )}
    </motion.div>
  );
}