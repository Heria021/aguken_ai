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
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WelcomeFooter from "./footer";

// Schema
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  countryCode: z.string().min(1, "Select country code"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
});

export type WelcomeFormValues = z.infer<typeof formSchema>;

interface WelcomeFormProps {
  onSubmit: (data: WelcomeFormValues) => void;
}

export default function WelcomeForm({ onSubmit }: WelcomeFormProps) {
  const form = useForm<WelcomeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      countryCode: "IN",
      phone: "",
    },
  });

  // Phone format mapping based on country code
  const phoneFormats = {
    IN: "+91 xxxxxx xxxxx",
    US: "+1 (xxx) xxx-xxxx",
    UK: "+44 xxxx xxxxxx",
  };

  // Country code prefixes
  const countryCodePrefixes = {
    IN: "+91 ",
    US: "+1 ",
    UK: "+44 ",
  };

  // Get current country code value
  const countryCode = form.watch("countryCode");

  return (
    <div>
      <Card className="bg-background text-foreground border border-border p-4">
        <CardContent className="space-y-4 p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-muted-foreground">Nice to meet you, I'm</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your name"
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
                name="countryCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold text-muted-foreground">You can reach out at</FormLabel>
                    <div className="flex relative">
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-muted text-foreground border border-border focus-visible:ring-ring rounded-r-none w-[70px]">
                            <SelectValue placeholder="IN" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-popover text-popover-foreground">
                          <SelectItem value="IN">IN</SelectItem>
                          <SelectItem value="US">US</SelectItem>
                          <SelectItem value="UK">UK</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <div className="relative">
                                <div className="absolute text-sm font-medium left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                                  {countryCodePrefixes[countryCode as keyof typeof countryCodePrefixes]}
                                </div>
                                <Input
                                  placeholder="Enter phone number"
                                  type="number"
                                  inputMode="numeric"
                                  className="bg-muted text-foreground border border-border focus-visible:ring-ring rounded-l-none border-l-0 pl-10"
                                  {...field}
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Format: {phoneFormats[countryCode as keyof typeof phoneFormats]}</p>
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Continue
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <WelcomeFooter />
    </div>
  );
}