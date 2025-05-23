"use client";

import { useState } from "react";
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
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnimatePresence, motion } from "framer-motion";
import { Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

// Schema
const phoneEntrySchema = z.object({
  countryCode: z.string().min(1, "Select country code"),
  phone: z
    .string()
    .min(10, "Invalid phone number")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  description: z.string().optional(),
});

export type PhoneEntry = z.infer<typeof phoneEntrySchema>;

interface CallRoutingFormProps {
  onSubmit?: (data: PhoneEntry[]) => void;
  onBack?: () => void;
}

export default function CallRoutingForm({ onSubmit, onBack }: CallRoutingFormProps) {
  const [phoneEntries, setPhoneEntries] = useState<PhoneEntry[]>([]);

  const form = useForm<PhoneEntry>({
    resolver: zodResolver(phoneEntrySchema),
    defaultValues: {
      countryCode: "IN",
      phone: "",
      description: "",
    },
  });

  const addPhoneEntry = (data: PhoneEntry) => {
    setPhoneEntries([...phoneEntries, data]);
    form.reset();
  };

  const removePhoneEntry = (index: number) => {
    setPhoneEntries(phoneEntries.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (onSubmit && phoneEntries.length > 0) {
      onSubmit(phoneEntries);
    }
  };

  const handleLocalBack = () => {
    if (onBack) {
      onBack();
    }
  };

  return (
    <div>
      <Card className="bg-background text-foreground border border-border p-6">
        <CardContent className="space-y-6 p-0">

          <Form {...form}>
            <form onSubmit={form.handleSubmit(addPhoneEntry)} className="space-y-8">
              <div className="space-y-4">
                <FormLabel className="text-base font-semibold">Phone Numbers to Forward Calls To</FormLabel>

                <div className="space-y-2">
                  <FormLabel className="text-sm text-muted-foreground">Phone Number</FormLabel>
                  <div className="flex">
                    <FormField
                      control={form.control}
                      name="countryCode"
                      render={({ field }) => (
                        <div className="relative">
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-muted text-foreground border border-border  focus-visible:ring-ring rounded-r-none border-r-0">
                                <SelectValue placeholder="IN" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-popover text-popover-foreground">
                              <SelectItem value="IN">IN</SelectItem>
                              <SelectItem value="US">US</SelectItem>
                              <SelectItem value="UK">UK</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    />

                    <div className="flex-1 flex">
                      <div className="bg-muted border border-border border-r-0 border-l-0 flex items-center pr-3 text-muted-foreground">
                        {form.watch("countryCode") === "IN" ? "+91" :
                          form.watch("countryCode") === "US" ? "+1" : "+44"}
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormControl>
                              <Input
                                placeholder="Enter phone number"
                                className="bg-muted text-foreground border border-border focus-visible:ring-ring rounded-l-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">Format: +91 xxxxx xxxxx</p>
                </div>
              </div>

              <Separator className="my-6" />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base font-semibold">Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Add a description (optional)"
                        className="bg-muted text-foreground border border-border focus-visible:ring-ring"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-black/90"
                >
                  Add
                </Button>
              </div>
            </form>
          </Form>

          {/* Phone Entries List */}
          {phoneEntries.length > 0 && (
            <div className="mt-8 border-t border-border pt-6">
              <h3 className="text-base font-semibold mb-4">Added Items:</h3>
              <div className="space-y-4">
                <AnimatePresence>
                  {phoneEntries.map((entry, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="p-4 bg-muted rounded-md border border-border relative"
                    >
                      <div className="pr-8">
                        <h4 className="font-medium mb-2">Phone Numbers to Forward Calls To #{index + 1}</h4>
                        <div className="space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">Phone Number:</span>{" "}
                            {entry.countryCode === "IN" ? "+91" : entry.countryCode === "US" ? "+1" : "+44"} {entry.phone}
                          </p>
                          {entry.description && (
                            <p className="text-sm">
                              <span className="font-medium">Description:</span>{" "}
                              {entry.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhoneEntry(index)}
                        className="absolute top-3 right-3 text-gray-400 hover:text-destructive"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between p-0 pt-6 mt-4">
          <Button variant="ghost" onClick={handleLocalBack} className="text-gray-500">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={phoneEntries.length === 0}
            className="bg-indigo-600 hover:bg-indigo-700 text-white"
          >
            Continue
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
