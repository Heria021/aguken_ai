"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface WelcomeHeaderProps {
  onTypingComplete?: () => void;
}

export default function WelcomeHeader({ onTypingComplete }: WelcomeHeaderProps) {
  const [firstDone, setFirstDone] = useState(false);
  const [secondDone, setSecondDone] = useState(false);

  // Store the complete first text to display it statically when done
  const [firstText, setFirstText] = useState("");
  const firstTextRef = useRef("Hello, I'm AgukenAI.");

  // When first typing animation is done
  const handleFirstTypingEnd = () => {
    setFirstDone(true);
    // Save the complete text to display statically
    setFirstText(firstTextRef.current);
  };

  // When second typing animation is done, call the onTypingComplete callback
  const handleSecondTypingEnd = () => {
    setSecondDone(true);
    if (onTypingComplete) {
      onTypingComplete();
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {!firstDone ? (
        // Show the typing animation for the first text until it's done
        <TypingAnimation
          duration={20}
          className="text-2xl font-semibold tracking-tight text-foreground"
          onTypingEnd={handleFirstTypingEnd}
        >
          {firstTextRef.current}
        </TypingAnimation>
      ) : (
        // Once first animation is done, show the complete text statically with a subtle animation
        <motion.div
          className="text-2xl font-semibold tracking-tight text-foreground"
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {firstText}
        </motion.div>
      )}

      {firstDone && (
        <motion.div
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, delay: 0.2 }}
        >
          <TypingAnimation
            duration={10}
            className="text-sm text-muted-foreground font-semibold"
            onTypingEnd={handleSecondTypingEnd}
            stop={secondDone}
          >
            I'm an AI Agent helping you handle reception and support calls using GenAI-based phone call automation.
          </TypingAnimation>
        </motion.div>
      )}
    </div>
  );
}