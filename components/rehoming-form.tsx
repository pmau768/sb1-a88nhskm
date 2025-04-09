"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { toast } from "sonner";
import { Camera } from "lucide-react";
import { useRouter } from "next/navigation";

// Define the validation schema
const rehomingSchema = z.object({
  // Dog Information
  dogName: z.string().min(2, { message: "Dog's name must be at least 2 characters" }),
  dogBreed: z.string().min(2, { message: "Please specify the breed" }),
  dogAge: z.string().min(1, { message: "Please provide the dog's age" }),
  dogGender: z.string().min(1, { message: "Please select a gender" }),
  dogSize: z.string().min(1, { message: "Please select a size" }),
  dogWeight: z.string().min(1, { message: "Please provide an approximate weight" }),
  dogTemperament: z.string().min(10, { message: "Please describe your dog's temperament in detail" }),
  goodWithKids: z.string().min(1, { message: "Please select an option" }),
  goodWithDogs: z.string().min(1, { message: "Please select an option" }),
  goodWithCats: z.string().min(1, { message: "Please select an option" }),
  activityLevel: z.string().min(1, { message: "Please select an option" }),
  housetrained: z.boolean().optional(),
  specialNeeds: z.string().optional(),
  medicalConditions: z.string().optional(),
  
  // Owner Information
  ownerName: z.string().min(2, { message: "Please provide your full name" }),
  ownerEmail: z.string().email({ message: "Please provide a valid email address" }),
  ownerPhone: z.string().min(10, { message: "Please provide a valid phone number" })
    .refine((val) => /^[0-9()\-\s+]+$/.test(val), { 
      message: "Phone number can only contain digits, parentheses, spaces, plus signs, and hyphens" 
    }),
  ownerAddress: z.string().min(5, { message: "Please provide your complete address" }),
  ownerCity: z.string().min(2, { message: "Please provide your city" }),
  ownerState: z.string().min(2, { message: "Please provide your state" }),
  ownerZip: z.string().min(5, { message: "Please provide a valid ZIP code" }),
  
  // Rehoming Reason
  rehomingReason: z.string().min(30, { message: "Please provide a detailed explanation (at least 30 characters)" }),
  timeframe: z.string().min(1, { message: "Please select a timeframe" }),
  
  // Agreement
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms to proceed" })
});

type RehomingFormValues = z.infer<typeof rehomingSchema>;

