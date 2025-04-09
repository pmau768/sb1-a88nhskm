import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Trek Snout matched us with the perfect hiking companion. Luna has brought so much joy to our outdoor adventures!",
    author: "Sarah M.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=300&q=80",
    location: "Colorado",
  },
  {
    quote: "The adoption process was smooth and thoughtful. They really care about finding the right homes for their dogs.",
    author: "Michael R.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
    location: "Oregon",
  },
  {
    quote: "Our experience with Trek Snout was incredible. They supported us every step of the way.",
    author: "Emily K.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=300&q=80",
    location: "Washington",
  },
]

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Happy Tails
        </h2>
        <p className="text-muted-foreground max-w-[800px] mx-auto px-4 sm:px-0">
          Hear from families who found their perfect adventure companions through Trek Snout.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="relative">
            <CardContent className="pt-12 pb-8">
              <div className="absolute top-0 left-6 -translate-y-1/2 h-12 w-12 flex items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Quote className="h-6 w-6" />
              </div>
              <blockquote className="mb-6">
                <p className="text-lg">{testimonial.quote}</p>
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="relative h-12 w-12 rounded-full overflow-hidden">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <cite className="not-italic font-semibold">
                    {testimonial.author}
                  </cite>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}