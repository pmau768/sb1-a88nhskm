"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";

// Define the validation schema
const helpFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please provide a valid phone number" })
    .refine((val) => /^[0-9()\-\s+]+$/.test(val), { 
      message: "Phone number can only contain digits, parentheses, spaces, plus signs, and hyphens" 
    }),
  dogBehavior: z.string().min(20, { message: "Please provide more details about your dog's behavior" }),
  urgency: z.string().min(1, { message: "Please select an urgency level" }),
  message: z.string().min(30, { message: "Please provide more details about your situation" }),
});

type HelpFormValues = z.infer<typeof helpFormSchema>;

export function GetHelpForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<HelpFormValues>({
    resolver: zodResolver(helpFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      dogBehavior: "",
      urgency: "",
      message: "",
    }
  });

  const onSubmit = async (data: HelpFormValues) => {
    try {
      setIsSubmitting(true);
      
      // In a real app, you would send this data to your backend
      console.log("Form submitted:", data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Help request submitted successfully!", {
        description: "We'll contact you within 24 hours."
      });
      
      form.reset();
      setIsOpen(false);
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to submit request", {
        description: "Please try again or contact us directly."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="rounded-full">Get Help Now</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Get Help With Your Dog</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="tel" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="dogBehavior"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>What behavior issues are you experiencing?</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please describe your dog's behavior"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="urgency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How urgent is your situation?</FormLabel>
                  <FormControl>
                    <select
                      className="w-full px-3 py-2 border rounded-md bg-background"
                      {...field}
                    >
                      <option value="">Select urgency level</option>
                      <option value="low">Not urgent - Looking for general advice</option>
                      <option value="medium">Somewhat urgent - Need help soon</option>
                      <option value="high">Very urgent - Need help immediately</option>
                      <option value="emergency">Emergency - Considering surrender</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Details</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Please provide any additional context about your situation"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Get Help"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}