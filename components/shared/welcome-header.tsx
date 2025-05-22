"use client";

import { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";

export default function WelcomeHeader() {
  const [firstDone, setFirstDone] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <TypingAnimation
        duration={40}
        className="text-2xl font-semibold tracking-tight text-foreground"
        onTypingEnd={() => setFirstDone(true)}
        stop={firstDone}
      >
        Hello, I'm AgukenAI.
      </TypingAnimation>

      {firstDone && (
        <TypingAnimation duration={30} className="text-sm text-muted-foreground font-semibold">
          I'm an AI Agent helping you handle reception and support calls using GenAI-based phone call automation.
        </TypingAnimation>
      )}
    </div>
  );
}