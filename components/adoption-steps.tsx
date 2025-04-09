import { Check, ClipboardList, Heart, UserPlus } from "lucide-react"

const steps = [
  {
    icon: <ClipboardList className="h-8 w-8" />,
    title: "1. Initial Contact",
    description: "Tell us about your commitment to protecting a pet's future.",
  },
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: "2. Thorough Screening",
    description: "We carefully evaluate your ability to provide a safe forever home.",
  },
  {
    icon: <Heart className="h-8 w-8" />,
    title: "3. Home Safety Check",
    description: "We verify your home meets our strict safety standards.",
  },
  {
    icon: <Check className="h-8 w-8" />,
    title: "4. Lifelong Support",
    description: "Our commitment doesn't end with adoption. We're here for life.",
  },
]

export function AdoptionSteps() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Our Guardian Process
        </h2>
        <p className="text-muted-foreground max-w-[800px] mx-auto">
          This isn't just adoption. It's a commitment to protect, nurture, and provide a safe forever home.
        </p>
      </div>

      <div className="grid gap-12 sm:gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 sm:p-4 mx-auto max-w-sm"
          >
            <div className="h-20 w-20 sm:h-16 sm:w-16 flex items-center justify-center rounded-full bg-primary/10 text-primary mb-6 sm:mb-4">
              {step.icon}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}