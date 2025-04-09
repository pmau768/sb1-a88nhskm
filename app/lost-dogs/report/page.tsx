"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  AlertTriangle, 
  Clock, 
  Info, 
  MapPin,
  Camera,
  User,
  Phone,
  Mail,
  CalendarClock
} from "lucide-react"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

// Define the validation schema for the lost dog report form
const lostDogSchema = z.object({
  // Dog information
  name: z.string().min(2, { message: "Dog's name must be at least 2 characters" }),
  breed: z.string().min(2, { message: "Please specify the breed" }),
  age: z.string().min(1, { message: "Please provide the dog's age" }),
  gender: z.string().min(1, { message: "Please select a gender" }),
  color: z.string().min(2, { message: "Please specify the dog's color" }),
  size: z.string().min(1, { message: "Please select a size" }),
  weight: z.string().min(1, { message: "Please provide an approximate weight" }),
  microchipped: z.boolean().optional(),
  collarDescription: z.string().optional(),
  distinctiveFeatures: z.string().min(10, { message: "Please provide detailed distinctive features" }),

  // Last seen information
  lastSeenDate: z.string().min(1, { message: "Please select the date last seen" }),
  lastSeenTime: z.string().min(1, { message: "Please select the time last seen" }),
  lastSeenLocation: z.string().min(5, { message: "Please provide a detailed location" }),
  lastSeenCity: z.string().min(2, { message: "Please specify the city" }),
  lastSeenState: z.string().min(2, { message: "Please specify the state" }),
  lastSeenDescription: z.string().min(20, { message: "Please provide detailed circumstances" }),
  responseToName: z.boolean().optional(),
  responseToWhistle: z.boolean().optional(),
  responseToTreats: z.boolean().optional(),

  // Medical information
  medicalConditions: z.string().optional(),
  medications: z.string().optional(),

  // Contact information
  contactName: z.string().min(2, { message: "Please provide your full name" }),
  contactPhone: z.string().min(10, { message: "Please provide a valid phone number" })
    .refine((val) => /^[0-9()\-\s+]+$/.test(val), { 
      message: "Phone number can only contain digits, parentheses, spaces, plus signs, and hyphens" 
    }),
  contactEmail: z.string().email({ message: "Please provide a valid email address" }),
  contactAltPhone: z.string().optional(),

  reward: z.string().optional(),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms to proceed" })
});

type LostDogFormValues = z.infer<typeof lostDogSchema>;

