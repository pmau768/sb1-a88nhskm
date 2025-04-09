import { adoptables } from "@/data/adoptables";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle, AlertTriangle, InfoIcon } from "lucide-react";
import { SocialShareButtons } from "@/components/social-share-buttons";
import { ShareFab } from "@/components/features/ShareFab";
import { Metadata } from "next";

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const dog = adoptables.find((d) => d.id === params.id);
  
  if (!dog) {
    return {
      title: "Dog Not Found | Trek Snout",
      description: "The requested dog profile could not be found.",
    };
  }
  
  return {
    title: `${dog.name} - ${dog.breed} | Trek Snout`,
    description: dog.description.substring(0, 160),
    openGraph: {
      title: `Meet ${dog.name} - ${dog.breed} | Trek Snout`,
      description: dog.description.substring(0, 160),
      images: [
        {
          url: dog.image,
          width: 800,
          height: 600,
          alt: dog.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Meet ${dog.name} - ${dog.breed} | Trek Snout`,
      description: dog.description.substring(0, 160),
      images: [dog.image],
    },
  };
}

export default function DogProfilePage({ params }: { params: { id: string } }) {
  const dog = adoptables.find((d) => d.id === params.id);
  if (!dog) return notFound();

  // Split personality traits for display
  const personalityTraits = dog.personality.split(", ");

  return (
    <div className="section-container">
      <Button asChild variant="outline" className="mb-8 tap-target no-print">
        <Link href="/dogs">← Back to Dogs</Link>
      </Button>

      {dog.flagged && (
        <Alert className="mb-8 border-amber-500 bg-amber-500/10">
          <AlertTriangle className="h-5 w-5 text-amber-500" />
          <AlertTitle className="text-amber-500">Priority Placement</AlertTitle>
          <AlertDescription>
            This dog has been flagged for priority adoption due to special circumstances.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mb-12 print-section">
        <div className="relative">
          <Image
            src={dog.image}
            alt={dog.name}
            width={600}
            height={400}
            className="rounded-xl w-full h-auto object-cover"
            priority
          />
          <div className="absolute top-4 right-4 no-print">
            <SocialShareButtons 
              title={`Meet ${dog.name}, a ${dog.age} ${dog.breed} looking for a forever home`}
              description={dog.description}
              media={dog.image}
              hashtags={["dogadoption", "rescuedog", "treksnout"]}
              compact
            />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold mb-2">{dog.name}</h1>
          <p className="text-muted-foreground mb-4 italic">{dog.breed}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {personalityTraits.map((trait) => (
              <Badge key={trait} variant="secondary">{trait}</Badge>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-semibold">Age</p>
              <p>{dog.age}</p>
            </div>
            <div>
              <p className="font-semibold">Size</p>
              <p>{dog.size}</p>
            </div>
            <div>
              <p className="font-semibold">Weight</p>
              <p>{dog.weight}</p>
            </div>
            <div>
              <p className="font-semibold">Activity Level</p>
              <p>{dog.activityLevel}</p>
            </div>
          </div>
          
          <p className="mb-6">{dog.description}</p>

          <Button asChild size="lg" className="w-full mb-4 no-print">
            <Link href={`/apply?id=${dog.id}`} className="text-center">Apply to Adopt {dog.name}</Link>
          </Button>
          
          <div className="flex gap-4 justify-center no-print">
            <Button variant="outline" size="sm" className="tap-target">Schedule a Visit</Button>
            <Button variant="outline" size="sm" className="tap-target">Ask a Question</Button>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 print-section">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Medical Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Medical History</p>
                <p>{dog.medicalHistory}</p>
              </div>
              <div>
                <p className="font-semibold">Vaccination Status</p>
                <p className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  {dog.vaccinationStatus}
                </p>
              </div>
              {dog.specialNeeds !== "None" && (
                <div>
                  <p className="font-semibold">Special Needs</p>
                  <p>{dog.specialNeeds}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Compatibility</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Children</p>
                <p>{dog.compatibility.children}</p>
              </div>
              <div>
                <p className="font-semibold">Other Dogs</p>
                <p>{dog.compatibility.otherDogs}</p>
              </div>
              <div>
                <p className="font-semibold">Cats</p>
                <p>{dog.compatibility.cats}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 print-section">
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Training & Behavior</h2>
            <p>{dog.training}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <h2 className="text-xl font-bold mb-4">Current Owner Information</h2>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p>{dog.ownerInfo.name}</p>
              </div>
              <div>
                <p className="font-semibold">Contact</p>
                <p>Phone: {dog.ownerInfo.phone}</p>
                <p>Email: {dog.ownerInfo.email}</p>
              </div>
              <div>
                <p className="font-semibold">Reason for Rehoming</p>
                <p>{dog.ownerInfo.reason}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center no-print">
        <Button asChild size="lg" className="rounded-full tap-target">
          <Link href={`/apply?id=${dog.id}`}>Apply to Adopt {dog.name}</Link>
        </Button>
      </div>
      
      {/* Mobile Share FAB */}
      <ShareFab 
        title={`Meet ${dog.name}, a ${dog.age} ${dog.breed} looking for a forever home`}
        description={dog.description}
      />
      
      {/* Print-only section */}
      <div className="hidden print-only">
        <div className="mt-8 border-t pt-8">
          <h2 className="text-xl font-bold mb-4">Contact Information</h2>
          <p>Interested in adopting {dog.name}? Contact Trek Snout:</p>
          <ul className="mt-4">
            <li>Phone: (555) 123-4567</li>
            <li>Email: adopt@treksnout.com</li>
            <li>Website: www.treksnout.com</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

// This tells Next.js which paths to pre-render
export function generateStaticParams() {
  return adoptables.map((dog) => ({
    id: dog.id, // Use the ID directly - it's already a string in the data
  }));
}