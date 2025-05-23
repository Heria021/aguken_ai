"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SopForm, { FileUploadGroup, RoomTypeEntry } from "../sop/sop-form";
import Lovely from "../../../components/shared/lovely";

interface StepSopProps {
  onComplete: (data: {
    fileGroups: FileUploadGroup[];
    roomTypes: RoomTypeEntry[];
  }) => void;
  onBack: () => void;
  typingComplete?: boolean;
}

export default function StepSop({
  onComplete,
  onBack,
  typingComplete = false
}: StepSopProps) {
  const [showForm, setShowForm] = useState(false);

  // Show form when typing is complete
  useEffect(() => {
    if (typingComplete) {
      setShowForm(true);
    }
  }, [typingComplete]);

  // Handler for form submission
  const handleFormSubmit = (data: {
    fileGroups: FileUploadGroup[];
    roomTypes: RoomTypeEntry[];
  }) => {
    onComplete(data);
  };

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
              introText="Additional Information to Improve Caller Experience"
              onComplete={() => setShowForm(true)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {typingComplete && showForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <SopForm onSubmit={handleFormSubmit} onBack={onBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
