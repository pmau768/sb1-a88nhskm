"use client"

import { RehomingForm } from "@/components/rehoming-form"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RehomingRequestPage() {
  return (
    <div className="section-container">
      <Button 
        asChild 
        variant="outline" 
        className="mb-6"
      >
        <Link href="/rehoming">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Rehoming
        </Link>
      </Button>
      
      <div className="section-title">
        <h1 className="mb-6">Submit a Rehoming Request</h1>
        <p className="text-muted-foreground text-lg">
          We understand that the decision to rehome your dog is difficult. 
          Our process ensures your dog finds a loving, carefully-vetted home.
        </p>
      </div>
      
      <Alert className="max-w-3xl mx-auto mb-12 border-primary/20 bg-primary/5">
        <AlertTriangle className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary">Important Information</AlertTitle>
        <AlertDescription className="text-sm">
          <p>
            Trek Snout is committed to finding the best possible homes for dogs in need of rehoming. 
            Our process includes:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Thorough screening of all potential adopters</li>
            <li>Home visits to ensure the environment is safe and suitable</li>
            <li>Reference checks including veterinary references</li>
            <li>Adoptive contracts that protect your dog's interests</li>
            <li>Follow-up support for both you and the adopter</li>
          </ul>
        </AlertDescription>
      </Alert>
      
      <RehomingForm />
    </div>
  )
}