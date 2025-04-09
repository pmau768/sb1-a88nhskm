'use client';
import { useSearchParams } from "next/navigation";
import { adoptables } from "@/data/adoptables";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "sonner";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Define the validation schema
const applicationSchema = z.object({
  name: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" })
    .refine((val) => /^[0-9()\-\s+]+$/.test(val), { 
      message: "Phone number can only contain digits, parentheses, spaces, plus signs, and hyphens" 
    }),
  address: z.string().min(5, { message: "Please enter your complete address" }),
  housingType: z.string().min(1, { message: "Please select your housing type" }),
  hasYard: z.string().min(1, { message: "Please select an option" }),
  otherPets: z.string().min(1, { message: "Please provide information about other pets or write 'None'" }),
  children: z.string().min(1, { message: "Please provide information about children or write 'None'" }),
  experience: z.string().min(20, { message: "Please provide more details about your experience with dogs" }),
  vetInfo: z.string().optional(),
  workSchedule: z.string().min(5, { message: "Please describe your typical work/daily schedule" }),
  message: z.string().min(30, { message: "Please tell us more about why you want to adopt this dog" }),
  agreeToTerms: z.boolean().refine(val => val === true, { message: "You must agree to the terms to proceed" })
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function ApplyPage() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "";
  const dog = adoptables.find((d) => d.id === id);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  // Initialize react-hook-form with zod validation
  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      housingType: "",
      hasYard: "",
      otherPets: "",
      children: "",
      experience: "",
      vetInfo: "",
      workSchedule: "",
      message: "",
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

  const handleSubmit = async (data: ApplicationFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);
      
      // Sanitize all text inputs
      const sanitizedData = {
        ...data,
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: sanitizeInput(data.phone),
        address: sanitizeInput(data.address),
        otherPets: sanitizeInput(data.otherPets),
        children: sanitizeInput(data.children),
        experience: sanitizeInput(data.experience),
        vetInfo: sanitizeInput(data.vetInfo || ""),
        workSchedule: sanitizeInput(data.workSchedule),
        message: sanitizeInput(data.message),
      };
      
      // In a real application, you would submit this data to your backend
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Adoption Form Submitted", { ...sanitizedData, dog });
      
      toast.success("Application submitted successfully!", {
        description: "We will contact you within 48 hours. 🐾"
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionError("There was a problem submitting your application. Please try again later.");
      
      toast.error("Application submission failed", {
        description: "Please try again or contact us directly for assistance."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!dog) return (
    <div className="section-container max-w-2xl">
      <h1 className="text-3xl font-bold mb-6">Apply to Adopt</h1>
      <p className="mb-6">Please select a dog from our adoption list first.</p>
      <Button asChild>
        <a href="/dogs">Browse Available Dogs</a>
      </Button>
    </div>
  );

  return (
    <div className="section-container max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Apply to Adopt {dog.name}</h1>
      
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="relative w-32 h-32">
              <Image
                src={dog.image}
                alt={dog.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{dog.name}</h2>
              <p className="text-muted-foreground mb-2">{dog.breed} • {dog.age} • {dog.weight}</p>
              <div className="flex flex-wrap gap-2 mb-2">
                {dog.personality.split(", ").slice(0, 3).map((trait) => (
                  <Badge key={trait} variant="secondary">{trait}</Badge>
                ))}
              </div>
              <p className="text-sm">{dog.description.substring(0, 120)}...</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {submissionError && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{submissionError}</AlertDescription>
        </Alert>
      )}
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="you@example.com" {...field} />
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
                      <Input type="tel" placeholder="(555) 123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Home Address</FormLabel>
                    <FormControl>
                      <Input placeholder="123 Main St, City, State, ZIP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Housing Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="housingType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Housing Type</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        {...field}
                      >
                        <option value="">Select Housing Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="condo">Condo</option>
                        <option value="other">Other</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hasYard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Do you have a yard?</FormLabel>
                    <FormControl>
                      <select 
                        className="w-full px-3 py-2 border rounded-md bg-background"
                        {...field}
                      >
                        <option value="">Select Answer</option>
                        <option value="yes-fenced">Yes, fenced</option>
                        <option value="yes-unfenced">Yes, unfenced</option>
                        <option value="no">No yard</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otherPets"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Other pets in the home?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="List other pets (or none)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Children in the home?</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ages of children (or none)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg mb-6">
            <h3 className="font-bold mb-2">Experience & Care</h3>
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="experience"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Experience with dogs</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe your experience with dogs"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="vetInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Veterinarian Information (if you have one)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Vet name and contact information (optional)"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="workSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Typical work/daily schedule</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="E.g., Work 9-5 weekdays, home on weekends"
                        {...field}
                      />
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
                    <FormLabel>Why do you want to adopt this particular dog?</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What makes your home a good fit for this dog?"
                        rows={4}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <FormField
              control={form.control}
              name="agreeToTerms"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-primary border-gray-300 rounded"
                        checked={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-sm cursor-pointer">
                      I agree to the adoption process including a possible home check and reference verification
                    </FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              size="lg" 
              className="rounded-full px-8"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting Application..." : "Submit Application"}
            </Button>
            
            <p className="text-sm text-muted-foreground mt-4">
              By submitting this application, you agree to our adoption process which may include
              a home visit, reference checks, and an interview to ensure the best match for both you and the dog.
            </p>
          </div>
        </form>
      </Form>
    </div>
  );
}