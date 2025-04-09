"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, AlertTriangle, HelpCircle, BookOpen, Lightbulb, MessageSquare } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { toast } from "sonner"
import { Alert, AlertDescription } from "@/components/ui/alert"

const contactInfo = [
  {
    icon: <Phone className="h-6 w-6" />,
    title: "Phone",
    details: ["(555) 123-4567", "Emergency: (555) 999-8888"],
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email",
    details: ["help@treksnout.com", "behavior@treksnout.com"],
  },
  {
    icon: <MapPin className="h-6 w-6" />,
    title: "Location",
    details: ["123 Rescue Lane", "Portland, OR 97201"],
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Hours",
    details: ["Mon-Fri: 9am-6pm", "Sat-Sun: 10am-4pm"],
  },
]

const supportServices = [
  {
    icon: <HelpCircle className="h-6 w-6 text-primary" />,
    title: "Behavior Hotline",
    description: "Immediate phone support for urgent behavioral issues. Get quick advice to handle challenging situations.",
  },
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: "Training Resources",
    description: "Access our library of guides, videos, and step-by-step training protocols for common issues.",
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-primary" />,
    title: "Enrichment Consulting",
    description: "Schedule a consultation to develop a custom enrichment plan for your dog's specific needs and drives.",
  },
  {
    icon: <MessageSquare className="h-6 w-6 text-primary" />,
    title: "Support Groups",
    description: "Connect with other dog owners facing similar challenges in our facilitated support groups.",
  },
]

// Define the validation schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(5, { message: "Subject must be at least 5 characters" }),
  message: z.string().min(20, { message: "Message must be at least 20 characters" }),
  dogIssue: z.string().optional(),
  urgencyLevel: z.string().optional(),
})

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Initialize react-hook-form with zod validation
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      dogIssue: "",
      urgencyLevel: "medium"
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

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      // Sanitize all text inputs
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        subject: sanitizeInput(data.subject),
        message: sanitizeInput(data.message),
        dogIssue: data.dogIssue ? sanitizeInput(data.dogIssue) : undefined,
        urgencyLevel: data.urgencyLevel
      };
      
      // In a real application, you would submit this data to your backend
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Contact Form Submitted", sanitizedData);
      
      toast.success("Message sent successfully!", {
        description: "We'll get back to you as soon as possible."
      });
      
      form.reset();
      
    } catch (error) {
      console.error("Error submitting contact form:", error);
      
      setFormError("There was a problem sending your message. Please try again later or contact us directly via phone.");
      
      toast.error("Failed to send message", {
        description: "Please try again or contact us directly via phone."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Get Support</h1>
        <p className="text-muted-foreground text-lg">
          Don't give up on your dog. Our team is here to provide resources, training guidance, 
          and support to help resolve behavioral issues and prevent unnecessary surrender.
        </p>
      </div>

      {/* Support Services Section - NEW */}
      <div className="section-grid md:grid-cols-2 lg:grid-cols-4 mb-16">
        {supportServices.map((service, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {service.icon}
              </div>
              <h3 className="mb-3 font-bold">{service.title}</h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Contact Card Section */}
      <div className="section-grid md:grid-cols-2 lg:grid-cols-4 mb-16">
        {contactInfo.map((info, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {info.icon}
              </div>
              <h3 className="mb-3">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-muted-foreground">
                  {detail}
                </p>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <Card>
          <CardContent className="p-6">
            <h2 className="mb-8 text-center text-2xl font-bold">Request Support</h2>
            
            {formError && (
              <Alert variant="destructive" className="mb-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>{formError}</AlertDescription>
              </Alert>
            )}
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your name" {...field} aria-required="true" />
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
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="your@email.com" {...field} aria-required="true" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* New fields for behavioral support */}
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="dogIssue"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>What issue are you experiencing?</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="">Select an issue (optional)</option>
                            <option value="destructive">Destructive behavior</option>
                            <option value="barking">Excessive barking</option>
                            <option value="reactivity">Leash reactivity</option>
                            <option value="separation">Separation anxiety</option>
                            <option value="housetraining">House training issues</option>
                            <option value="aggression">Aggression/resource guarding</option>
                            <option value="other">Other behavioral issue</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="urgencyLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Urgency Level</FormLabel>
                        <FormControl>
                          <select 
                            className="w-full px-3 py-2 border rounded-md bg-background"
                            {...field}
                          >
                            <option value="low">Low - General inquiry</option>
                            <option value="medium">Medium - Needs assistance soon</option>
                            <option value="high">High - Considering surrender</option>
                            <option value="emergency">Emergency - Immediate help needed</option>
                          </select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="How can we help?" {...field} aria-required="true" />
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
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Please describe your situation in detail. The more information you provide, the better we can help." 
                          className="min-h-[150px]"
                          {...field}
                          aria-required="true"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="text-center">
                  <Button 
                    size="lg" 
                    className="rounded-full"
                    type="submit"
                    disabled={isSubmitting}
                    aria-disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Emergency Support Box - NEW */}
        <Card className="mt-8 border-amber-500/30 bg-amber-500/5">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              <h3 className="font-bold text-lg text-amber-500">Need Immediate Help?</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              If you're facing an emergency situation with your dog or feel you have no option but surrender, 
              please call our emergency hotline immediately.
            </p>
            <div className="bg-amber-500/10 p-4 rounded-lg text-center mb-4">
              <p className="font-bold text-lg">(555) 999-8888</p>
              <p className="text-sm text-muted-foreground">Available 24/7 for urgent situations</p>
            </div>
            <p className="text-sm text-muted-foreground">
              Our crisis intervention team can provide immediate guidance and resources to help you 
              through difficult situations and prevent unnecessary surrender.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}