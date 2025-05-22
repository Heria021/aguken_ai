"use client";

import HotelDetailsForm from "../details/HotelDetailsForm";
import BlankDetailsPage from "../details/BlankDetailsPage";
import { BusinessType } from "../../../lib/data";

interface StepDetailsProps {
  selectedBusinessType: BusinessType | null;
  onBack: () => void;
}

export default function StepDetails({
  selectedBusinessType,
  onBack,
}: StepDetailsProps) {
  return (
    <div className="my-4">
      {selectedBusinessType?.label === "Hotels" ? (
        <HotelDetailsForm onBack={onBack} />
      ) : (
        <BlankDetailsPage onBack={onBack} />
      )}
    </div>
  );
}