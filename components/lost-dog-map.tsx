"use client"

import { useEffect, useRef, useState } from "react"
import { LostDogPost } from "@/data/lost-dogs"

interface LostDogMapProps {
  post: LostDogPost
}

export function LostDogMap({ post }: LostDogMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // This is a placeholder for an actual map implementation
    // In a real application, you would integrate with a map service like Google Maps, Mapbox, or Leaflet
    if (mapRef.current) {
      // Simulate map loading
      const timer = setTimeout(() => {
        setMapLoaded(true)
      }, 500)

      return () => clearTimeout(timer)
    }
  }, [post])

  return (
    <div ref={mapRef} className="w-full h-full relative flex items-center justify-center bg-muted">
      {!mapLoaded ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
          <p>Loading map...</p>
        </div>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
          <p className="mb-2 text-muted-foreground">This is a placeholder for a map component.</p>
          <p className="text-sm">In a real implementation, this would show:</p>
          <ul className="text-sm list-disc text-left mt-2">
            <li>Last seen location: {post.lastSeenLocation.address}</li>
            <li>Coordinates: {post.lastSeenLocation.coordinates?.lat}, {post.lastSeenLocation.coordinates?.lng}</li>
            <li>Reported sightings: {post.sightings.length}</li>
          </ul>
          <p className="mt-4 text-sm text-muted-foreground">
            The map would be implemented using Google Maps, Mapbox, or a similar service.
          </p>
        </div>
      )}
    </div>
  )
}