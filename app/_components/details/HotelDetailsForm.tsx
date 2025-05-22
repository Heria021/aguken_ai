"use client";

import {
  useForm,
  SubmitHandler
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Form } from "@/components/ui/form";
import { Card } from "@/components/ui/card";

import { RoomCountField } from "./components/RoomCountField";
import { OperatingHoursField } from "./components/OperatingHoursField";
import { FileUploadSection } from "./components/FileUploadSection";
import { FileUploadGroup } from "./components/FileUploadGroupItem";
import { FormFooter } from "./components/FormFooter";

const hotelDetailsSchema = z.object({
  totalRooms: z.coerce.number().min(1, "At least 1 room is required"),
  groupName: z.string().optional(), // Optional since it's only needed for file upload groups
  description: z.string().optional(),
  selectedDays: z.array(z.string()).min(1, "At least one day must be selected"),
  fromTime: z.string().min(1, "Opening time is required"),
  toTime: z.string().min(1, "Closing time is required"),
});

type HotelDetailsSchema = z.infer<typeof hotelDetailsSchema>;

export default function HotelDetailsForm({
  onBack,
  onContinue,
}: {
  onBack?: () => void;
  onContinue?: (data: HotelDetailsSchema) => void;
}) {
  const router = useRouter();
  // State for managing file upload groups
  const [fileUploadGroups, setFileUploadGroups] = useState<FileUploadGroup[]>([]);

  const form = useForm<HotelDetailsSchema>({
    resolver: zodResolver(hotelDetailsSchema),
    defaultValues: {
      totalRooms: 1,
      groupName: "",
      description: "",
      selectedDays: [],
      fromTime: "",
      toTime: "",
    },
  });

  const onSubmit: SubmitHandler<HotelDetailsSchema> = (data) => {
    console.log("Hotel details form submitted:", data);
    // Include file upload groups in the submission data
    const submissionData = {
      ...data,
      fileUploadGroups,
    };
    console.log("Complete submission data:", submissionData);

    // Save the data to localStorage for persistence
    localStorage.setItem("hotelDetailsFormData", JSON.stringify(submissionData));

    // If onContinue is provided, call it with the data
    if (onContinue) {
      onContinue(submissionData as any);
    } else {
      // Otherwise, redirect to the home page
      router.push('/');
    }
  };

  const handleFillLater = () => {
    const currentData = form.getValues();
    // Include file upload groups in the saved data
    const savedData = {
      ...currentData,
      fileUploadGroups,
    };
    localStorage.setItem("hotelDetailsFormData", JSON.stringify(savedData));

    // If onContinue is provided, call it with the data
    if (onContinue) {
      onContinue(savedData as any);
    } else {
      // Otherwise, redirect to the home page
      router.push('/');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="bg-background border border-border shadow-none rounded-2xl p-6 ">
          {/* Room Count Field */}
          <RoomCountField form={form} />

          {/* Operating Hours Field */}
          <OperatingHoursField form={form} />

          {/* File Upload Section */}
          <FileUploadSection
            form={form}
            fileUploadGroups={fileUploadGroups}
            setFileUploadGroups={setFileUploadGroups}
          />

          {/* Footer Buttons */}
          <FormFooter
            onBack={onBack}
            onFillLater={handleFillLater}
          />
        </Card>
      </form>
    </Form>
  );
}