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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardContent } from "@/components/ui/card";

const eventFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  teamSize: z.string().min(1, "Team size is required"),
  officeLocation: z.string().min(1, "Office location is required"),
});

export type EventFormValues = z.infer<typeof eventFormSchema>;


export default function EventForm() {
  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      companyName: "",
      teamSize: "",
      officeLocation: "",
    },
  });

  return (
    <CardContent className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })} className="space-y-5">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Company Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter company name"
                      className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="teamSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Team Size</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Number of team members"
                      type="number"
                      className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-2">
            <FormField
              control={form.control}
              name="officeLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Office Location</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="City, Country"
                      className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </CardContent>
  );
}