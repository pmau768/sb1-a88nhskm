import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { emergencyContacts, shelterContacts, petSearchers } from "@/data/lost-dogs"
import { 
  AlertTriangle, 
  Phone, 
  FileText, 
  MapPin, 
  Printer, 
  Search, 
  Clock,
  ExternalLink,
  Download,
  CheckCircle2
} from "lucide-react"
import Link from "next/link"

export default function LostDogResourcesPage() {
  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Lost Dog Resources</h1>
        <p className="text-muted-foreground text-lg">
          We've compiled essential resources to help you find your lost dog as quickly as possible.
          Time is critical - use these tools and strategies to increase your chances of a successful reunion.
        </p>
      </div>

      <Tabs defaultValue="emergency" className="mb-12">
        <TabsList className="grid w-full md:w-auto md:inline-grid grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="emergency" className="flex gap-2 items-center">
            <AlertTriangle className="h-4 w-4" />
            Emergency
          </TabsTrigger>
          <TabsTrigger value="shelters" className="flex gap-2 items-center">
            <MapPin className="h-4 w-4" />
            Shelters
          </TabsTrigger>
          <TabsTrigger value="search" className="flex gap-2 items-center">
            <Search className="h-4 w-4" />
            Search Tips
          </TabsTrigger>
          <TabsTrigger value="toolkit" className="flex gap-2 items-center">
            <FileText className="h-4 w-4" />
            Owner Toolkit
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="emergency" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h2 className="text-xl font-bold">Emergency Contacts</h2>
              </div>
              
              <p className="mb-6">Contact these services immediately when your dog goes missing:</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {emergencyContacts.map((contact, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{contact.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                          {contact.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{contact.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <ExternalLink className="h-4 w-4 text-accent" />
                        <a href={contact.website} className="text-accent hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-lg mt-8">
                <h3 className="font-bold mb-2">First 24 Hours Checklist</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>File a lost pet report with all local shelters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Contact local veterinary clinics and emergency hospitals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Call microchip company to report lost status</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Create and distribute flyers in the area (at least 1 mile radius)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Post on social media and local community groups</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Search during dawn and dusk (when dogs are most active)</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shelters" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Local Animal Shelters</h2>
              </div>
              
              <p className="mb-6">
                Visit these shelters in person every 2-3 days. New animals arrive daily, and your dog
                could be brought in at any time.
              </p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {shelterContacts.map((shelter, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{shelter.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${shelter.phone}`} className="text-primary hover:underline">
                          {shelter.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 mb-1">
                        <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <span className="text-sm">{shelter.address}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <ExternalLink className="h-4 w-4 text-accent" />
                        <a href={shelter.website} className="text-accent hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-2">Important Shelter Tips</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li>Visit shelters in person - descriptions over the phone can be inaccurate</li>
                  <li>Check with shelters outside your immediate area - dogs can travel far</li>
                  <li>Ask to see all dogs, including those in quarantine or medical holds</li>
                  <li>Leave clear photos of your dog with shelter staff</li>
                  <li>Don't assume your dog will be quickly recognized as a lost pet</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="search" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Search className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Professional Search Resources</h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-8">
                {petSearchers.map((searcher, index) => (
                  <Card key={index} className="overflow-hidden">
                    <CardContent className="p-4">
                      <h3 className="font-bold mb-2">{searcher.name}</h3>
                      <div className="flex items-center gap-2 mb-1">
                        <Phone className="h-4 w-4 text-primary" />
                        <a href={`tel:${searcher.phone}`} className="text-primary hover:underline">
                          {searcher.phone}
                        </a>
                      </div>
                      <div className="flex items-start gap-2 mb-1">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground shrink-0 mt-1" />
                        <span className="text-sm">{searcher.specialties}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <ExternalLink className="h-4 w-4 text-accent" />
                        <a href={searcher.website} className="text-accent hover:underline text-sm" target="_blank" rel="noopener noreferrer">
                          Visit Website
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h3 className="font-bold mb-4">Expert Search Strategies</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-2">For Shy/Scared Dogs</h4>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Don't chase - this can push them further away</li>
                      <li>Set up feeding stations with familiar food</li>
                      <li>Use trail cameras to monitor without human presence</li>
                      <li>Place unwashed clothing or bedding with your scent</li>
                      <li>Consider humane traps with professional guidance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">For Social/Friendly Dogs</h4>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Walk with other dogs your dog knows in the last seen area</li>
                      <li>Bring familiar toys that make recognizable sounds</li>
                      <li>Carry treats and call in a positive, upbeat voice</li>
                      <li>Post sightings in real-time to coordinate search efforts</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Search Timing</h4>
                    <ul className="space-y-1 list-disc pl-5 text-sm">
                      <li>Focus on dawn and dusk (dogs are most active)</li>
                      <li>Search during quiet times for better hearing</li>
                      <li>Bring flashlights for night searches to spot eye reflections</li>
                      <li>Be consistent - check the same areas repeatedly</li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="toolkit" className="mt-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Lost Dog Owner Toolkit</h2>
              </div>
              
              <p className="mb-6">
                Download these resources to aid in your search efforts:
              </p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-8">
                <Card className="border-dashed border-2 hover:border-primary transition-colors">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <Printer className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Printable Flyer Template</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      High-visibility flyer designed to catch attention
                    </p>
                    <Button variant="outline" className="w-full mt-auto flex gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border-2 hover:border-primary transition-colors">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <FileText className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Lost Dog Checklist</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Day-by-day action items to maximize your chances
                    </p>
                    <Button variant="outline" className="w-full mt-auto flex gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border-2 hover:border-primary transition-colors">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <MapPin className="h-10 w-10 text-primary mb-2" />
                    <h3 className="font-bold mb-1">Search Grid Map</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Organize your search using this methodical grid system
                    </p>
                    <Button variant="outline" className="w-full mt-auto flex gap-2">
                      <Download className="h-4 w-4" />
                      Download PDF
                    </Button>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-muted p-4 rounded-lg mb-8">
                <h3 className="font-bold mb-2">Online Resources</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-accent" />
                    <a href="#" className="text-accent hover:underline">Missing Pet Partnership</a>
                    <span className="text-muted-foreground">- Expert guidance on search techniques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-accent" />
                    <a href="#" className="text-accent hover:underline">PetFBI.org</a>
                    <span className="text-muted-foreground">- National lost pet database</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-accent" />
                    <a href="#" className="text-accent hover:underline">Nextdoor.com</a>
                    <span className="text-muted-foreground">- Neighborhood-specific alerts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4 text-accent" />
                    <a href="#" className="text-accent hover:underline">Pawboost.com</a>
                    <span className="text-muted-foreground">- Lost pet alerts on social media</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <h3 className="font-bold mb-4">Preventative Measures</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">ID & Microchipping</h4>
                    <p className="text-sm text-muted-foreground">
                      Ensure your dog always wears an ID tag and has an up-to-date microchip.
                      Keep microchip registry information current with your latest contact details.
                    </p>
                  </div>
                  <div className="bg-card p-4 rounded-lg border">
                    <h4 className="font-medium mb-2">GPS & Safety</h4>
                    <p className="text-sm text-muted-foreground">
                      Consider GPS collars for dogs prone to wandering. Use secure harnesses
                      for dogs that slip collars easily. Keep gates secured and check fences regularly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Our team of volunteers is ready to assist with your search efforts.
          We can help coordinate search parties, distribute flyers, and provide guidance.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/lost-dogs/report">Report a Lost Dog</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="tel:(503) 555-DOGS">Call Our Hotline: (503) 555-DOGS</a>
          </Button>
        </div>
      </div>
    </div>
  )
}