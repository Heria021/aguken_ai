"use client";

import { useState } from "react";
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

  const onSelectType = (type: BusinessType) => {
    setSelectedType(type);
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
        />
      ) :
        <Lovely
          introText={"Lovely to meet you Hariom Suthar"}
          descriptionText={"Please select the type of business you want to use ResponseAI for:"}
        />}

      {!selectedType ? (
        // Show business type cards if no type is selected
        <Card className="bg-background border border-border shadow-none rounded-2xl p-2">
          <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-4 p-2">
            {businessTypes.map((type) => (
              <BusinessTypeCard
                key={type.label}
                type={type}
                isSelected={false}
                onClick={() => onSelectType(type)}
              />
            ))}
          </CardContent>

          <CardFooter className="flex justify-between p-2 pt-0">
            <Button variant="ghost" onClick={onBack}>Back</Button>
            <Button disabled>Continue</Button>
          </CardFooter>
        </Card>
      ) : (
        // Show the selected form
        <Card className="bg-background border border-border shadow-none rounded-2xl p-2">
          {renderSelectedForm()}

          <CardFooter className="flex justify-between p-2 pt-0">
            <Button variant="ghost" onClick={handleLocalBack} className="font-medium">Back</Button>
            <Button onClick={handleContinue}>Continue</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}