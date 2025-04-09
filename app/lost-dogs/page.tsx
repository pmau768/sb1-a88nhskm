"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { lostDogPosts } from "@/data/lost-dogs"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  MapPin, 
  Calendar, 
  Filter, 
  Share2, 
  FileText, 
  MessageCircle,
  Clock,
  AlertTriangle,
  CheckCircle,
  BellPlus,
  Calendar as CalendarIcon
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { format, parseISO } from "date-fns"

export default function LostDogsPage() {
  const [activeTab, setActiveTab] = useState("lost")
  const [searchQuery, setSearchQuery] = useState("")
  const [subscribedAlerts, setSubscribedAlerts] = useState(false)

  // Filter posts based on search query and active tab
  const filteredPosts = lostDogPosts.filter(post => {
    const matchesStatus = post.status === activeTab
    const matchesSearch = searchQuery === "" || 
      post.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.breed.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.lastSeenLocation.city.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesStatus && matchesSearch
  })

  // Toggle alert subscription
  const handleAlertSubscription = () => {
    setSubscribedAlerts(!subscribedAlerts)
  }

  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Lost Dog Support Network</h1>
        <p className="text-muted-foreground text-lg">
          Together we can bring them home. Our community-powered network helps reunite lost dogs with their families
          through real-time alerts, sighting reports, and coordinated search efforts.
        </p>
      </div>

      {/* Search and Filter Bar */}
      <div className="bg-muted p-4 rounded-lg mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by dog name, breed, or location..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <Button
              variant={subscribedAlerts ? "default" : "outline"}
              className="flex gap-2 items-center"
              onClick={handleAlertSubscription}
            >
              <BellPlus className="h-4 w-4" />
              {subscribedAlerts ? "Alerts On" : "Get Alerts"}
            </Button>
            <Button asChild variant="default">
              <Link href="/lost-dogs/report" className="flex gap-2 items-center">
                <AlertTriangle className="h-4 w-4" />
                Report Lost Dog
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Status Tabs */}
      <Tabs defaultValue="lost" className="mb-8" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="lost" className="flex gap-2">
            <AlertTriangle className="h-4 w-4" />
            Lost Dogs
          </TabsTrigger>
          <TabsTrigger value="found" className="flex gap-2">
            <MapPin className="h-4 w-4" />
            Found Dogs
          </TabsTrigger>
          <TabsTrigger value="reunited" className="flex gap-2">
            <CheckCircle className="h-4 w-4" />
            Reunited
          </TabsTrigger>
        </TabsList>

        {/* Lost Dogs Content */}
        <TabsContent value="lost">
          <div className="section-grid md:grid-cols-2 lg:grid-cols-3">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden card-hover">
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={post.images[0]}
                      alt={post.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge variant="destructive" className="flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" />
                        Missing
                      </Badge>
                    </div>
                    {post.reward && (
                      <div className="absolute bottom-2 right-2">
                        <Badge variant="secondary" className="bg-amber-500 text-white">
                          Reward: {post.reward}
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-bold">{post.name}</h3>
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {format(parseISO(post.lastSeenDate), "MMM d")}
                      </div>
                    </div>
                    <p className="text-muted-foreground mb-2">{post.breed}</p>
                    <div className="flex items-center text-sm mb-3 text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {post.lastSeenLocation.city}, {post.lastSeenLocation.state}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      <Badge variant="outline">{post.gender}</Badge>
                      <Badge variant="outline">{post.color}</Badge>
                      <Badge variant="outline">{post.size}</Badge>
                    </div>
                    <div className="flex justify-between mb-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Share2 className="h-3 w-3" />
                        {post.shareCount} shares
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {post.sightings.length} sightings
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Button asChild className="w-full" size="sm">
                        <Link href={`/lost-dogs/${post.id}`}>View Details</Link>
                      </Button>
                      <Button variant="outline" size="sm" className="w-full">
                        Report Sighting
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No matching lost dogs found</p>
              </div>
            )}
          </div>
        </TabsContent>

        {/* Found Dogs Content */}
        <TabsContent value="found">
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">Found a dog? Report details here to help reunite them with their family.</p>
            <Button asChild>
              <Link href="/lost-dogs/found-report">Report Found Dog</Link>
            </Button>
          </div>
        </TabsContent>

        {/* Reunited Content */}
        <TabsContent value="reunited">
          <div className="section-grid md:grid-cols-2 lg:grid-cols-3">
            {lostDogPosts.filter(post => post.status === "reunited").map((post) => (
              <Card key={post.id} className="overflow-hidden card-hover">
                <div className="relative aspect-[4/3]">
                  <Image
                    src={post.images[0]}
                    alt={post.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant="secondary" className="bg-green-500 text-white flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Reunited
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold">{post.name}</h3>
                  </div>
                  <p className="text-muted-foreground mb-2">{post.breed}</p>
                  <div className="flex items-center text-sm mb-4 text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    Missing {format(parseISO(post.lastSeenDate), "MMM d")} - {format(parseISO(post.updatedAt), "MMM d")}
                  </div>
                  <p className="text-sm mb-4">
                    {post.name} was successfully reunited with their family after 
                    {Math.round((new Date(post.updatedAt).getTime() - new Date(post.lastSeenDate).getTime()) / (1000 * 3600 * 24))} days.
                  </p>
                  <Button asChild className="w-full" size="sm">
                    <Link href={`/lost-dogs/${post.id}`}>Read Story</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Resources Section */}
      <div className="bg-muted rounded-lg p-6 mt-12">
        <h2 className="text-2xl font-bold mb-4">Lost Dog Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Emergency Contacts
              </h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Animal Control:</strong> (503) 988-7387</li>
                <li><strong>Oregon Humane Society:</strong> (503) 285-7722</li>
                <li><strong>Trek Snout Hotline:</strong> (503) 555-DOGS</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Quick Tips
              </h3>
              <ul className="space-y-2 text-sm list-disc pl-4">
                <li>Update microchip information</li>
                <li>Search at dawn and dusk</li>
                <li>Leave familiar scents at last seen location</li>
                <li>Check shelters daily in person</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-accent" />
                Search Services
              </h3>
              <ul className="space-y-2 text-sm">
                <li><strong>Pet Detectives:</strong> (503) 555-7890</li>
                <li><strong>K9 Search Team:</strong> (503) 555-4321</li>
                <li><Link href="/lost-dogs/resources" className="text-accent underline">View all resources →</Link></li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-16 text-center">
        <Button asChild size="lg" className="rounded-full">
          <Link href="/lost-dogs/report">Report a Lost Dog</Link>
        </Button>
      </div>
    </div>
  )
}