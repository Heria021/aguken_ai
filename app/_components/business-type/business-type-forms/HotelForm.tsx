"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const hotelFormSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelSize: z.string().min(1, "Hotel size is required"),
  hotelLocation: z.string().min(1, "Hotel location is required"),
});

export type HotelFormValues = z.infer<typeof hotelFormSchema>;

// Hotel size suggestions
const HOTEL_SIZE_SUGGESTIONS = [
  "5-10 employees",
  "15-30 employees",
  "30-50 employees",
  "50-100 employees",
  "100+ employees"
];

export default function HotelForm() {
  const form = useForm<HotelFormValues>({
    resolver: zodResolver(hotelFormSchema),
    defaultValues: {
      hotelName: "",
      hotelSize: "",
      hotelLocation: "",
    },
  });

  return (
    <CardContent className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })} className="space-y-6">
          <FormField
            control={form.control}
            name="hotelName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Hotel Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your hotel name"
                    className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelSize"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel className="text-base font-semibold">Hotel Size</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-muted text-foreground border border-border focus-visible:ring-ring w-full">
                      <SelectValue placeholder="Choose number of employees" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {HOTEL_SIZE_SUGGESTIONS.map((suggestion) => (
                      <SelectItem
                        key={suggestion}
                        value={suggestion}
                        className="text-sm font-medium"
                      >
                        {suggestion}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="hotelLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Hotel Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your hotel location"
                    className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </CardContent>
  );
}