import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RevealOnScroll } from "@/components/features/RevealOnScroll";
import { BackgroundWrapper } from "@/components/features/BackgroundWrapper";
import { 
  Search, 
  Heart, 
  AlertTriangle, 
  MapPin, 
  ArrowRight, 
  Check, 
  Star, 
  PawPrint,
  Shield,
  Users,
  Trophy,
  Brain,
  Book,
  Home,
  Target
} from "lucide-react";
import { adoptables } from "@/data/adoptables";
import { lostDogPosts } from "@/data/lost-dogs";

// Featured dogs (prioritizing flagged ones)
const featuredDogs = adoptables
  .sort((a, b) => (a.flagged === b.flagged ? 0 : a.flagged ? -1 : 1))
  .slice(0, 3);

// Recent lost dogs
const recentLostDogs = lostDogPosts
  .filter(dog => dog.status === "lost")
  .slice(0, 2);

export default function HomePage() {
  return (
    <>
      {/* Hero Section with Split Design */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/60" />
          <div className="absolute top-0 left-0 w-1/2 h-full bg-primary/5 hidden lg:block" />
          <div className="absolute top-0 right-0 w-1/2 h-full bg-muted/30 hidden lg:block" />
          <div className="absolute top-0 left-0 right-0 h-full md:w-full bg-[radial-gradient(circle_at_40%_40%,rgba(0,0,0,0),rgba(0,0,0,0.2)_60%)]" />
        </div>
        
        <div className="container relative z-10 px-4 md:px-6 flex flex-col lg:flex-row items-center gap-8 md:gap-12 py-16 md:py-24">
          <div className="flex-1 text-center lg:text-left max-w-3xl">
            <Badge className="mb-6 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 uppercase tracking-wider">
              End Pet Abandonment
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.1]">
              <span className="block">Your Dog Deserves</span>
              <span className="text-primary">More Than Basic Care</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-muted-foreground">
              Dogs aren't just pets—they're family members with needs beyond food and shelter.
              They need purpose, enrichment, and to be integrated into family life.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mt-6">
              <Button asChild size="lg" className="rounded-full px-8">
                <Link href="/dogs">Find Your Companion</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/about">Stop Pet Abandonment</Link>
              </Button>
            </div>
            
            <div className="flex items-center justify-center lg:justify-start mt-10 gap-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">1,200+</p>
                <p className="text-sm text-muted-foreground">Dogs Protected</p>
              </div>
              <div className="h-10 border-l border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">98%</p>
                <p className="text-sm text-muted-foreground">Placement Success</p>
              </div>
              <div className="h-10 border-l border-border"></div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary">5,000+</p>
                <p className="text-sm text-muted-foreground">Owners Educated</p>
              </div>
            </div>
          </div>
          
          <div className="relative flex-1 w-full max-w-md lg:max-w-xl">
            <div className="absolute -left-6 -top-6 w-2/3 h-2/3 bg-primary/5 rounded-2xl hidden md:block"></div>
            <div className="absolute -right-6 -bottom-6 w-2/3 h-2/3 bg-muted/30 rounded-2xl hidden md:block"></div>
            
            <div className="relative shadow-2xl rounded-2xl overflow-hidden aspect-[5/4]">
              <Image 
                src="https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=crop&w=1200&q=80"
                alt="Happy dog with owner engaging in enrichment activity"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center animate-bounce">
          <ArrowRight className="h-6 w-6 rotate-90 text-muted-foreground" />
        </div>
      </section>
      
      {/* Enrichment & Engagement Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Why Dogs Need More
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prevent Abandonment Through Enrichment</h2>
            <p className="text-muted-foreground text-lg">
              Most behavioral problems stem from unmet needs. Dogs are intelligent creatures with natural drives that require fulfillment—neglecting these leads to problems that often result in abandonment.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <RevealOnScroll>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                  <Brain className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Mental Stimulation</h3>
                  <p className="text-muted-foreground mb-6">
                    Dogs need mental challenges as much as physical exercise. Boredom and frustration lead to destructive behaviors that often result in surrender or abandonment.
                  </p>
                  <Button asChild variant="outline" className="w-full group">
                    <Link href="/about" className="flex items-center justify-between">
                      Enrichment Ideas
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center">
                  <Target className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Purpose & Drive</h3>
                  <p className="text-muted-foreground mb-6">
                    Every dog has natural drives and instincts. Channeling these into appropriate activities fulfills their needs and prevents problematic behaviors that lead to rehoming.
                  </p>
                  <Button asChild variant="outline" className="w-full group">
                    <Link href="/rehoming" className="flex items-center justify-between">
                      Finding Their Purpose
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.4}>
              <Card className="overflow-hidden border-none shadow-lg">
                <div className="relative h-48 bg-gradient-to-br from-destructive to-destructive/60 flex items-center justify-center">
                  <Home className="h-16 w-16 text-white" />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-2xl font-bold mb-3">Family Integration</h3>
                  <p className="text-muted-foreground mb-6">
                    Dogs aren't meant to live isolated in backyards or kennels. They're social animals who need to be properly integrated into family life with consistent boundaries.
                  </p>
                  <Button asChild variant="outline" className="w-full group">
                    <Link href="/about" className="flex items-center justify-between">
                      Integration Strategies
                      <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </RevealOnScroll>
          </div>
        </div>
      </section>
      
      {/* Featured Dogs Section */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12">
            <div className="mb-6 md:mb-0">
              <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                Find Your Match
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">Featured Dogs</h2>
            </div>
            <Button asChild variant="outline" className="group">
              <Link href="/dogs" className="flex items-center">
                View All Dogs
                <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredDogs.map((dog, index) => (
              <RevealOnScroll key={dog.id} delay={index * 0.1}>
                <Link href={`/dogs/${dog.id}`} className="block transition hover:scale-[1.02] duration-300">
                  <Card className="overflow-hidden h-full border-none shadow-lg">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={dog.image}
                        alt={dog.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover transition duration-500 hover:scale-110"
                      />
                      {dog.flagged && (
                        <div className="absolute top-3 right-3">
                          <Badge variant="destructive" className="px-3 py-1">Priority</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-2xl font-bold">{dog.name}</h3>
                        <Badge variant="outline">{dog.age}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{dog.breed}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {dog.personality.split(", ").slice(0, 3).map((trait) => (
                          <Badge key={trait} variant="secondary">{trait}</Badge>
                        ))}
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center text-muted-foreground">
                          <PawPrint className="h-4 w-4 mr-1" />
                          <span>{dog.size} • {dog.weight}</span>
                        </div>
                        <Button size="sm" variant="link" className="font-semibold">
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Emergency/Lost Dog Section */}
      <section className="py-16 bg-destructive/5 border-y border-destructive/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex-1">
              <Badge className="mb-4 px-3 py-1 text-sm bg-destructive/20 text-destructive border-destructive/30">
                Emergency
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Lost Dog Support</h2>
              <p className="text-lg mb-6">
                Time is critical when a dog is lost. Our network of volunteers and resources
                is ready to help bring your companion home safely.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="rounded-full">
                  <Link href="/lost-dogs/report">Report a Lost Dog</Link>
                </Button>
                <Button asChild variant="outline" className="rounded-full">
                  <Link href="/lost-dogs">Browse Lost Dogs</Link>
                </Button>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {recentLostDogs.map((dog) => (
                  <Link href={`/lost-dogs/${dog.id}`} key={dog.id}>
                    <Card className="overflow-hidden border-destructive/20 hover:border-destructive/40 transition-all duration-300">
                      <div className="flex items-center p-4">
                        <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 mr-4 border-2 border-destructive/20">
                          <Image
                            src={dog.images[0]}
                            alt={dog.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold">{dog.name}</h3>
                            <Badge variant="outline" className="text-xs bg-destructive/20 text-destructive border-destructive/30">
                              Missing
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{dog.breed}</p>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {dog.lastSeenLocation.city}, {dog.lastSeenLocation.state}
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Prevention Education Section - NEW */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent transform -skew-y-6"></div>
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-tl from-muted/40 to-transparent transform skew-y-6"></div>
        </div>
        
        <div className="container relative z-10 px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <RevealOnScroll>
              <div>
                <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
                  Prevention Through Education
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                  Don't Give Up—We Can Help
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                  The majority of dogs are surrendered due to behavioral issues that could be resolved with proper training, 
                  enrichment, and understanding of their natural drives and needs.
                </p>
                
                <ul className="space-y-4 mb-8">
                  {[
                    {
                      icon: <Check className="h-5 w-5 text-primary" />,
                      text: "Dogs have natural drives that need channeling—when these are fulfilled, problem behaviors disappear"
                    },
                    {
                      icon: <Check className="h-5 w-5 text-primary" />,
                      text: "Mental stimulation is as important as physical exercise—boredom leads to destruction"
                    },
                    {
                      icon: <Check className="h-5 w-5 text-primary" />,
                      text: "Setting clear boundaries and expectations creates security, not restriction"
                    },
                    {
                      icon: <Check className="h-5 w-5 text-primary" />,
                      text: "With proper integration, your dog becomes an asset to your family, not a burden"
                    }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="mr-3 flex-shrink-0 mt-1 bg-primary/10 p-1 rounded-full">
                        {item.icon}
                      </span>
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
                
                <Button asChild className="rounded-full">
                  <Link href="/rehoming">Learn Before You Surrender</Link>
                </Button>
              </div>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2} direction="left">
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-2/3 h-2/3 rounded-lg bg-primary/5 -z-10"></div>
                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-lg bg-muted/30 -z-10"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?auto=format&fit=crop&w=600&q=80"
                      alt="Dog engaging in training exercise"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1534351450181-ea9f78427fe8?auto=format&fit=crop&w=600&q=80"
                      alt="Family playing with dog"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=600&q=80"
                      alt="Dog with enrichment toy"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                    <Image
                      src="https://images.unsplash.com/photo-1601758065893-25c11bfa69b5?auto=format&fit=crop&w=600&q=80"
                      alt="Dog on a hike with owner"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge className="mb-4 px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20">
              Success Stories
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Transformation Through Education</h2>
            <p className="text-muted-foreground text-lg">
              Hear from families who were about to surrender their dogs, but found success through proper training, enrichment, and family integration.
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute top-0 left-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2">
              <div className="w-full h-full rounded-full bg-primary/5 flex items-center justify-center">
                <Star className="h-10 w-10 text-primary/20" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {[
                {
                  quote: "We were ready to rehome Luna due to her destructive behavior, but learning about her herding drive changed everything. Now she has 'jobs' throughout the day and is the perfect companion.",
                  author: "Sarah M.",
                  image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
                  location: "Colorado"
                },
                {
                  quote: "Max's constant barking and anxiety nearly broke our family. Trek Snout taught us how to provide proper mental stimulation and structure. He's now calm and confident.",
                  author: "Michael R.",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
                  location: "Oregon"
                },
                {
                  quote: "Understanding that Bailey needed more than walks changed everything. Now she has puzzle toys, training sessions, and clear boundaries. She's a different dog—one we couldn't imagine surrendering.",
                  author: "Emily K.",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
                  location: "Washington"
                }
              ].map((testimonial, index) => (
                <RevealOnScroll key={index} delay={index * 0.1}>
                  <BackgroundWrapper intensity="low">
                    <Card className="h-full border-none shadow-lg">
                      <CardContent className="p-6">
                        <div className="mb-6">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="h-5 w-5 fill-current text-primary" />
                            ))}
                          </div>
                        </div>
                        <blockquote className="mb-6 text-lg">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center">
                          <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src={testimonial.image}
                              alt={testimonial.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-bold">{testimonial.author}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </BackgroundWrapper>
                </RevealOnScroll>
              ))}
            </div>
            
            <div className="absolute bottom-0 right-0 w-24 h-24 translate-x-1/2 translate-y-1/2">
              <div className="w-full h-full rounded-full bg-primary/5 flex items-center justify-center">
                <Star className="h-10 w-10 text-primary/20" />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section with Modern Design */}
      <section className="py-24">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              {
                icon: <Shield className="h-10 w-10" />,
                value: "1,200+",
                label: "Dogs Protected",
              },
              {
                icon: <Heart className="h-10 w-10" />,
                value: "98%",
                label: "Successful Placements",
              },
              {
                icon: <Users className="h-10 w-10" />,
                value: "5,000+",
                label: "Families Educated",
              },
              {
                icon: <Trophy className="h-10 w-10" />,
                value: "10+",
                label: "Years of Service",
              },
            ].map((stat, index) => (
              <RevealOnScroll key={index} delay={index * 0.1}>
                <Card className="border-none shadow-lg relative overflow-hidden h-full group hover:shadow-2xl transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <CardContent className="p-6 flex flex-col items-center text-center relative z-10 h-full">
                    <div className="mb-6 p-4 bg-primary/10 rounded-full">
                      <div className="text-primary">{stat.icon}</div>
                    </div>
                    <div className="text-4xl font-bold mb-2">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section className="py-24 bg-primary/5">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Don't Give Up On Your Dog
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Before you consider surrendering, let us help you understand your dog's needs and transform your relationship.
              Most behavioral issues can be resolved with the right education and approach.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Button asChild variant="default" size="lg" className="rounded-full">
                <Link href="/dogs">Adopt</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full">
                <Link href="/rehoming">Get Help First</Link>
              </Button>
              <Button asChild variant="secondary" size="lg" className="rounded-full">
                <Link href="/lost-dogs">Lost Dog</Link>
              </Button>
            </div>
            
            <p className="text-muted-foreground">
              Have questions about your dog's behavior? <Link href="/contact" className="text-primary underline">Contact us</Link> or 
              call our helpline at <span className="font-semibold">(555) 123-4567</span>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}