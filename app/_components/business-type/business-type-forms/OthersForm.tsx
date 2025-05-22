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

const othersFormSchema = z.object({
  businessName: z.string().min(1, "Name or business name is required"),
  industry: z.string().min(1, "Industry or nature of work is required"),
  teamSize: z.string().optional(),
  location: z.string().min(1, "Location is required"),
});

export type OthersFormValues = z.infer<typeof othersFormSchema>;


export default function OthersForm() {
  const form = useForm<OthersFormValues>({
    resolver: zodResolver(othersFormSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      teamSize: "",
      location: "",
    },
  });

  return (
    <CardContent className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })} className="space-y-6">
          <FormField
            control={form.control}
            name="businessName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Your Name or Business Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter name or business name"
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
            name="industry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Industry or Nature of Work</FormLabel>
                <FormControl>
                  <Input
                    placeholder="E.g., Law, Consulting, etc."
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
            name="teamSize"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Team Size (if applicable)</FormLabel>
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

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-semibold">Your Location</FormLabel>
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
        </form>
      </Form>
    </CardContent>
  );
}