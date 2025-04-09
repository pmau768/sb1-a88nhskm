"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { adoptables } from "@/data/adoptables"
import { AlertTriangle } from "lucide-react"

// Get first 3 dogs, prioritizing flagged ones
const getFeaturedDogs = () => {
  const flaggedDogs = adoptables.filter(dog => dog.flagged);
  const unflaggedDogs = adoptables.filter(dog => !dog.flagged);
  
  // Combine arrays, prioritizing flagged dogs first
  const orderedDogs = [...flaggedDogs, ...unflaggedDogs];
  
  // Return first 3 dogs
  return orderedDogs.slice(0, 3);
};

export function FeaturedDogs() {
  const featuredDogs = getFeaturedDogs();

  return (
    <div className="grid gap-8 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl">
      {featuredDogs.map((dog, index) => (
        <Link key={dog.id} href={`/dogs/${dog.id}`}>
          <Card className="overflow-hidden transition-transform hover:scale-[1.02] sm:hover:scale-[1.02]">
            <div className="relative aspect-[4/3]">
              <Image
                src={dog.image}
                alt={dog.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={index === 0}
                className="object-cover hover:opacity-95 transition-opacity"
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
            <CardContent className="p-5 sm:p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-2xl sm:text-xl font-bold">{dog.name}</h3>
                <span className="text-sm">{dog.age}</span>
              </div>
              <p className="text-muted-foreground mb-2">{dog.breed}</p>
              <div className="text-sm mb-3">
                <span className="font-medium">Weight:</span> {dog.weight}
              </div>
              <div className="flex flex-wrap gap-2.5 sm:gap-2">
                {dog.personality.split(", ").slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}