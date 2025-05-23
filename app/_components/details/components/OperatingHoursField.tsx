"use client";

import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { TimePickerPopover } from "@/components/custom/time-picker-popover";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

interface OperatingHoursFieldProps {
  form: UseFormReturn<any>;
}

export function OperatingHoursField({ form }: OperatingHoursFieldProps) {
  return (
    <FormField
      control={form.control}
      name="selectedDays"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Reception Operating Hours</FormLabel>
          <div className="border rounded-xl p-4 space-y-5 bg-muted/50 shadow-sm">
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange([...days]);
                }}
              >
                All Days
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(["MON", "TUE", "WED", "THU", "FRI"]);
                }}
              >
                Weekdays
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange(["SAT", "SUN"]);
                }}
              >
                Weekend
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={(e) => {
                  e.preventDefault();
                  field.onChange([]);
                }}
              >
                Clear
              </Button>
            </div>

            <FormControl>
              <ToggleGroup
                type="multiple"
                value={field.value}
                onValueChange={field.onChange}
                className="flex flex-wrap gap-2"
              >
                {days.map((day) => {
                  const isSelected = field.value.includes(day);
                  return (
                    <ToggleGroupItem
                      key={day}
                      value={day}
                      className={`p-2 rounded-2xl font-semibold text-xs lg:text-sm
                          first:rounded-l-2xl last:rounded-r-2xl transition-all duration-200
                          ${isSelected
                          ? "bg-primary text-primary-foreground shadow-md border-primary border"
                          : "bg-background text-muted-foreground hover:bg-accent hover:text-accent-foreground border border-border"
                        }
                          `}
                    >
                      {day}
                    </ToggleGroupItem>
                  );
                })}
              </ToggleGroup>
            </FormControl>
            <FormMessage />

            <div className="mt-2 pt-4 border-t border-border">
              <h3 className="text-sm font-medium mb-3">Operating Time</h3>
              <div className="flex gap-4 flex-col md:flex-row">
                <FormField
                  control={form.control}
                  name="fromTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>From</FormLabel>
                      <FormControl>
                        <TimePickerPopover value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="toTime"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>To</FormLabel>
                      <FormControl>
                        <TimePickerPopover value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>
        </FormItem>
      )}
    />
  );
}
