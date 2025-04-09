"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { LostDogMap } from "@/components/lost-dog-map"
import { SocialShareButtons } from "@/components/social-share-buttons"
import { format, parseISO } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { LostDogPost } from "@/data/lost-dogs"
import { 
  MapPin, 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock, 
  Printer, 
  Eye, 
  Share2, 
  MessageCircle, 
  PlusCircle,
  Info
} from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

interface LostDogDetailsClientProps {
  post: LostDogPost;
}

// Define the validation schema for the sighting report form
const sightingFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  phone: z.string().min(10, { message: "Please enter a valid phone number" })
    .refine((val) => /^[0-9()\-\s+]+$/.test(val), { 
      message: "Phone number can only contain digits, parentheses, spaces, plus signs, and hyphens" 
    }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional().or(z.literal('')),
  location: z.string().min(5, { message: "Please provide a detailed location" }),
  date: z.string().min(1, { message: "Please select a date" }),
  time: z.string().min(1, { message: "Please select a time" }),
  description: z.string().min(20, { message: "Please provide a detailed description (at least 20 characters)" })
});

type SightingFormValues = z.infer<typeof sightingFormSchema>;

export function LostDogDetailsClient({ post }: LostDogDetailsClientProps) {
  const [selectedImage, setSelectedImage] = useState(post.images[0])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fileError, setFileError] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Initialize react-hook-form with zod validation
  const form = useForm<SightingFormValues>({
    resolver: zodResolver(sightingFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      location: "",
      date: "",
      time: "",
      description: ""
    }
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFileError(null);
    
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setFileError("Please upload an image file (JPG, PNG, GIF, or WebP)");
        setSelectedFile(null);
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setFileError("File size must be less than 5MB");
        setSelectedFile(null);
        return;
      }
      
      setSelectedFile(file);
    }
  };

  const handleSightingSubmit = async (data: SightingFormValues) => {
    try {
      setIsSubmitting(true);
      
      // In a real application, you would upload the file and submit the form data to your backend
      // Simulate an API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Log the sanitized data
      console.log("Sighting submitted:", {
        ...data,
        // Sanitize inputs to prevent XSS
        name: sanitizeInput(data.name),
        location: sanitizeInput(data.location),
        description: sanitizeInput(data.description),
        fileAttached: selectedFile ? true : false
      });
      
      // Success message
      toast.success("Thank you for reporting this sighting", {
        description: "The owner has been notified of your report."
      });
      
      // Reset the form
      form.reset();
      setSelectedFile(null);
      
    } catch (error) {
      console.error("Error submitting sighting:", error);
      toast.error("Unable to submit your sighting report", {
        description: "Please try again later or contact support."
      });
    } finally {
      setIsSubmitting(false);
    }
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

  const generateFlyerUrl = () => {
    // In a real app, this would generate a PDF - here we're just simulating
    console.log("Generating flyer for:", post.name)
    toast.info("Generating flyer", {
      description: "Your flyer is being prepared for printing."
    });
  }

  // Format last seen date nicely
  const formattedLastSeenDate = format(parseISO(post.lastSeenDate), "MMMM d, yyyy 'at' h:mm a")
  
  // Calculate days missing
  const daysMissing = Math.round(
    (new Date().getTime() - new Date(post.lastSeenDate).getTime()) / (1000 * 3600 * 24)
  )

  return (
    <div className="section-container">
      <Button asChild variant="outline" className="mb-8">
        <Link href="/lost-dogs">← Back to Lost Dogs</Link>
      </Button>

      {/* Status Header */}
      <div className={`mb-8 p-4 rounded-lg ${
        post.status === "lost" ? 
          "bg-red-500/10 border border-red-500/30" : 
          "bg-green-500/10 border border-green-500/30"
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {post.status === "lost" ? (
              <>
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <span className="font-bold text-red-500">MISSING: {daysMissing} days</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span className="font-bold text-green-500">REUNITED</span>
              </>
            )}
            <span className="text-muted-foreground">Last seen on {formattedLastSeenDate}</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="outline" onClick={generateFlyerUrl} className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print Flyer
            </Button>
            <SocialShareButtons title={`Help find ${post.name}`} />
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Image Gallery */}
        <div>
          <div className="relative aspect-[4/3] mb-4 rounded-lg overflow-hidden">
            <Image
              src={selectedImage}
              alt={post.name}
              fill
              className="object-cover"
            />
            {post.reward && (
              <div className="absolute top-4 right-4">
                <Badge variant="secondary" className="bg-amber-500 text-white">
                  Reward: {post.reward}
                </Badge>
              </div>
            )}
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {post.images.map((image, index) => (
              <div 
                key={index} 
                className={`relative w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${
                  selectedImage === image ? "border-primary" : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image}
                  alt={`${post.name} - image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dog Details */}
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.name}</h1>
          <div className="flex flex-wrap gap-2 mb-3">
            <Badge>{post.breed}</Badge>
            <Badge variant="outline">{post.gender}</Badge>
            <Badge variant="outline">{post.age}</Badge>
          </div>
          
          <div className="flex items-center gap-2 mb-6 text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Last seen near {post.lastSeenLocation.address}, {post.lastSeenLocation.city}, {post.lastSeenLocation.state}</span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold">Color</p>
              <p>{post.color}</p>
            </div>
            <div>
              <p className="font-semibold">Size</p>
              <p>{post.size} ({post.weight})</p>
            </div>
            <div>
              <p className="font-semibold">Collar</p>
              <p>{post.collarDescription || "None"}</p>
            </div>
            <div>
              <p className="font-semibold">Microchipped</p>
              <p>{post.microchipped ? "Yes" : "No"}</p>
            </div>
          </div>

          <div className="mb-6">
            <p className="font-semibold">Distinctive Features</p>
            <p>{post.distinctiveFeatures}</p>
          </div>

          <div className="mb-6">
            <p className="font-semibold">Circumstances</p>
            <p>{post.lastSeenDescription}</p>
          </div>

          {post.medicalConditions && (
            <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-md mb-6 flex items-start gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-semibold text-amber-500">Medical Conditions</p>
                <p>{post.medicalConditions}</p>
                {post.medications && <p><strong>Medications:</strong> {post.medications}</p>}
              </div>
            </div>
          )}

          <div className="bg-muted p-4 rounded-lg mb-6">
            <p className="font-semibold mb-2">Responds To</p>
            <div className="grid grid-cols-3 gap-2">
              <div className={`p-2 rounded-md text-center ${post.responseToName ? "bg-green-500/10" : "bg-muted-foreground/10"}`}>
                <p className="font-medium">{post.name}</p>
                <p className="text-xs">{post.responseToName ? "Yes" : "No"}</p>
              </div>
              <div className={`p-2 rounded-md text-center ${post.responseToWhistle ? "bg-green-500/10" : "bg-muted-foreground/10"}`}>
                <p className="font-medium">Whistle</p>
                <p className="text-xs">{post.responseToWhistle ? "Yes" : "No"}</p>
              </div>
              <div className={`p-2 rounded-md text-center ${post.responseToTreats ? "bg-green-500/10" : "bg-muted-foreground/10"}`}>
                <p className="font-medium">Treats</p>
                <p className="text-xs">{post.responseToTreats ? "Yes" : "No"}</p>
              </div>
            </div>
          </div>

          <div className="bg-primary/10 p-4 rounded-lg">
            <p className="font-semibold mb-2">Contact Information</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-primary" />
                <p>{post.contactInfo.phone}</p>
              </div>
              {post.contactInfo.altPhone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary" />
                  <p>{post.contactInfo.altPhone}</p>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <p>{post.contactInfo.email}</p>
              </div>
              <p className="text-xs">Contact name: {post.contactInfo.name}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Map and Sightings */}
      <Tabs defaultValue="map" className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="map" className="flex gap-2">
            <MapPin className="h-4 w-4" />
            Map & Sightings
          </TabsTrigger>
          <TabsTrigger value="report" className="flex gap-2">
            <PlusCircle className="h-4 w-4" />
            Report Sighting
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="map">
          <Card>
            <CardContent className="p-6">
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-2">Last Known Location & Sightings</h3>
                <p className="text-muted-foreground mb-4">
                  {post.name} was last seen near {post.lastSeenLocation.address}. The map below shows
                  the last confirmed location and subsequent sightings.
                </p>
                
                <div className="h-[350px] w-full bg-muted rounded-lg mb-8 overflow-hidden">
                  <LostDogMap post={post} />
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Reported Sightings ({post.sightings.length})</h3>
                {post.sightings.length > 0 ? (
                  <div className="space-y-4">
                    {post.sightings.map((sighting) => (
                      <div key={sighting.id} className="border rounded-lg p-4">
                        <div className="flex justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{format(parseISO(sighting.date), "MMM d, yyyy 'at' h:mm a")}</span>
                          </div>
                          <Badge variant={sighting.verified ? "secondary" : "outline"} className={sighting.verified ? "bg-green-500 text-white" : ""}>
                            {sighting.verified ? "Verified" : "Unverified"}
                          </Badge>
                        </div>
                        
                        <div className="flex items-start gap-3 mb-3">
                          <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                          <span>
                            {sighting.location.address}, {sighting.location.city}, {sighting.location.state}
                          </span>
                        </div>
                        
                        <p className="mb-3">{sighting.description}</p>
                        
                        {sighting.image && (
                          <div className="relative h-48 w-full mb-3 rounded-md overflow-hidden">
                            <Image
                              src={sighting.image}
                              alt="Sighting photo"
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        
                        <div className="text-sm text-muted-foreground">
                          Reported by {sighting.contactInfo.name}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No sightings reported yet.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="report">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Report a Sighting</h3>
              <p className="text-muted-foreground mb-6">
                If you believe you've seen {post.name}, please provide as much detail as possible.
                Your report could be crucial in bringing them home.
              </p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSightingSubmit)} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
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
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email (optional)</FormLabel>
                            <FormControl>
                              <Input type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location Where Dog Was Seen</FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Street address, park name, or clear description" 
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
                      name="date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date Seen</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="time"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time Seen</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="md:col-span-2">
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Describe what you saw. Was the dog running, walking, with someone? Include any details about appearance or behavior."
                                rows={4}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <FormLabel className="block text-sm font-medium mb-1">Photo (optional)</FormLabel>
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {fileError && (
                        <p className="text-sm text-red-500 mt-1">{fileError}</p>
                      )}
                      <p className="text-xs text-muted-foreground mt-1">
                        If you were able to take a photo, please upload it here (max 5MB).
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center mt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit Sighting"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Post Stats */}
      <div className="flex justify-center gap-8 items-center text-muted-foreground mb-8">
        <div className="flex items-center gap-1">
          <Eye className="h-4 w-4" />
          <span>{post.viewCount} views</span>
        </div>
        <div className="flex items-center gap-1">
          <Share2 className="h-4 w-4" />
          <span>{post.shareCount} shares</span>
        </div>
        <div className="flex items-center gap-1">
          <MessageCircle className="h-4 w-4" />
          <span>{post.sightings.length} sightings</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="h-4 w-4" />
          <span>
            {post.status === "lost" 
              ? `Missing for ${daysMissing} days` 
              : `Found after ${Math.round((new Date(post.updatedAt).getTime() - new Date(post.lastSeenDate).getTime()) / (1000 * 3600 * 24))} days`
            }
          </span>
        </div>
      </div>

      {/* More Resources */}
      <div className="bg-muted p-6 rounded-lg">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-primary" />
          <h3 className="text-xl font-bold">Helpful Resources</h3>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h4 className="font-bold mb-2">Local Shelters</h4>
            <ul className="space-y-2 text-sm">
              <li>Multnomah County Animal Services</li>
              <li>Oregon Humane Society</li>
              <li>DoveLewis Emergency Hospital</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Search Tips</h4>
            <ul className="space-y-2 text-sm list-disc pl-4">
              <li>Search during dawn and dusk</li>
              <li>Bring familiar items that smell like home</li>
              <li>Use a familiar squeaky toy</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-2">Next Steps</h4>
            <ul className="space-y-2 text-sm list-disc pl-4">
              <li>Post flyers within a 3-mile radius</li>
              <li>Check and post on Nextdoor</li>
              <li>Contact microchip registry</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button asChild variant="outline">
            <Link href="/lost-dogs/resources">View All Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}