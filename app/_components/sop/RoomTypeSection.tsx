"use client";

import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UseFormReturn } from "react-hook-form";
import { SopFormValues } from "./sop-form";
import CurrencySelector from "./CurrencySelector";
import { RoomTypeEntry } from "./types";

interface RoomTypeSectionProps {
  form: UseFormReturn<SopFormValues>;
  roomTypes: RoomTypeEntry[];
  setRoomTypes: React.Dispatch<React.SetStateAction<RoomTypeEntry[]>>;
  selectedCurrency: string;
  setSelectedCurrency: React.Dispatch<React.SetStateAction<string>>;
}

export default function RoomTypeSection({
  form,
  roomTypes,
  setRoomTypes,
  selectedCurrency,
  setSelectedCurrency,
}: RoomTypeSectionProps) {
  // Add a new room type and price
  const addRoomType = () => {
    const roomType = form.getValues().roomType;
    const roomPrice = form.getValues().roomPrice;

    if (!roomType || roomType.trim() === "") {
      form.setError("roomType", {
        type: "manual",
        message: "Room type is required"
      });
      return;
    }

    if (!roomPrice || roomPrice.trim() === "") {
      form.setError("roomPrice", {
        type: "manual",
        message: "Room price is required"
      });
      return;
    }

    const newRoomType: RoomTypeEntry = {
      roomType,
      roomPrice,
      currency: selectedCurrency,
    };

    setRoomTypes([...roomTypes, newRoomType]);
    
    // Clear the form fields
    form.setValue("roomType", "");
    form.setValue("roomPrice", "");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold mb-4">Add Room Types and Pricing</h3>
      
      {/* Room Type */}
      <FormField
        control={form.control}
        name="roomType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Type</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter room type" 
                className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <Separator />

      {/* Room Price */}
      <FormField
        control={form.control}
        name="roomPrice"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Room Price</FormLabel>
            <div className="flex">
              <CurrencySelector 
                selectedCurrency={selectedCurrency}
                onCurrencyChange={setSelectedCurrency}
              />
              <FormControl>
                <Input 
                  placeholder="Enter amount" 
                  className="bg-muted text-foreground border border-border focus-visible:ring-ring rounded-l-none"
                  {...field} 
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Add button for room type and price */}
      <div className="flex gap-2 mt-4">
        <Button
          type="button"
          onClick={addRoomType}
          variant="secondary"
        >
          Add
        </Button>
      </div>
    </div>
  );
}
