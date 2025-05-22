"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { businessTypes, BusinessType } from "../../../lib/data";
import { Button } from "@/components/ui/button";
import { BusinessTypeCard } from "./BusinessTypeCard";
import ClinicForm from "./business-type-forms/ClinicForm";
import EventForm from "./business-type-forms/EventForm";
import HotelForm from "./business-type-forms/HotelForm";
import OthersForm from "./business-type-forms/OthersForm";
import Lovely from "./lovely";

interface BusinessTypeSelectorProps {
  onContinue: (businessType: BusinessType) => void;
  onBack: () => void;
}

export default function BusinessTypeSelector({ onContinue, onBack }: BusinessTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<BusinessType | null>(null);
  const [showTypeCards, setShowTypeCards] = useState(false);

  const onSelectType = (type: BusinessType) => {
    setSelectedType(type);
  };

  const handleLovelyComplete = () => {
    setShowTypeCards(true);
  };

  const handleLocalBack = () => {
    // If a type is selected, clear it to go back to business type selection
    if (selectedType) {
      setSelectedType(null);
    } else {
      // If no type is selected, go back to the previous step
      onBack();
    }
  };

  const handleContinue = () => {
    if (selectedType) {
      onContinue(selectedType);
    }
  };

  // Function to render the appropriate form based on selected business type
  const renderSelectedForm = () => {
    switch (selectedType?.label) {
      case "Hotels":
        return <HotelForm />;
      case "Clinics":
        return <ClinicForm />;
      case "Event Organizers":
        return <EventForm />;
      case "Others":
        return <OthersForm />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">

      {selectedType ? (
        <Lovely
          introText={selectedType.description || `Let's set up your ${selectedType.label} business`}
          descriptionText={''}
          onComplete={handleLovelyComplete}
        />
      ) :
        <Lovely
          introText={"Lovely to meet you"}
          descriptionText={"Please select the type of business you want to use ResponseAI for:"}
          onComplete={handleLovelyComplete}
        />}

      <AnimatePresence mode="wait">
        {!selectedType && showTypeCards ? (
          // Show business type cards if no type is selected
          <motion.div
            key="type-selection"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-background border border-border shadow-none rounded-2xl p-2">
              <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-2">
                {businessTypes.map((type, index) => (
                  <motion.div
                    key={type.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <BusinessTypeCard
                      type={type}
                      isSelected={false}
                      onClick={() => onSelectType(type)}
                    />
                  </motion.div>
                ))}
              </CardContent>

              <CardFooter className="flex justify-between p-2 pt-0">
                <Button variant="ghost" onClick={onBack}>Back</Button>
                <Button disabled>Continue</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (selectedType && showTypeCards) ? (
          // Show the selected form
          <motion.div
            key="selected-form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <Card className="bg-background border border-border shadow-none rounded-2xl p-2">
              {renderSelectedForm()}

              <CardFooter className="flex justify-between p-2 pt-0">
                <Button variant="ghost" onClick={handleLocalBack} className="font-medium">Back</Button>
                <Button onClick={handleContinue}>Continue</Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}