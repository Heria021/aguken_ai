"use client";

import { useState } from "react";
import { TypingAnimation } from "@/components/magicui/typing-animation";

interface LovelyProps {
  introText: string;
  descriptionText: string;
}

export default function Lovely({ introText, descriptionText }: LovelyProps) {
  const [firstDone, setFirstDone] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <TypingAnimation
        duration={40}
        className="text-xl font-semibold tracking-tight text-foreground"
        onTypingEnd={() => setFirstDone(true)}
        stop={firstDone}
      >
        {introText}
      </TypingAnimation>

      {firstDone && (
        <TypingAnimation
          duration={30}
          className="text-sm text-muted-foreground font-semibold"
        >
          {descriptionText}
        </TypingAnimation>
      )}
    </div>
  );
}