export default function ReportLostDogPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fileErrors, setFileErrors] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // Initialize react-hook-form with zod validation
  const form = useForm<LostDogFormValues>({
    resolver: zodResolver(lostDogSchema),
    defaultValues: {
      // Dog information
      name: "",
      breed: "",
      age: "",
      gender: "Male",
      color: "",
      size: "Medium",
      weight: "",
      microchipped: false,
      collarDescription: "",
      distinctiveFeatures: "",

      // Last seen information
      lastSeenDate: "",
      lastSeenTime: "",
      lastSeenLocation: "",
      lastSeenCity: "",
      lastSeenState: "",
      lastSeenDescription: "",
      responseToName: true,
      responseToWhistle: false,
      responseToTreats: true,

      // Medical information
      medicalConditions: "",
      medications: "",

      // Contact information
      contactName: "",
      contactPhone: "",
      contactEmail: "",
      contactAltPhone: "",

      reward: "",
      agreeToTerms: false
    }
  });

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

  const nextStep = () => {
    // Validate the current step before proceeding
    let fieldsToValidate: string[] = [];
    
    switch (step) {
      case 1:
        fieldsToValidate = [
          "name", "breed", "age", "gender", "color", 
          "size", "weight", "distinctiveFeatures"
        ];
        break;
      case 2:
        fieldsToValidate = [
          "lastSeenDate", "lastSeenTime", "lastSeenLocation", 
          "lastSeenCity", "lastSeenState", "lastSeenDescription"
        ];
        break;
      case 3:
        fieldsToValidate = [
          "contactName", "contactPhone", "contactEmail"
        ];
        break;
    }
    
    const currentStepValid = fieldsToValidate.every(field => {
      const fieldState = form.getFieldState(field as any);
      return !fieldState.invalid;
    });
    
    // Trigger validation for the fields in the current step
    form.trigger(fieldsToValidate as any);
    
    if (currentStepValid) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      toast.error("Please fix the errors before proceeding", {
        description: "There are validation errors in the form."
      });
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = async (data: LostDogFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Verify that terms are agreed to
      if (!data.agreeToTerms) {
        toast.error("You must agree to the terms to proceed");
        return;
      }
      
      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        name: sanitizeInput(data.name),
        breed: sanitizeInput(data.breed),
        age: sanitizeInput(data.age),
        color: sanitizeInput(data.color),
        weight: sanitizeInput(data.weight),
        collarDescription: data.collarDescription ? sanitizeInput(data.collarDescription) : "",
        distinctiveFeatures: sanitizeInput(data.distinctiveFeatures),
        lastSeenLocation: sanitizeInput(data.lastSeenLocation),
        lastSeenCity: sanitizeInput(data.lastSeenCity),
        lastSeenState: sanitizeInput(data.lastSeenState),
        lastSeenDescription: sanitizeInput(data.lastSeenDescription),
        medicalConditions: data.medicalConditions ? sanitizeInput(data.medicalConditions) : "",
        medications: data.medications ? sanitizeInput(data.medications) : "",
        contactName: sanitizeInput(data.contactName),
        contactPhone: sanitizeInput(data.contactPhone),
        contactEmail: sanitizeInput(data.contactEmail),
        contactAltPhone: data.contactAltPhone ? sanitizeInput(data.contactAltPhone) : "",
        reward: data.reward ? sanitizeInput(data.reward) : "",
      };
      
      // In a real application, you would upload the files and submit the form data
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log("Lost Dog Report Submitted:", sanitizedData, "Files:", selectedFiles);
      
      toast.success("Lost dog report submitted successfully", {
        description: "We'll notify our community to help find your dog."
      });
      
      // Redirect back to the lost dogs page
      router.push("/lost-dogs");
      
    } catch (error) {
      console.error("Error submitting report:", error);
      
      toast.error("Error submitting report", {
        description: "Please try again or contact us directly for assistance."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-container max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Report a Lost Dog</h1>
      
      <Alert className="mb-8">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Time is critical</AlertTitle>
        <AlertDescription>
          The first 24 hours are crucial in finding a lost dog. 
          Complete this form quickly to mobilize our community search network.
        </AlertDescription>
      </Alert>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {[1, 2, 3, 4].map((num) => (
            <div 
              key={num} 
              className={`flex items-center justify-center w-8 h-8 rounded-full 
                ${step === num 
                  ? "bg-primary text-white" 
                  : step > num 
                    ? "bg-primary/20 text-primary" 
                    : "bg-muted text-muted-foreground"
                }`}
            >
              {step > num ? "✓" : num}
            </div>
          ))}
        </div>
        <div className="w-full bg-muted h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full transition-all" 
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              {/* Step 1: Dog Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Dog Information</h2>
                    <p className="text-muted-foreground mb-6">
                      Please provide detailed information about your dog to help people identify them.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Dog's Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="breed"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Breed</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="age"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Age</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="gender"
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
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size</FormLabel>
                          <FormControl>
                            <select
                              className="w-full px-3 py-2 border rounded-md bg-background"
                              {...field}
                            >
                              <option value="Small">Small</option>
                              <option value="Medium">Medium</option>
                              <option value="Large">Large</option>
                              <option value="XLarge">Extra Large</option>
                            </select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (approximate)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., 45 lbs"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="collarDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Collar Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Color, tags, etc. (or 'No collar')"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="microchipped"
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
                            Microchipped
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="distinctiveFeatures"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Distinctive Features</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Scars, markings, or other identifying characteristics"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <Label>Upload Photos (multiple angles are helpful)</Label>
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
                      Clear, recent photos from multiple angles help with identification.
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <Button type="button" onClick={nextStep}>
                      Next: Last Seen Information
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Last Seen Information */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Last Seen Information</h2>
                    <p className="text-muted-foreground mb-6">
                      Provide specific details about when and where your dog was last seen.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="lastSeenDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Last Seen</FormLabel>
                          <FormControl>
                            <Input
                              type="date"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastSeenTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Last Seen</FormLabel>
                          <FormControl>
                            <Input
                              type="time"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="lastSeenLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location Address/Description</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Street address, park name, or landmark"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="lastSeenCity"
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
                    <FormField
                      control={form.control}
                      name="lastSeenState"
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
                  </div>

                  <FormField
                    control={form.control}
                    name="lastSeenDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Circumstances</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe how your dog went missing (e.g., slipped collar, ran from loud noise, etc.)"
                            rows={3}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div>
                    <p className="font-medium mb-2">Dog Responds To</p>
                    <div className="grid grid-cols-3 gap-4">
                      <FormField
                        control={form.control}
                        name="responseToName"
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
                                Their Name
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="responseToWhistle"
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
                                Whistle
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="responseToTreats"
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
                                Treats/Food
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="medicalConditions"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medical Conditions (if any)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any health issues or conditions rescuers should know about"
                            rows={2}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="medications"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Medications (if any)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="List any medications your dog requires"
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
                      Next: Contact Information
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Information */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Contact Information</h2>
                    <p className="text-muted-foreground mb-6">
                      Provide your contact details so people can reach you with information about your dog.
                    </p>
                  </div>

                  <FormField
                    control={form.control}
                    name="contactName"
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
                      name="contactPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="contactAltPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternative Phone (optional)</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="reward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Reward (optional)</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., $500"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-xs">
                          If you're offering a reward, specify the amount.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep}>
                      Back
                    </Button>
                    <Button type="button" onClick={nextStep}>
                      Next: Review & Submit
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 4: Review and Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Review & Submit</h2>
                    <p className="text-muted-foreground mb-6">
                      Please review your information and submit your lost dog report.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="h-5 w-5 text-primary" />
                        <h3 className="font-bold">Dog Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><strong>Name:</strong> {form.getValues("name")}</div>
                        <div><strong>Breed:</strong> {form.getValues("breed")}</div>
                        <div><strong>Age:</strong> {form.getValues("age")}</div>
                        <div><strong>Gender:</strong> {form.getValues("gender")}</div>
                        <div><strong>Color:</strong> {form.getValues("color")}</div>
                        <div><strong>Size:</strong> {form.getValues("size")}</div>
                        <div><strong>Weight:</strong> {form.getValues("weight")}</div>
                        <div><strong>Microchipped:</strong> {form.getValues("microchipped") ? "Yes" : "No"}</div>
                        <div className="col-span-2"><strong>Collar:</strong> {form.getValues("collarDescription") || "None"}</div>
                        <div className="col-span-2"><strong>Distinctive Features:</strong> {form.getValues("distinctiveFeatures")}</div>
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-5 w-5 text-primary" />
                        <h3 className="font-bold">Last Seen Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><strong>Date:</strong> {form.getValues("lastSeenDate")}</div>
                        <div><strong>Time:</strong> {form.getValues("lastSeenTime")}</div>
                        <div className="col-span-2"><strong>Location:</strong> {form.getValues("lastSeenLocation")}</div>
                        <div><strong>City:</strong> {form.getValues("lastSeenCity")}</div>
                        <div><strong>State:</strong> {form.getValues("lastSeenState")}</div>
                        <div className="col-span-2"><strong>Circumstances:</strong> {form.getValues("lastSeenDescription")}</div>
                        <div className="col-span-2">
                          <strong>Responds To:</strong> {[
                            form.getValues("responseToName") ? "Name" : "",
                            form.getValues("responseToWhistle") ? "Whistle" : "",
                            form.getValues("responseToTreats") ? "Treats" : ""
                          ].filter(Boolean).join(", ")}
                        </div>
                        {form.getValues("medicalConditions") && (
                          <div className="col-span-2"><strong>Medical Conditions:</strong> {form.getValues("medicalConditions")}</div>
                        )}
                        {form.getValues("medications") && (
                          <div className="col-span-2"><strong>Medications:</strong> {form.getValues("medications")}</div>
                        )}
                      </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Phone className="h-5 w-5 text-primary" />
                        <h3 className="font-bold">Contact Information</h3>
                      </div>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div><strong>Name:</strong> {form.getValues("contactName")}</div>
                        <div><strong>Email:</strong> {form.getValues("contactEmail")}</div>
                        <div><strong>Phone:</strong> {form.getValues("contactPhone")}</div>
                        {form.getValues("contactAltPhone") && (
                          <div><strong>Alt Phone:</strong> {form.getValues("contactAltPhone")}</div>
                        )}
                        {form.getValues("reward") && (
                          <div><strong>Reward:</strong> {form.getValues("reward")}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <FormField
                    control={form.control}
                    name="agreeToTerms"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 pb-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="grid gap-1.5 leading-none">
                          <FormLabel>
                            I agree to the terms and conditions
                          </FormLabel>
                          <p className="text-xs text-muted-foreground">
                            By submitting this form, you consent to having your contact information displayed 
                            on the lost dog listing and agree to Trek Snout's <Link href="#" className="text-primary underline">Privacy Policy</Link>.
                          </p>
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
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Lost Dog Report"}
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Info className="h-5 w-5 text-primary" />
              <h3 className="font-bold">Important Next Steps</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              In addition to filing this report, we recommend taking these immediate actions:
            </p>
            <ul className="space-y-2 text-sm list-disc pl-4">
              <li>Contact local animal shelters and veterinary clinics</li>
              <li>Post on social media (Nextdoor, Facebook community groups, etc.)</li>
              <li>Put unwashed clothing or bedding with your scent at the location where your dog was last seen</li>
              <li>Set up a food station with your dog's favorite food and a camera if possible</li>
              <li>Post physical flyers in your neighborhood (our system will generate a printable flyer)</li>
              <li>Update your dog's microchip information if it's outdated</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}