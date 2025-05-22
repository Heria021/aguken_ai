"use client";

import * as React from "react";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface TimePickerPopoverProps {
  className?: string;
  value: string;
  onChange: (time: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function TimePickerPopover({
  className,
  value,
  onChange,
  placeholder = "Select time",
  disabled = false,
}: TimePickerPopoverProps) {
  // Parse the time string (HH:MM) into hours and minutes
  const parseTime = (timeString: string): { hours: number; minutes: number } => {
    if (!timeString || timeString.length < 5) {
      return { hours: 0, minutes: 0 };
    }
    const [hours, minutes] = timeString.split(":").map(Number);
    return { hours: hours || 0, minutes: minutes || 0 };
  };

  // Format hours and minutes into a time string (HH:MM)
  const formatTime = (hours: number, minutes: number): string => {
    return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
  };

  const { hours, minutes } = parseTime(value);

  const handleTimeChange = (type: "hour" | "minute", newValue: number) => {
    if (type === "hour") {
      onChange(formatTime(newValue, minutes));
    } else {
      onChange(formatTime(hours, newValue));
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            "w-full justify-start text-left font-normal",
            !value && "text-muted-foreground",
            className
          )}
          disabled={disabled}
        >
          <Clock className="mr-2 h-4 w-4" />
          {value || placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex divide-x">
          <ScrollArea className="h-72 w-16">
            <div className="flex flex-col p-2">
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <Button
                  key={hour}
                  size="sm"
                  variant={hours === hour ? "default" : "ghost"}
                  className="w-full justify-center py-1 font-mono"
                  onClick={() => handleTimeChange("hour", hour)}
                >
                  {hour.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
          <ScrollArea className="h-72 w-16">
            <div className="flex flex-col p-2">
              {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => (
                <Button
                  key={minute}
                  size="sm"
                  variant={minutes === minute ? "default" : "ghost"}
                  className="w-full justify-center py-1 font-mono"
                  onClick={() => handleTimeChange("minute", minute)}
                >
                  {minute.toString().padStart(2, "0")}
                </Button>
              ))}
            </div>
            <ScrollBar />
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  );
}