export function RehomingForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Initialize form
  const form = useForm<RehomingFormValues>({
    resolver: zodResolver(rehomingSchema),
    defaultValues: {
      // Dog Information
      dogName: "",
      dogBreed: "",
      dogAge: "",
      dogGender: "Male",
      dogSize: "Medium",
      dogWeight: "",
      dogTemperament: "",
      goodWithKids: "",
      goodWithDogs: "",
      goodWithCats: "",
      activityLevel: "Moderate",
      housetrained: true,
      specialNeeds: "",
      medicalConditions: "",
      
      // Owner Information
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      ownerAddress: "",
      ownerCity: "",
      ownerState: "",
      ownerZip: "",
      
      // Rehoming Reason
      rehomingReason: "",
      timeframe: "Within 1 month",
      
      // Agreement
      agreeToTerms: false
    }
  });
  
  // Handle file uploads
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Create a new errors array
    const newErrors = [...fileErrors];
    
    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      newErrors[index] = "Please upload an image file (JPG, PNG, GIF, or WebP)";
      setFileErrors(newErrors);
      return;
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      newErrors[index] = "File size must be less than 5MB";
      setFileErrors(newErrors);
      return;
    }
    
    // Clear any previous error for this file
    newErrors[index] = "";
    setFileErrors(newErrors);
    
    // Update the files array
    const newFiles = [...selectedFiles];
    newFiles[index] = file;
    setSelectedFiles(newFiles);
  };
  
  // Simple sanitization function to prevent XSS attacks
  const sanitizeInput = (input: string) => {
    return input
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#x27;")
      .replace(/\//g, "&#x2F;");
  };
  
  // Handle form navigation
  const nextStep = () => {
    // Determine which fields to validate based on current step
    let fieldsToValidate: string[] = [];
    
    switch (currentStep) {
      case 1: // Dog basic information
        fieldsToValidate = [
          "dogName", "dogBreed", "dogAge", "dogGender", "dogSize", "dogWeight"
        ];
        break;
      case 2: // Dog behavior
        fieldsToValidate = [
          "dogTemperament", "goodWithKids", "goodWithDogs", "goodWithCats", "activityLevel"
        ];
        break;
      case 3: // Owner information
        fieldsToValidate = [
          "ownerName", "ownerEmail", "ownerPhone", "ownerAddress", "ownerCity", "ownerState", "ownerZip"
        ];
        break;
    }
    
    // Trigger validation for the specified fields
    const isValid = form.trigger(fieldsToValidate as any);
    
    isValid.then(valid => {
      if (valid) {
        setCurrentStep(prev => prev + 1);
        window.scrollTo(0, 0);
      } else {
        toast.error("Please fix the errors before proceeding", {
          description: "There are validation errors in the form."
        });
      }
    });
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };
  
  // Handle form submission
  const onSubmit = async (data: RehomingFormValues) => {
    try {
      setIsSubmitting(true);
      
      // In a real application, this would send data to a backend
      // For now, we'll just simulate an API call
      console.log("Rehoming form submitted:", data, "Files:", selectedFiles);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Rehoming request submitted successfully", {
        description: "We'll contact you within 24-48 hours to discuss next steps."
      });
      
      // Redirect to confirmation page or back to rehoming page
      router.push("/rehoming?success=true");
      
    } catch (error) {
      console.error("Error submitting form:", error);
      
      toast.error("Failed to submit rehoming request", {
        description: "Please try again or contact us directly for assistance."
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Card className="max-w-3xl mx-auto">
      <CardContent className="p-6">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {[1, 2, 3, 4].map((num) => (
              <div 
                key={num} 
                className={`flex items-center justify-center w-8 h-8 rounded-full 
                  ${currentStep === num 
                    ? "bg-primary text-white" 
                    : currentStep > num 
                      ? "bg-primary/20 text-primary" 
                      : "bg-muted text-muted-foreground"
                  }`}
              >
                {currentStep > num ? "✓" : num}
              </div>
            ))}
          </div>
          <div className="w-full bg-muted h-2 rounded-full">
            <div 
              className="bg-primary h-2 rounded-full transition-all" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {/* Step 1: Basic Dog Information */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Dog Information</h2>
                <p className="text-muted-foreground mb-4">
                  Please provide detailed information about your dog to help us find the perfect match.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="dogName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dog's Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Buddy" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dogBreed"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Breed</FormLabel>
                        <FormControl>
                          <Input placeholder="Labrador Retriever or Mixed Breed" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dogAge"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input placeholder="2 years" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dogGender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dogSize"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Size</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="Small">Small (Under 25 lbs)</option>
                            <option value="Medium">Medium (25-50 lbs)</option>
                            <option value="Large">Large (50-90 lbs)</option>
                            <option value="XLarge">Extra Large (90+ lbs)</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dogWeight"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Weight</FormLabel>
                        <FormControl>
                          <Input placeholder="45 lbs" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div>
                  <FormLabel htmlFor="photos">Dog Photos (multiple angles help)</FormLabel>
                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[0, 1, 2, 3].map((index) => (
                      <div key={index} className="space-y-1">
                        <div 
                          className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-colors text-muted-foreground"
                          onClick={() => document.getElementById(`photo-${index}`)?.click()}
                        >
                          {selectedFiles[index] ? (
                            <div className="text-center">
                              <Camera className="h-8 w-8 mb-2 text-primary" />
                              <span className="text-xs">
                                {selectedFiles[index].name.length > 15 
                                  ? selectedFiles[index].name.substring(0, 15) + "..." 
                                  : selectedFiles[index].name}
                              </span>
                            </div>
                          ) : (
                            <>
                              <Camera className="h-8 w-8 mb-2" />
                              <span className="text-xs text-center">Upload Photo {index + 1}</span>
                            </>
                          )}
                        </div>
                        <input
                          id={`photo-${index}`}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleFileChange(e, index)}
                        />
                        {fileErrors[index] && (
                          <p className="text-xs text-red-500">{fileErrors[index]}</p>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Clear, recent photos showing your dog's face, body, and size help potential adopters.
                  </p>
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={nextStep}>
                    Next: Dog Behavior
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 2: Dog Behavior */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Behavior & Compatibility</h2>
                <p className="text-muted-foreground mb-4">
                  Understanding your dog's personality will help us find the most suitable home.
                </p>
                
                <FormField
                  control={form.control}
                  name="dogTemperament"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Dog's Temperament & Personality</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Describe your dog's personality, behavior traits, and temperament" 
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormField
                    control={form.control}
                    name="goodWithKids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Good with Children?</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="">Select</option>
                            <option value="Yes - All Ages">Yes - All Ages</option>
                            <option value="Yes - Older Children">Yes - Older Children (8+)</option>
                            <option value="No">No</option>
                            <option value="Unknown">Unknown</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="goodWithDogs"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Good with Other Dogs?</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="">Select</option>
                            <option value="Yes - All Dogs">Yes - All Dogs</option>
                            <option value="Selective">Selective</option>
                            <option value="No">No</option>
                            <option value="Unknown">Unknown</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="goodWithCats"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Good with Cats?</FormLabel>
                        <FormControl>
                          <select
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                            <option value="Unknown">Unknown</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="activityLevel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Activity Level</FormLabel>
                      <FormControl>
                        <select
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          {...field}
                        >
                          <option value="Low">Low - Short walks, mostly relaxing</option>
                          <option value="Moderate">Moderate - Regular walks, some play</option>
                          <option value="High">High - Long walks, runs, active play</option>
                          <option value="Very High">Very High - Requires extensive exercise</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="housetrained"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          Housetrained
                        </FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="specialNeeds"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Special Needs or Requirements</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Needs fenced yard, No stairs, etc. (leave blank if none)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="medicalConditions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Conditions</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please list any medical conditions or ongoing treatments (leave blank if none)"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next: Your Information
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 3: Owner Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Your Information</h2>
                <p className="text-muted-foreground mb-4">
                  Please provide your contact details so we can discuss the rehoming process.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="ownerName"
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
                  <FormField
                    control={form.control}
                    name="ownerEmail"
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
                </div>
                
                <FormField
                  control={form.control}
                  name="ownerPhone"
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
                
                <FormField
                  control={form.control}
                  name="ownerAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="col-span-2">
                    <FormField
                      control={form.control}
                      name="ownerCity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="ownerState"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="ownerZip"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ZIP Code</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button type="button" onClick={nextStep}>
                    Next: Rehoming Details
                  </Button>
                </div>
              </div>
            )}
            
            {/* Step 4: Rehoming Reason & Submission */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold mb-4">Rehoming Details</h2>
                <p className="text-muted-foreground mb-4">
                  This information helps us understand your situation and find the best possible home for your dog.
                </p>
                
                <FormField
                  control={form.control}
                  name="rehomingReason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Reason for Rehoming</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please explain why you need to rehome your dog" 
                          rows={5}
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Understanding your reasons helps us find an appropriate new home.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="timeframe"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Timeframe for Rehoming</FormLabel>
                      <FormControl>
                        <select
                          className="w-full px-3 py-2 border rounded-md bg-background"
                          {...field}
                        >
                          <option value="Immediately">Immediately (Emergency)</option>
                          <option value="Within 1 week">Within 1 week</option>
                          <option value="Within 1 month">Within 1 month</option>
                          <option value="Within 3 months">Within 3 months</option>
                          <option value="Flexible">Flexible (No specific timeframe)</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="font-medium mb-2">What happens next?</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm">
                    <li>Our team will review your submission within 24-48 hours</li>
                    <li>We'll contact you to gather additional information and photos if needed</li>
                    <li>We'll create a detailed profile for your dog and begin the matching process</li>
                    <li>You'll be involved in approving potential adopters</li>
                    <li>We'll arrange meetings and handle the transition process</li>
                    <li>We provide follow-up support for both you and the adopter</li>
                  </ol>
                </div>
                
                <FormField
                  control={form.control}
                  name="agreeToTerms"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          I agree to Trek Snout's rehoming policies and process
                        </FormLabel>
                        <FormDescription>
                          By submitting this form, you agree to work exclusively with Trek Snout for a period of 30 days to find a suitable home for your dog.
                        </FormDescription>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting || !form.getValues("agreeToTerms")}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Rehoming Request"}
                  </Button>
                </div>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}