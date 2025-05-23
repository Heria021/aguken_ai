"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { RoomTypeEntry } from "./types";
import FileUploadSection, { FileUploadGroup } from "./FileUploadSection";
import FileGroupList from "./FileGroupList";
import RoomTypeSection from "./RoomTypeSection";
import RoomTypeList from "./RoomTypeList";

// Re-export types for backward compatibility
export type { FileUploadGroup } from "./FileUploadSection";
export type { RoomTypeEntry } from "./types";

// Schema for SOP form
const sopFormSchema = z.object({
  groupName: z.string().min(1, "Group name is required"),
  description: z.string().optional(),
  roomType: z.string().min(1, "Room type is required"),
  roomPrice: z.string().min(1, "Room price is required"),
});

export type SopFormValues = z.infer<typeof sopFormSchema>;

interface SopFormProps {
  onSubmit?: (data: {
    fileGroups: FileUploadGroup[];
    roomTypes: RoomTypeEntry[];
  }) => void;
  onBack?: () => void;
}

export default function SopForm({ onSubmit, onBack }: SopFormProps) {
  const [fileUploadGroups, setFileUploadGroups] = useState<FileUploadGroup[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypeEntry[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>("₹");

  const form = useForm<SopFormValues>({
    resolver: zodResolver(sopFormSchema),
    defaultValues: {
      groupName: "",
      description: "",
      roomType: "",
      roomPrice: "",
    },
  });

  // Remove a file upload group
  const removeFileUploadGroup = (id: string) => {
    setFileUploadGroups(fileUploadGroups.filter(group => group.id !== id));
  };

  // Remove a room type
  const removeRoomType = (index: number) => {
    setRoomTypes(roomTypes.filter((_, i) => i !== index));
  };

  // Handle continue button click
  const handleContinue = () => {
    if (onSubmit) {
      onSubmit({
        fileGroups: fileUploadGroups,
        roomTypes: roomTypes,
      });
    }
  };

  return (
    <div>
      <Card className="bg-background text-foreground border border-border p-6">
        <CardContent className="space-y-6 p-0">
          <Form {...form}>
            <form className="space-y-6">
              <FileUploadSection
                form={form}
                fileUploadGroups={fileUploadGroups}
                setFileUploadGroups={setFileUploadGroups}
              />

              <FileGroupList
                fileUploadGroups={fileUploadGroups}
                removeFileUploadGroup={removeFileUploadGroup}
              />

              <RoomTypeSection
                form={form}
                roomTypes={roomTypes}
                setRoomTypes={setRoomTypes}
                selectedCurrency={selectedCurrency}
                setSelectedCurrency={setSelectedCurrency}
              />
            </form>
          </Form>

          <RoomTypeList
            roomTypes={roomTypes}
            removeRoomType={removeRoomType}
          />
        </CardContent>

        <CardFooter className="flex justify-between pt-6 px-0 pb-0">
          <Button variant="ghost" onClick={onBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
