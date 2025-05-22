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

const hotelFormSchema = z.object({
  hotelName: z.string().min(1, "Hotel name is required"),
  hotelSize: z.string().min(1, "Hotel size is required"),
  hotelLocation: z.string().min(1, "Hotel location is required"),
});

export type HotelFormValues = z.infer<typeof hotelFormSchema>;

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
                    placeholder="E.g., Lake View Resort"
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
              <FormItem>
                <FormLabel className="text-base font-semibold">Hotel Size</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g., 20"
                    type="number"
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
            name="hotelLocation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Hotel Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g., Jaipur, India"
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