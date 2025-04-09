import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Heart, CheckCircle, AlertCircle, Brain, Book, Target, Dumbbell } from "lucide-react"
import { GetHelpForm } from "@/components/get-help-form"
import Link from "next/link"
import Image from "next/image"

const preventionSteps = [
  {
    icon: <Brain className="h-8 w-8" />,
    title: "Mental Stimulation",
    description: "Most behavioral issues stem from boredom. We'll help you understand your dog's cognitive needs and how to meet them.",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "Purpose & Drive",
    description: "Every dog breed has specific drives and needs. Learn to channel these appropriately to prevent problem behaviors.",
  },
  {
    icon: <Dumbbell className="h-8 w-8" />,
    title: "Appropriate Exercise",
    description: "Different breeds need different types of exercise. We'll help tailor a plan specific to your dog's needs.",
  },
  {
    icon: <Book className="h-8 w-8" />,
    title: "Training Support",
    description: "Access resources, videos, and expert guidance to help with common training challenges.",
  },
]

const faqs = [
  {
    question: "My dog is destructive when left alone. Is there any hope?",
    answer: "Absolutely! Destructive behavior when alone often indicates separation anxiety or boredom. With proper mental stimulation, gradual desensitization training, and possibly tools like puzzle toys or slow feeders, most dogs show dramatic improvement within 2-4 weeks of consistent work."
  },
  {
    question: "My dog is reactive on leash and I can't walk him anymore. What can I do?",
    answer: "Leash reactivity is one of the most common issues that lead to surrender, but it's also highly treatable. Through proper counter-conditioning, understanding threshold distances, and managing your dog's environment, we can help transform your walking experience."
  },
  {
    question: "We have a new baby and our dog is acting out. Do we need to rehome?",
    answer: "This transition can be challenging, but rarely requires rehoming. Most dogs simply need time to adjust, clear boundaries, and to maintain their routine and exercise needs. We offer specific protocols for safely integrating dogs with new family members."
  },
]

export default function RehomingPage() {
  return (
    <div className="section-container">
      <div className="section-title">
        <h1 className="mb-6">Before You Surrender Your Dog</h1>
        <p className="text-muted-foreground text-lg">
          Most behavioral problems that lead to surrender can be resolved with the right 
          understanding, training approach, and meeting your dog's fundamental needs.
        </p>
      </div>

      <div className="section-grid md:grid-cols-2 lg:grid-cols-4 mb-16">
        {preventionSteps.map((step, index) => (
          <Card key={index} className="text-center card-hover">
            <CardContent className="pt-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                {step.icon}
              </div>
              <h3 className="mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div className="relative aspect-video rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1522276498395-f4f68f7f8454?auto=format&fit=crop&w=800&q=80"
            alt="Person training dog"
            fill
            className="object-cover"
          />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Common Issues We Can Help With</h2>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">1</div>
              <div>
                <p className="font-medium">Destructive Behavior</p>
                <p className="text-muted-foreground text-sm">Chewing, digging, and destroying household items can be redirected with proper outlets for natural drives.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">2</div>
              <div>
                <p className="font-medium">Excessive Barking</p>
                <p className="text-muted-foreground text-sm">Understanding why your dog barks is the first step to addressing this common concern.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">3</div>
              <div>
                <p className="font-medium">Leash Reactivity & Aggression</p>
                <p className="text-muted-foreground text-sm">These behaviors often stem from fear or insecurity and can be addressed with proper training techniques.</p>
              </div>
            </li>
            <li className="flex gap-3">
              <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center flex-shrink-0 mt-1">4</div>
              <div>
                <p className="font-medium">House Training Issues</p>
                <p className="text-muted-foreground text-sm">Even adult dogs can be successfully house-trained with consistency and the right approach.</p>
              </div>
            </li>
          </ul>
          
          <div className="mt-8">
            <GetHelpForm />
          </div>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div key={index} className="space-y-2">
              <h3 className="font-bold text-lg">{faq.question}</h3>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Success Stories Section - NEW */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Dogs Saved From Surrender</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80"
                  alt="Labrador Retriever"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Max's Story</h3>
              <p className="text-muted-foreground mb-4">
                "Max was destroying our home when left alone. We were at our wit's end. After learning about his 
                exercise needs and implementing enrichment activities, he's a completely different dog."
              </p>
              <p className="text-sm font-medium">— The Anderson Family</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1553882809-a4f57e95cbc1?auto=format&fit=crop&w=300&q=80"
                  alt="Border Collie"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Bella's Transformation</h3>
              <p className="text-muted-foreground mb-4">
                "Our Border Collie was constantly nipping at the kids and herding them. We almost gave up, but the 
                training guidance helped us channel her herding instincts appropriately."
              </p>
              <p className="text-sm font-medium">— The Garcia Family</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
                <Image
                  src="https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?auto=format&fit=crop&w=300&q=80"
                  alt="German Shepherd"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-bold text-xl mb-2">Duke's Journey</h3>
              <p className="text-muted-foreground mb-4">
                "Our German Shepherd's anxiety and reactivity made walks impossible. Learning about threshold training 
                and proper mental stimulation completely transformed our relationship."
              </p>
              <p className="text-sm font-medium">— The Johnson Family</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* When Rehoming Is Necessary Section */}
      <div className="max-w-3xl mx-auto bg-muted/50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-4 text-center">When Rehoming Is Truly Necessary</h2>
        <p className="text-muted-foreground mb-6">
          While we believe most dogs can stay with their families with the right support, 
          we recognize that sometimes rehoming is the most responsible choice:
        </p>
        
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="bg-amber-500/20 text-amber-500 rounded-full p-1 flex-shrink-0 mt-1">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Severe Financial Hardship</p>
              <p className="text-sm text-muted-foreground">
                When you can no longer afford proper veterinary care or food for your dog.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-amber-500/20 text-amber-500 rounded-full p-1 flex-shrink-0 mt-1">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Major Health Changes</p>
              <p className="text-sm text-muted-foreground">
                When serious illness or disability prevents you from providing necessary care.
              </p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="bg-amber-500/20 text-amber-500 rounded-full p-1 flex-shrink-0 mt-1">
              <AlertCircle className="h-4 w-4" />
            </div>
            <div>
              <p className="font-medium">Severe and Dangerous Aggression</p>
              <p className="text-sm text-muted-foreground">
                When a dog has shown severe aggression that hasn't responded to professional intervention and poses a genuine safety risk.
              </p>
            </div>
          </div>
        </div>
        
        <p className="text-sm text-center mb-6">
          If you're in one of these situations, we can still help ensure your dog finds an appropriate new home.
        </p>
        
        <div className="flex justify-center">
          <Button asChild variant="outline">
            <Link href="/rehoming/submit">Submit a Rehoming Request</Link>
          </Button>
        </div>
      </div>

      <div className="max-w-2xl mx-auto">
        <Card className="bg-primary/10 border-primary/20">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Need Help With Your Dog?</h2>
            <p className="text-muted-foreground mb-6">
              Don't give up. Most behavioral issues can be resolved with the right approach, 
              consistent training, and proper understanding of your dog's needs.
            </p>
            <GetHelpForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}