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

const clinicFormSchema = z.object({
  clinicName: z.string().min(1, "Clinic name is required"),
  clinicType: z.string().min(1, "Clinic type is required"),
  clinicLocation: z.string().min(1, "Clinic location is required"),
});

export type ClinicFormValues = z.infer<typeof clinicFormSchema>;

export default function ClinicForm() {
  const form = useForm<ClinicFormValues>({
    resolver: zodResolver(clinicFormSchema),
    defaultValues: {
      clinicName: "",
      clinicType: "",
      clinicLocation: "",
    },
  });

  return (
    <CardContent className="p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(() => { })} className="space-y-5">
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="clinicName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Clinic Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter clinic name"
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
              name="clinicType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Clinic Type</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Medical, Dental, etc."
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
              name="clinicLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">Clinic Location</FormLabel>
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