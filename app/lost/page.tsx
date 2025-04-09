import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search, MapPin, Bell, Share2 } from "lucide-react"
import Link from "next/link"

const features = [
  {
    icon: <Search className="h-8 w-8" />,
    title: "Immediate Search Support",
    description: "Our network of volunteers begins searching immediately upon report.",
  },
  {
    icon: <MapPin className="h-8 w-8" />,
    title: "Location Tracking",
    description: "Track and map sightings to help locate your lost companion.",
  },
  {
    icon: <Bell className="h-8 w-8" />,
    title: "Alert Network",
    description: "Instant alerts to local shelters and rescue organizations.",
  },
  {
    icon: <Share2 className="h-8 w-8" />,
    title: "Community Outreach",
    description: "Share across social networks and local community groups.",
  },
]

export default function LostPage() {
  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Lost Dog Support</h1>
        <p className="text-muted-foreground text-lg">
          Time is critical when a dog is lost. Our network of volunteers and resources
          is ready to help bring your companion home safely.
        </p>
      </div>

      <div className="section-grid md:grid-cols-2 lg:grid-cols-4 mb-16">
        {features.map((feature, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {feature.icon}
              </div>
              <h3 className="mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-destructive text-destructive-foreground">
          <CardContent className="p-6 text-center">
            <h2 className="mb-4">Lost Your Dog?</h2>
            <p className="mb-6">
              Don't wait. The sooner you report a lost dog, the better the chances of finding them.
              Our team is ready to help 24/7.
            </p>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full bg-white text-destructive hover:bg-white/90"
              asChild
            >
              <Link href="/lost-dogs/report">Report Lost Dog</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="text-center mt-16">
        <h2 className="text-2xl font-bold mb-6">Community-Powered Search Network</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
          Our lost dog support system connects you with a community of volunteers, resources, 
          and tools to maximize your chances of reuniting with your dog.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/lost-dogs">Browse Lost Dogs</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/lost-dogs/resources">Search Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}