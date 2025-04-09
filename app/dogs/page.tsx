"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FloatingActionButton } from "@/components/ui/floating-action-button"
import Image from "next/image"
import Link from "next/link"
import { adoptables } from "@/data/adoptables"
import { AlertTriangle, Filter, ArrowUpCircle } from "lucide-react"

export default function DogsPage() {
  // Client-side function to handle back to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Find Your Perfect Companion</h1>
        <p className="text-muted-foreground text-lg">
          Every dog here has been thoroughly vetted and is ready for their forever home.
          Browse our available dogs and start your journey to responsible pet guardianship.
        </p>
      </div>

      <div className="section-grid md:grid-cols-2 lg:grid-cols-3">
        {adoptables.map((dog) => (
          <Card key={dog.id} className="overflow-hidden card-hover">
            <div className="relative aspect-[4/3]">
              <Image
                src={dog.image}
                alt={dog.name}
                fill
                className="object-cover"
              />
              {dog.flagged && (
                <div className="absolute top-2 right-2">
                  <Badge variant="destructive" className="flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Priority
                  </Badge>
                </div>
              )}
            </div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl font-bold">{dog.name}</h3>
                <p className="text-muted-foreground">{dog.age}</p>
              </div>
              <p className="text-muted-foreground mb-4">{dog.breed}</p>
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div>
                  <span className="font-medium">Weight:</span> {dog.weight}
                </div>
                <div>
                  <span className="font-medium">Size:</span> {dog.size}
                </div>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {dog.personality.split(", ").slice(0, 3).map((trait) => (
                  <Badge key={trait} variant="secondary">{trait}</Badge>
                ))}
              </div>
              <Button asChild className="w-full">
                <Link href={`/dogs/${dog.id}`}>View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-muted-foreground mb-6">Found a dog you're interested in adopting?</p>
        <Button asChild size="lg" className="rounded-full">
          <Link href="/apply">Start Adoption Process</Link>
        </Button>
      </div>
      
      {/* Mobile Floating Filter Button */}
      <FloatingActionButton
        icon={<Filter className="h-5 w-5" />}
        position="bottom-right"
        visibility="scroll-up"
        aria-label="Filter dogs"
      />
      
      {/* Back to top button - client-side approach */}
      <FloatingActionButton
        icon={<ArrowUpCircle className="h-5 w-5" />}
        position="bottom-left"
        visibility="scroll-up"
        aria-label="Back to top"
        onClick={scrollToTop}
      />
    </div>
  )
}