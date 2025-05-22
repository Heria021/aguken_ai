"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface RoomCountFieldProps {
  form: UseFormReturn<any>;
}

export function RoomCountField({ form }: RoomCountFieldProps) {
  return (
    <FormField
      control={form.control}
      name="totalRooms"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Total Number of Rooms</FormLabel>
          <FormControl>
            <Input 
              type="number" 
              {...field}
              placeholder="Enter number of rooms"
              className="bg-muted text-foreground border border-border focus-visible:ring-ring"
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
