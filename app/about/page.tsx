import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, Users, Trophy, Brain, Dumbbell, Book, Home } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const stats = [
  {
    icon: <Shield className="h-8 w-8" />,
    value: "1,200+",
    label: "Dogs Protected",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    value: "98%",
    label: "Successful Placements",
  },
  {
    icon: <Users className="h-8 w-8" />,
    value: "5,000+",
    label: "Families Educated",
  },
  {
    icon: <Trophy className="h-8 w-8" />,
    value: "10+",
    label: "Years of Service",
  },
]

const enrichmentPillars = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Mental Stimulation",
    description: "Challenging your dog's mind prevents boredom and destructive behaviors.",
  },
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Appropriate Exercise",
    description: "Tailored physical activity that meets breed-specific needs and energy levels.",
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Structure & Boundaries",
    description: "Clear expectations and consistent rules create security and confidence.",
  },
  {
    icon: <Home className="h-8 w-8" />,
    title: "Family Integration",
    description: "True inclusion in family life with proper socialization and training.",
  },
]

export default function AboutPage() {
  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-4 sm:mb-6 text-2xl sm:text-3xl md:text-4xl">Our Mission: End Pet Abandonment</h1>
        <p className="text-muted-foreground text-base sm:text-lg px-2">
          We believe that most dogs are surrendered unnecessarily. With proper education, training, and understanding of 
          canine needs, we can prevent the heartbreak of abandonment and create lasting bonds.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 mb-16">
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=800&q=80"
            alt="Dogs playing in the park"
            fill
            className="object-cover mobile-safe-top"
          />
        </div>
        <div className="flex flex-col justify-center">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">The Problem We're Solving</h2>
          <p className="text-muted-foreground text-base sm:text-lg mb-4 sm:mb-6">
            Most dogs are surrendered due to behavioral issues that stem from unmet needs—not because
            they're "bad dogs." Their natural drives and instincts aren't being properly channeled.
          </p>
          <p className="text-muted-foreground mb-6">
            When dogs don't receive appropriate mental stimulation, structure, and purpose, they develop
            destructive behaviors like excessive barking, digging, chewing, and even aggression.
          </p>
          <p className="text-muted-foreground mb-6">
            The tragic result? Thousands of dogs are abandoned or surrendered to shelters for problems 
            that could have been prevented or corrected with proper education and training.
          </p>
          <p className="text-muted-foreground mb-6">
            At Trek Snout, we're committed to changing this pattern through education, support, and a deep
            understanding of what dogs truly need to thrive in a family environment.
          </p>
          <p className="text-muted-foreground mb-6">
            We believe that when dogs are properly integrated into the family with their needs fully met,
            they become incredible companions who enhance our lives immeasurably.
          </p>
        </div>
      </div>

      {/* Enrichment Pillars Section - NEW */}
      <div className="max-w-4xl mx-auto mb-16 bg-muted/30 rounded-xl p-8">
        <h2 className="text-2xl font-bold mb-8 text-center">The Four Pillars of Dog Enrichment</h2>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {enrichmentPillars.map((pillar, index) => (
            <Card key={index} className="border-primary/10 bg-primary/5">
              <CardContent className="p-6 text-center">
                <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/20 text-primary">
                  {pillar.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                <p className="text-muted-foreground text-sm">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-muted-foreground mb-6">
            When all four pillars are addressed, most behavioral issues resolve naturally, creating harmony between dogs and their families.
          </p>
          <Button asChild>
            <Link href="/rehoming">Learn More About Enrichment</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-2xl font-bold mb-6">Prevention Through Education</h2>
        <p className="text-muted-foreground mb-6">
          We believe in addressing the root causes of surrender and abandonment before crisis points are reached. 
          Our approach focuses on education, resources, and support to help families understand their dogs better.
        </p>
        <p className="text-muted-foreground mb-6">
          Dogs aren't disposable. They're intelligent beings with complex needs that, when properly met, 
          result in balanced, well-behaved family members who bring joy rather than frustration.
        </p>
        <p className="text-muted-foreground mb-6">
          And because this mission is bigger than all of us, 10% of all money raised
          is donated to local shelters and rescues—so fewer pets are abandoned, and
          more families get the support they need before making the difficult decision to surrender.
        </p>
        <div className="space-y-2 mb-6">
          <p>Our commitment is to ensure dogs are understood.</p>
          <p>Our commitment is to ensure their needs are met.</p>
          <p>Our commitment is to keep families together whenever possible.</p>
        </div>
        <p className="text-muted-foreground mb-6">
          Because they are not just animals. They are our companions. Our family.
          Our hearts on four legs.
        </p>
        <p className="text-xl font-bold">
          And no family member should ever be left behind.
        </p>
      </div>

      <div className="section-grid md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="card-hover">
            <CardContent className="p-4 sm:p-6 text-center">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {stat.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-bold mb-1 sm:mb-2">{stat.value}</div>
              <div className="text-sm sm:text-base text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Common Surrender Reasons - NEW */}
      <div className="max-w-4xl mx-auto mt-20 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center">Why People Surrender Their Dogs</h2>
        
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold text-xl mb-2">Behavioral Issues</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground mb-4">
                    Most common reasons for surrender:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Destructive chewing/digging</li>
                    <li>Excessive barking</li>
                    <li>House soiling</li>
                    <li>Separation anxiety</li>
                    <li>Aggression or reactivity</li>
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground mb-4">
                    The real causes:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                    <li>Insufficient mental stimulation</li>
                    <li>Unmet physical exercise needs</li>
                    <li>Lack of proper training</li>
                    <li>No clear boundaries</li>
                    <li>Misunderstood canine communication</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Lifestyle Changes</h3>
                <p className="text-muted-foreground mb-4">
                  Life changes often lead to surrender:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                  <li>Moving to pet-restricted housing</li>
                  <li>New baby or family changes</li>
                  <li>Work schedule changes</li>
                  <li>Financial concerns</li>
                </ul>
                <p className="text-sm">
                  <strong>Our approach:</strong> Providing resources, training, and support to help 
                  families adapt rather than surrender their dogs.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-bold text-xl mb-2">Unrealistic Expectations</h3>
                <p className="text-muted-foreground mb-4">
                  Common misconceptions about dog ownership:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-4">
                  <li>Underestimating exercise needs</li>
                  <li>Breed-specific traits misunderstood</li>
                  <li>Expected training to be quick/easy</li>
                  <li>Inadequate understanding of costs</li>
                </ul>
                <p className="text-sm">
                  <strong>Our solution:</strong> Education about specific breed needs and setting 
                  realistic expectations for family integration.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Help Section - NEW */}
      <div className="max-w-3xl mx-auto text-center mt-20 mb-12">
        <h2 className="text-2xl font-bold mb-6">Before You Surrender Your Dog</h2>
        <p className="text-muted-foreground mb-8">
          If you're struggling with your dog's behavior or considering surrender, please reach out. 
          We offer resources, training support, and alternatives that can transform your relationship
          with your dog and prevent unnecessary surrender.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button asChild size="lg" className="rounded-full">
            <Link href="/contact">Get Help Now</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="rounded-full">
            <Link href="/rehoming">Explore Resources</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}